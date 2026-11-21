export default function App() {
  return (
    <div className="app-container">
      <header className="header">
        <div className="header-inner">
          <h1 className="logo">AA Academy</h1>
          <nav className="nav">
            <a href="#courses" className="nav-link">Courses</a>
            <a href="#about" className="nav-link">About</a>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <section className="hero">
          <h2>Pesticide Safety Training for Sindh & Punjab Farmers</h2>
          <p>Practical online certifications in Urdu, Sindhi, and Punjabi for field workers and supervisors.</p>
        </section>

        <section id="courses" className="courses-preview">
          <h3>Featured Courses</h3>
          <div className="cards-grid">
            <div className="card preview-card">
              <h4>Safe Pesticide Handling Basics</h4>
              <p className="card-desc">Core safety protocols for mixing, spraying, and emergency field first-aid.</p>
              <div className="card-meta">
                <span>Language: Urdu</span>
                <span className="price">PKR 1,200</span>
              </div>
            </div>
            <div className="card preview-card">
              <h4>Spray Drift Prevention & Calibration</h4>
              <p className="card-desc">Equipment nozzle selection and weather monitoring to prevent pesticide drift.</p>
              <div className="card-meta">
                <span>Language: Sindhi</span>
                <span className="price">PKR 1,800</span>
              </div>
            </div>
            <div className="card preview-card">
              <h4>PPE Selection and Maintenance</h4>
              <p className="card-desc">Proper usage, respirator fitting, and cleaning of chemical safety equipment.</p>
              <div className="card-meta">
                <span>Language: Punjabi</span>
                <span className="price">PKR 1,500</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 AA Academy. Agricultural Safety Education Initiative.</p>
      </footer>
    </div>
  );
}
