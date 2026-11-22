import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataStatus from "../components/DataStatus.jsx";
import CartSummary from "../components/CartSummary.jsx";
import { buildCartRows, getTotals } from "../utils/cartHelpers.js";
import { checkEligibility, checkMinOrder } from "../rules/rules.js";

function validateForm(form) {
  const errors = {};
  if (form.name.trim().length < 3) {
    errors.name = "Enter your full name (at least 3 letters).";
  }
  if (!/^03\d{9}$/.test(form.phone)) {
    errors.phone = "Enter an 11-digit number starting with 03, like 03001234567.";
  }
  if (!form.province) {
    errors.province = "Pick your province.";
  }
  if (!form.licence) {
    errors.licence = "Pick Yes or No.";
  }
  return errors;
}

export default function Checkout({ courses, loading, error, onRetry, cart, onClearCart }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", province: "", licence: "" });
  const [errors, setErrors] = useState({});
  const [ruleErrors, setRuleErrors] = useState([]);

  if (loading || error) {
    return <DataStatus loading={loading} error={error} onRetry={onRetry} />;
  }

  if (cart.length === 0) {
    return (
      <div className="message">
        <h1>Checkout</h1>
        <p>Your cart is empty. Add a course first.</p>
        <Link to="/courses" className="btn">Browse courses</Link>
      </div>
    );
  }

  const rows = buildCartRows(cart, courses);
  const totals = getTotals(rows);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formErrors = validateForm(form);
    setErrors(formErrors);

    // Check the three rules again before we confirm
    const problems = [];
    rows.forEach((row) => {
      if (!row.check.ok) problems.push(row.check.message);
      if (row.course && form.licence) {
        const eligibility = checkEligibility(row.course, form.licence);
        if (!eligibility.ok) problems.push(eligibility.message);
      }
    });
    const minOrder = checkMinOrder(totals.subtotal);
    if (!minOrder.ok) problems.push(minOrder.message);
    setRuleErrors(problems);

    if (Object.keys(formErrors).length > 0 || problems.length > 0) return;

    const order = {
      orderNo: "AA-" + Date.now().toString().slice(-6),
      name: form.name.trim(),
      phone: form.phone,
      items: rows.map((row) => ({ id: row.id, title: row.course.title, qty: row.qty, price: row.course.price })),
      totals,
    };
    onClearCart();
    navigate("/confirmation", { state: { order } });
  }

  return (
    <>
      <h1>Checkout</h1>
      <div className="two-col">
        <form onSubmit={handleSubmit} noValidate className="summary">
          <div className="form-field">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange}
              aria-invalid={!!errors.name} aria-describedby="name-error" />
            {errors.name && <p id="name-error" className="error-text">{errors.name}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="phone">Mobile number</label>
            <input id="phone" name="phone" inputMode="numeric" value={form.phone} onChange={handleChange}
              aria-invalid={!!errors.phone} aria-describedby="phone-error" />
            {errors.phone && <p id="phone-error" className="error-text">{errors.phone}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="province">Province</label>
            <select id="province" name="province" value={form.province} onChange={handleChange}
              aria-invalid={!!errors.province} aria-describedby="province-error">
              <option value="">Choose...</option>
              <option value="Sindh">Sindh</option>
              <option value="Punjab">Punjab</option>
            </select>
            <p className="hint">Only Sindh and Punjab for now.</p>
            {errors.province && <p id="province-error" className="error-text">{errors.province}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="licence">Does everyone in your group have a pesticide spray licence?</label>
            <select id="licence" name="licence" value={form.licence} onChange={handleChange}
              aria-invalid={!!errors.licence} aria-describedby="licence-error">
              <option value="">Choose...</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <p className="hint">Needed for the "Licence required" courses.</p>
            {errors.licence && <p id="licence-error" className="error-text">{errors.licence}</p>}
          </div>

          {ruleErrors.length > 0 && (
            <div className="error-box" role="alert">
              <strong>Can't confirm your booking yet:</strong>
              <ul>
                {ruleErrors.map((msg) => <li key={msg}>{msg}</li>)}
              </ul>
              <Link to="/cart">Go back to cart</Link>
            </div>
          )}

                    <button type="submit" className="btn">Confirm booking</button>
        </form>

        <CartSummary totals={totals} />
      </div>
    </>
  );
}
