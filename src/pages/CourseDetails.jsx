import { useParams, useLocation, Link } from "react-router-dom";
import DataStatus from "../components/DataStatus.jsx";
import { SeatsBadge } from "../components/CourseCard.jsx";
import { MAX_SEATS } from "../rules/rules.js";

export default function CourseDetails({ courses, loading, error, onRetry, cart, onAdd }) {
  const { id } = useParams();
  const location = useLocation();
  const from = location.state?.from;
  const backLink = from ? `/courses?${from}` : "/courses";

  if (loading || error) {
    return <DataStatus loading={loading} error={error} onRetry={onRetry} />;
  }

  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="message">
        <h1>Course not found</h1>
        <p>Couldn't find a course with the ID "{id}". Maybe it got removed.</p>
        <Link to="/courses" className="btn">See all courses</Link>
      </div>
    );
  }

  const inCart = cart.some((item) => item.id === course.id);
  const soldOut = course.seatsLeft === 0;

  return (
    <article>
      <p><Link to={backLink}>← Back to results</Link></p>
      <h1>{course.title}</h1>
      <p className="meta">{course.category} · {course.language} · {course.level}</p>

      <div className="facts">
        <span className="price">PKR {course.price} for each seat</span>
        <span>{course.hours} {course.hours === 1 ? "hour" : "hours"}</span>
        <SeatsBadge seatsLeft={course.seatsLeft} />
      </div>

      {course.needsLicense && (
        <p className="error-box">
          Heads up: you need a pesticide spray licence for this one (everyone in your group
          does). We'll ask about it at checkout.
        </p>
      )}

      <h2>About this course</h2>
      <p>{course.description || "No description yet, will add soon."}</p>

      <h2>Before you book</h2>
      <ul>
        <li>You can book 1 to {MAX_SEATS} seats. You can change it later in the cart.</li>
        <li>Seats left right now: {course.seatsLeft}.</li>
      </ul>

      {inCart ? (
        <Link to="/cart" className="btn">Go to cart</Link>
      ) : (
        <button type="button" className="btn" disabled={soldOut} onClick={() => onAdd(course.id)}>
          {soldOut ? "Sold out" : "Add to cart"}
        </button>
      )}
    </article>
  );
}
