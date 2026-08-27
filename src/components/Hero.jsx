import { Arrow } from "./ui.jsx";

export default function Hero() {
  return (
    <main id="top">
      <section className="hero section-pad">
        <div className="hero-meta reveal">
          <span className="eyebrow">Independent digital studio</span>
          <span className="hero-index">/ 001 — 2026</span>
        </div>

        <div className="hero-title reveal delay-1">
          <span className="outline-word">LUMORA</span>
          <span className="studio-word">DIGITAL STUDIO</span>
        </div>

        <div className="hero-bottom reveal delay-2">
          <h1>
            We build
            <br />
            what your
            <br />
            <em>business needs.</em>
          </h1>
          <div className="hero-copy">
            <p>
              Websites, digital marketing and cyber security for businesses
              ready to build a stronger digital presence.
            </p>
            <a className="button button-accent" href="#contact">
              Start a project <Arrow />
            </a>
            <a className="text-link" href="#services">
                Explore services <Arrow down />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
