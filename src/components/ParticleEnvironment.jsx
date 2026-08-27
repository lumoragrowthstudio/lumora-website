import { useEffect, useRef } from "react";
import * as THREE from "three";

const GREEN = new THREE.Color("#b7d76b");
const WHITE = new THREE.Color("#f0f1ea");

export default function ParticleEnvironment() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const mobile = window.matchMedia("(max-width: 760px)").matches;
    const count = reduced ? 320 : mobile ? 600 : 1800;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      innerWidth / innerHeight,
      0.1,
      100,
    );
    camera.position.z = 10;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.25 : 1.7));
    renderer.setSize(innerWidth, innerHeight);
    renderer.setClearColor(0x000000, 0);

    const field = new THREE.Group();
    scene.add(field);
    const positions = new Float32Array(count * 3);
    const origins = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // A wide, deep volume: deliberately not a flat starfield.
      const x = (Math.random() - 0.5) * 25;
      const y = (Math.random() - 0.5) * 17;
      const z = (Math.random() - 0.5) * 25;
      positions[i3] = origins[i3] = x;
      positions[i3 + 1] = origins[i3 + 1] = y;
      positions[i3 + 2] = origins[i3 + 2] = z;
      sizes[i] =
        Math.random() < 0.035
          ? 2.6 + Math.random() * 2.4
          : 0.65 + Math.random() * 1.25;
      phases[i] = Math.random() * Math.PI * 2;
      const color = Math.random() < 0.075 ? GREEN : WHITE;
      color.toArray(colors, i3);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    const material = new THREE.PointsMaterial({
      size: mobile ? 0.055 : 0.042,
      transparent: true,
      opacity: 0.95,
      vertexColors: true,
      sizeAttenuation: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });
    const particlePoints = new THREE.Points(geometry, material);
    particlePoints.renderOrder = -1;
    field.add(particlePoints);

    // Sparse contour fragments, kept thin and dim so typography stays dominant.
    const lineGroup = new THREE.Group();
    for (let j = 0; j < (mobile ? 3 : 6); j++) {
      const points = [];
      const width = 7 + Math.random() * 5;
      const y = (Math.random() - 0.5) * 12;
      const z = -8 + Math.random() * 15;
      for (let k = 0; k < 45; k++) {
        const x = -width / 2 + (k / 44) * width;
        const yy =
          y +
          Math.sin(k * 0.29 + j * 1.7) * (0.35 + j * 0.04) +
          Math.sin(k * 0.09 + j) * 0.65;
        points.push(new THREE.Vector3(x, yy, z + Math.sin(k * 0.18) * 0.7));
      }
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: j === 2 ? GREEN : WHITE,
        transparent: true,
        opacity: j === 2 ? 0.13 : 0.075,
        depthWrite: false,
      });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      line.rotation.z = (Math.random() - 0.5) * 0.16;
      line.userData.phase = Math.random() * 5;
      lineGroup.add(line);
    }
    field.add(lineGroup);

    const pointer = new THREE.Vector2(99, 99);
    const target = new THREE.Vector2(0, 0);
    const onPointer = (e) => {
      target.x = (e.clientX / innerWidth - 0.5) * 2;
      target.y = -(e.clientY / innerHeight - 0.5) * 2;
    };
    const onResize = () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.25 : 1.7));
      renderer.setSize(innerWidth, innerHeight);
    };
    addEventListener("pointermove", onPointer, { passive: true });
    addEventListener("resize", onResize);
    let frame,
      last = 0;
    const animate = (time) => {
      frame = requestAnimationFrame(animate);
      if (reduced) time = 0;
      const t = time * 0.00025;
      pointer.lerp(target, reduced ? 1 : 0.035);
      const pos = geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3,
          p = phases[i];
        const depth = THREE.MathUtils.clamp((origins[i3 + 2] + 12) / 24, 0, 1);
        const drift = reduced ? 0 : 0.018 + (1 - depth) * 0.027;
        const px = origins[i3] + Math.sin(t * 1.7 + p) * drift;
        const py = origins[i3 + 1] + Math.cos(t * 1.25 + p * 1.3) * drift;
        // Local cursor repulsion in projected-ish field coordinates.
        const dx = px / 12 - pointer.x * 0.72,
          dy = py / 8.5 - pointer.y * 0.72;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const push =
          distance < 0.22 ? (1 - distance / 0.22) * (1 - depth) * 0.13 : 0;
        pos[i3] = px + (dx / (distance || 1)) * push;
        pos[i3 + 1] = py + (dy / (distance || 1)) * push;
        pos[i3 + 2] = origins[i3 + 2] + Math.sin(t + p) * 0.06;
      }
      geometry.attributes.position.needsUpdate = true;
      field.rotation.y = reduced ? 0 : t * 0.22 + pointer.x * 0.018;
      field.rotation.x = reduced
        ? 0
        : Math.sin(t * 0.7) * 0.018 - pointer.y * 0.012;
      lineGroup.position.y = reduced ? 0 : Math.sin(t * 1.5) * 0.13;
      renderer.render(scene, camera);
      last = time;
    };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("pointermove", onPointer);
      removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      lineGroup.children.forEach((line) => {
        line.geometry.dispose();
        line.material.dispose();
      });
      renderer.dispose();
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="particle-environment"
      aria-hidden="true"
    />
  );
}
