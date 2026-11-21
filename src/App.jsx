import { courses } from "./data/courses.js";

export default function App() {
  return (
    <div className="app-container">
      <header className="header">
        <div className="header-inner">
          <h1 className="logo">AA Academy</h1>
          <nav className="nav">
            <a href="#courses" className="nav-link">Courses ({courses.length})</a>
            <a href="#about" className="nav-link">About</a>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <section className="hero">
          <h2>Pesticide Safety Training for Sindh &amp; Punjab Farmers</h2>
          <p>Practical online certifications in Urdu, Sindhi, and Punjabi for field workers and supervisors.</p>
        </section>

        <section id="courses" className="courses-preview">
          <div className="section-header">
            <h3>Available Courses</h3>
            <span className="count-tag">{courses.length} courses loaded</span>
          </div>
          <div className="cards-grid">
            {courses.map((course) => (
              <div key={course.id} className="card course-card">
                <div className="card-top">
                  <span className="badge category-badge">{course.category}</span>
                  {course.needsLicense && <span className="badge license-badge">Licence required</span>}
                </div>
                <h4>{course.title}</h4>
                <p className="card-desc">
                  {course.description || "No description yet, will add soon."}
                </p>
                <div className="card-facts">
                  <span>{course.language}</span>
                  <span>{course.hours} hrs</span>
                  <span>{course.seatsLeft > 0 ? `${course.seatsLeft} seats left` : "Sold out"}</span>
                </div>
                <div className="card-meta">
                  <span className="level-tag">{course.level}</span>
                  <span className="price">PKR {course.price.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 AA Academy. Agricultural Safety Education Initiative.</p>
      </footer>
    </div>
  );
}
