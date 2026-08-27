import { lazy, Suspense, useEffect } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Intro from "./components/Intro.jsx";
import Services from "./components/Services.jsx";
import Difference from "./components/Difference.jsx";
import Why from "./components/Why.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

const ParticleEnvironment = lazy(
  () => import("./components/ParticleEnvironment.jsx"),
);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      syncTouch: false,
    });

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll(".reveal").forEach((element) => {
      observer.observe(element);
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <ParticleEnvironment />
      </Suspense>
      <Navbar />
      <Hero />
      <Intro />
      <Services />
      <Difference />
      <Why />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
