import logo from "../assets/logo.png";
export default function Footer() {
  return (
    <footer className="footer section-pad">
      <div className="footer-main">
        <a className="wordmark" href="#top" onClick={close}>
          <img src={logo} alt="Lumora" className="logo-img" />
        </a>
        <p>Technology &amp; Digital Studio</p>
        <p>Websites · Digital Marketing · Cyber Security</p>
      </div>
      <div className="footer-links">
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href="#">Instagram</a>
        <a href="#">LinkedIn</a>
      </div>
      <div className="footer-bottom">
        <span>© 2026 LUMORA. All rights reserved.</span>
        <span>Made for the digital world.</span>
      </div>
    </footer>
  );
}
