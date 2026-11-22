import { Link, useLocation } from "react-router-dom";

export default function Confirmation() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="message">
        <h1>No recent booking</h1>
        <p>Nothing to show here. Looks like you opened this page directly.</p>
        <Link to="/courses" className="btn">Browse courses</Link>
      </div>
    );
  }

  return (
    <section className="success-box">
      <h1>✓ Booking confirmed!</h1>
      <p>Thanks {order.name}! Your booking number is <strong>{order.orderNo}</strong>.</p>
      <ul>
        {order.items.map((item) => (
          <li key={item.id}>{item.title}: {item.qty} {item.qty === 1 ? "seat" : "seats"} × PKR {item.price}</li>
        ))}
      </ul>
      <p><strong>Total: PKR {order.totals.subtotal}</strong> · {order.totals.hours} hours (per person)</p>
      <p>You'll get the course links by SMS on {order.phone}. See you in class!</p>
      <Link to="/courses" className="btn">Book more courses</Link>
    </section>
  );
}
