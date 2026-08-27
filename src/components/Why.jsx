export default function Why() {
  return (
    <section className="why section-pad">
      <div className="section-kicker">
        <span>—</span> Why LUMORA
      </div>
      <div className="why-grid">
        {[
          ["01", "Simple", "No unnecessary complexity."],
          ["02", "Custom", "Built around your business."],
          ["03", "Practical", "Focused on things that actually matter."],
          ["04", "Secure", "Designed with digital protection in mind."],
        ].map((x) => (
          <div className="why-item" key={x[0]}>
            <span>{x[0]}</span>
            <h3>{x[1]}</h3>
            <p>{x[2]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
