// The three booking rules. They are in their own file so we can test them.

export const MAX_SEATS = 5; // most seats for one course in one booking
export const MIN_ORDER = 1500; // smallest order in PKR

// Rule 1 (seats): from 1 to MAX_SEATS seats, and not more than the seats left
export function checkSeats(qty, seatsLeft) {
  if (!Number.isInteger(qty) || qty < 1) {
    return { ok: false, message: "Choose at least 1 seat." };
  }
  if (qty > MAX_SEATS) {
    return { ok: false, message: `Max ${MAX_SEATS} seats per course.` };
  }
  if (qty > seatsLeft) {
    let message = `Only ${seatsLeft} seats left.`;
    if (seatsLeft === 0) message = "This one just sold out, sorry. Remove it to continue.";
    if (seatsLeft === 1) message = "Only 1 seat is left.";
    return { ok: false, message };
  }
  return { ok: true, message: "" };
}

// Rule 2 (licence): some courses need a licence
export function checkEligibility(course, licence) {
  if (course.needsLicense && licence !== "yes") {
    return {
      ok: false,
      message: `"${course.title}" needs a spray licence. Only pick "Yes" if your whole group has one.`,
    };
  }
  return { ok: true, message: "" };
}

// Rule 3 (price): the order must be MIN_ORDER or more
export function checkMinOrder(subtotal) {
  if (subtotal < MIN_ORDER) {
    return {
      ok: false,
      message: `Min order is PKR ${MIN_ORDER}. Add PKR ${MIN_ORDER - subtotal} more.`,
    };
  }
  return { ok: true, message: "" };
}
