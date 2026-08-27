import { Arrow } from "./ui.jsx";

const services = [
  {
    num: "01",
    tag: "BUILD",
    title: (
      <>
        Websites that
        <br />
        make you
        <br />
        <em>look serious.</em>
      </>
    ),
    desc: "Modern, responsive websites designed around your business, your audience and your goals.",
    items: [
      "Business Websites",
      "Landing Pages",
      "Portfolio Websites",
      "E-commerce Websites",
      "Booking Websites",
      "Custom Web Experiences",
    ],
    cta: "Build with us",
    visual: "browser",
  },
  {
    num: "02",
    tag: "GROW",
    title: (
      <>
        Turn attention
        <br />
        into <em>growth.</em>
      </>
    ),
    desc: "We help businesses build visibility, reach customers and turn digital attention into real enquiries.",
    items: [
      "Social Media",
      "Content Strategy",
      "Reels & Creative Content",
      "SEO",
      "Google Business",
      "Meta Ads",
      "Google Ads",
      "Analytics",
    ],
    cta: "Grow with us",
    visual: "flow",
  },
  {
    num: "03",
    tag: "SECURE",
    title: (
      <>
        Stay digital.
        <br />
        Stay <em>protected.</em>
      </>
    ),
    desc: "Your digital presence should help your business, not become a vulnerability.",
    items: [
      "Website Security",
      "Security Checkups",
      "Vulnerability Checks",
      "Account Security",
      "Access Management",
      "Backup & Recovery",
      "Basic Security Monitoring",
    ],
    cta: "Secure with us",
    visual: "shield",
  },
];
const BrowserVisual = () => (
  <div className="browser-visual" aria-hidden="true">
    <div className="browser-top">
      <i />
      <i />
      <i />
      <span>lumora.studio / project</span>
    </div>
    <div className="browser-body">
      <div className="browser-nav">
        LUMORA <span>INDEX &nbsp; ABOUT &nbsp; CONTACT</span>
      </div>
      <div className="browser-hero">
        YOUR
        <br />
        <b>
          NEXT
          <br />
          MOVE.
        </b>
      </div>
      <div className="browser-foot">
        <span>
          Digital experiences
          <br />
          for now.
        </span>
        <b>↗</b>
      </div>
    </div>
  </div>
);
const FlowVisual = () => (
  <div className="flow-visual" aria-hidden="true">
    <div className="flow-orbit"></div>
    <div className="flow-center">ATTENTION</div>
    <div className="flow-label l1">
      DISCOVER <b></b>
    </div>
    <div className="flow-label l2">
      ENGAGE <b></b>
    </div>
    <div className="flow-label l3">
      ENQUIRE <b></b>
    </div>
    <div className="flow-label l4">
      CONVERT <b></b>
    </div>
  </div>
);
const ShieldVisual = () => (
  <div className="shield-visual" aria-hidden="true">
    <div className="shield-mark">✓</div>
    <div className="security-status">
      <span>
        <i /> SYSTEM STATUS
      </span>
      <b></b>
    </div>
    <div className="security-grid"></div>
  </div>
);
function Service({ service }) {
  return (
    <article className="service-row reveal">
      <div className="service-info">
        <div className="service-label">
          <span>{service.num} /</span> {service.tag}
        </div>
        <h3>{service.title}</h3>
        <p>{service.desc}</p>
        <ul>
          {service.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <a className="text-link" href="#contact">
          {service.cta} <Arrow />
        </a>
      </div>
      <div className="service-art">
        {service.visual === "browser" ? (
          <BrowserVisual />
        ) : service.visual === "flow" ? (
          <FlowVisual />
        ) : (
          <ShieldVisual />
        )}
      </div>
    </article>
  );
}
export default function Services() {
  return (
    <section className="services section-pad" id="services">
      <div className="section-heading">
        <div className="section-kicker">
           <span>—</span> What we do
        </div>
        <h2>
          Three essentials.
          <br />
          <span>One clear direction.</span>
        </h2>
      </div>
      {services.map((s) => (
        <Service key={s.num} service={s} />
      ))}
    </section>
  );
}
