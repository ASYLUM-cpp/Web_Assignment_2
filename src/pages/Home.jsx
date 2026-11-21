import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Spray safe, not sorry 🌾</h1>
        <p>
          Short online courses for farmers and spray guys in Sindh and Punjab. Courses are in
          Urdu, Sindhi, Punjabi and English, so pick whatever works for you.
        </p>
        <Link to="/courses" className="btn">Check out the courses</Link>
      </section>

      <section>
        <h2>How it works</h2>
        <ol>
          <li>Browse the courses. Search or filter if you're looking for something specific.</li>
          <li>Add the ones you want to your cart and pick how many seats.</li>
          <li>Fill in your details, hit confirm and that's it. Course links come on SMS.</li>
        </ol>
      </section>

      <section>
        <h2>Quick rules (pls read)</h2>
        <ul>
          <li>Max 5 seats per course.</li>
          <li>Min order is PKR 1,500.</li>
          <li>Courses with "Licence required" are only for people who actually have a spray licence.</li>
        </ul>
      </section>
    </>
  );
}
