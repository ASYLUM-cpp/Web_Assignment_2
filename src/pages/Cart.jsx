import { Link, useNavigate } from "react-router-dom";
import DataStatus from "../components/DataStatus.jsx";
import CartSummary from "../components/CartSummary.jsx";
import { buildCartRows, getTotals } from "../utils/cartHelpers.js";
import { checkMinOrder, MAX_SEATS, MIN_ORDER } from "../rules/rules.js";

export default function Cart({ courses, loading, error, onRetry, cart, onRemove, onChangeQty }) {
  const navigate = useNavigate();

  if (loading || error) {
    return <DataStatus loading={loading} error={error} onRetry={onRetry} />;
  }

  if (cart.length === 0) {
    return (
      <div className="message">
        <h1>Your cart</h1>
        <p>Your cart is empty. Go add something!</p>
        <Link to="/courses" className="btn">Browse courses</Link>
      </div>
    );
  }

  const rows = buildCartRows(cart, courses);
  const totals = getTotals(rows);
  const minOrder = checkMinOrder(totals.subtotal);
  const allRowsOk = rows.every((row) => row.check.ok);
  const canContinue = allRowsOk && minOrder.ok;

  return (
    <>
      <h1>Your cart</h1>
      <div className="two-col">
        <section>
          {rows.map((row) => (
            <div key={row.id} className={`cart-row ${row.check.ok ? "" : "has-problem"}`}>
              <strong>{row.course ? row.course.title : `Unknown course (${row.id})`}</strong>
              {row.course && (
                <p className="meta">
                  PKR {row.course.price} for each seat · {row.course.seatsLeft} seats left
                  {row.course.needsLicense && " · Licence required"}
                </p>
              )}

              <div className="row-actions">
                {row.course && (
                  <div>
                    <label htmlFor={`qty-${row.id}`}>Seats</label>
                    <input
                      id={`qty-${row.id}`}
                      type="number"
                      min="1"
                      max={MAX_SEATS}
                      value={row.qty}
                      onChange={(e) => onChangeQty(row.id, Number(e.target.value))}
                      style={{ width: "5rem" }}
                    />
                    <p className="hint">1 to {MAX_SEATS} seats</p>
                  </div>
                )}
                <button type="button" className="btn secondary" onClick={() => onRemove(row.id)}>
                  Remove
                </button>
              </div>

              {!row.check.ok && <p className="error-text" role="alert">⚠ {row.check.message}</p>}
            </div>
          ))}
        </section>

        <CartSummary totals={totals}>
          <p className="hint">Minimum order: PKR {MIN_ORDER}.</p>
          {!minOrder.ok && <p className="error-text">⚠ {minOrder.message}</p>}
          {!allRowsOk && <p className="error-text">⚠ Fix the stuff in red first.</p>}
          <button
            type="button"
            className="btn"
            disabled={!canContinue}
            onClick={() => navigate("/checkout")}
          >
            Go to checkout
          </button>
        </CartSummary>
      </div>
    </>
  );
}
