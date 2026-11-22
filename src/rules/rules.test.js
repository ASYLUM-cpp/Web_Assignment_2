import test from "node:test";
import assert from "node:assert/strict";
import { checkSeats } from "./rules.js";

test("valid seat quantity is accepted", () => {
  const result = checkSeats(2, 10);
  assert.equal(result.ok, true);
});

test("exactly 5 seats (the limit) is accepted", () => {
  const result = checkSeats(5, 10);
  assert.equal(result.ok, true);
});

test("6 seats (above the limit) is rejected", () => {
  const result = checkSeats(6, 10);
  assert.equal(result.ok, false);
  assert.equal(result.message, "Max 5 seats per course.");
});
