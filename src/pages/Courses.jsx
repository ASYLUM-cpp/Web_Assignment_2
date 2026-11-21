import { courses } from "../data/courses.js";

export default function Courses() {
  return (
    <section>
      <h1>Available Courses</h1>
      <p className="hint">Compare courses, languages, and seat availability below.</p>
      <div className="cards-grid" style={{ marginTop: "1.5rem" }}>
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
  );
}
