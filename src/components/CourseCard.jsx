import { Link } from "react-router-dom";

export function SeatsBadge({ seatsLeft }) {
  if (seatsLeft === 0) return <span className="badge bad">Sold out</span>;
  if (seatsLeft === 1) return <span className="badge warn">Only 1 seat left</span>;
  if (seatsLeft <= 5) return <span className="badge warn">Only {seatsLeft} seats left</span>;
  return <span className="badge good">{seatsLeft} seats left</span>;
}

export default function CourseCard({ course, inCart, onAdd, fromSearch }) {
  const soldOut = course.seatsLeft === 0;

  return (
    <article className="card">
      <h3>
        <Link to={`/courses/${course.id}`} state={{ from: fromSearch }}>
          {course.title}
        </Link>
      </h3>
      <p className="meta">
        {course.category} · {course.language} · {course.level}
      </p>

      {/* The facts a user needs to compare courses */}
      <div className="facts">
        <span className="price">PKR {course.price}</span>
        <span>{course.hours} {course.hours === 1 ? "hour" : "hours"}</span>
        <SeatsBadge seatsLeft={course.seatsLeft} />
        {course.needsLicense && <span className="badge warn">Licence required</span>}
      </div>

      <p className="meta">
        {course.description
          ? course.description.slice(0, 90) + (course.description.length > 90 ? "..." : "")
          : "No description yet, will add soon."}
      </p>

      <button
        type="button"
        className="btn"
        disabled={soldOut || inCart}
        onClick={() => onAdd(course.id)}
      >
        {soldOut ? "Sold out" : inCart ? "In cart ✓" : "Add to cart"}
      </button>
    </article>
  );
}
