export default function CartSummary({ totals, children }) {
  return (
    <aside className="summary" aria-label="Order summary">
      <h2>Summary</h2>
      <table>
        <tbody>
          <tr><td>Courses</td><td>{totals.courseCount}</td></tr>
          <tr><td>Seats</td><td>{totals.seats}</td></tr>
          <tr><td>Hours (per person)</td><td>{totals.hours}</td></tr>
          <tr><td><strong>Total</strong></td><td><strong>PKR {totals.subtotal}</strong></td></tr>
        </tbody>
      </table>
      {children}
    </aside>
  );
}
