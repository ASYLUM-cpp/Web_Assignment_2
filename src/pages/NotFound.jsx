import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="message">
      <h1>404 - Page not found</h1>
      <p>This page doesn't exist. Not sure how you got here tbh.</p>
      <Link to="/" className="btn">Go home</Link>
    </div>
  );
}
