import React, { useState } from "react";
import { Arrow } from "./ui.jsx";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="nav-wrap">
      <nav className="nav" aria-label="Main navigation">
        <a className="wordmark" href="#top" onClick={close}>
  <img src={logo} alt="Lumora" className="logo-img" />
</a>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a className="nav-cta" href="#contact">
            Start a project <Arrow />
          </a>
        </div>
        <button
          className={"menu-btn " + (open ? "active" : "")}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </nav>
      {open && (
        <div className="mobile-menu">
          <a href="#services" onClick={close}>
            Services
          </a>
          <a href="#about" onClick={close}>
            About
          </a>
          <a href="#contact" onClick={close}>
            Contact
          </a>
          <a className="mobile-cta" href="#contact" onClick={close}>
            Start a project <Arrow />
          </a>
        </div>
      )}
    </header>
  );
}
