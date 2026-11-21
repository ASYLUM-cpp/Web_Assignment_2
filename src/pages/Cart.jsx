import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <section>
      <h1>Your Cart</h1>
      <div className="message">
        <p>Your cart is empty right now.</p>
        <Link to="/courses" className="btn">Browse courses</Link>
      </div>
    </section>
  );
}
