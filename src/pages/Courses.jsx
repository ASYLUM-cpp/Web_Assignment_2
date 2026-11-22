import CourseCard from "../components/CourseCard.jsx";

export default function Courses({ courses, cart, onAdd }) {
  return (
    <section>
      <h1>Available Courses</h1>
      <p className="hint">Compare courses, languages, and seat availability below.</p>
      <div className="cards-grid" style={{ marginTop: "1.5rem" }}>
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            inCart={cart?.some((item) => item.id === course.id)}
            onAdd={onAdd}
          />
        ))}
      </div>
    </section>
  );
}
