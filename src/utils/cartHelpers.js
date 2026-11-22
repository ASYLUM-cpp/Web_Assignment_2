import { checkSeats } from "../rules/rules.js";

// Join each cart item with its course and check the seats
export function buildCartRows(cart, courses) {
  return cart.map((item) => {
    const course = courses.find((c) => c.id === item.id);
    const check = course
      ? checkSeats(item.qty, course.seatsLeft)
      : { ok: false, message: "This course doesn't exist anymore. Just remove it." };
    return { ...item, course, check };
  });
}

// Totals (only for courses that still exist)
export function getTotals(rows) {
  const validRows = rows.filter((row) => row.course);
  const seats = validRows.reduce((sum, row) => sum + row.qty, 0);
  const hours = validRows.reduce((sum, row) => sum + row.course.hours, 0);
  const subtotal = validRows.reduce((sum, row) => sum + row.course.price * row.qty, 0);
  return { seats, hours, subtotal, courseCount: validRows.length };
}
