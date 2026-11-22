import { courses } from "../data/courses.js";

const FAIL_MESSAGE = "Couldn't load the courses. Check your internet and try again.";

// This function pretends to load the courses from a server.
// The test controls in the footer save their choice in localStorage.
export function loadCourses() {
  const mode = localStorage.getItem("demoMode") || "normal";
  const soldOutId = localStorage.getItem("demoSoldOut");

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mode === "fail-once") {
        // fail only one time, so "Try again" works after that
        localStorage.setItem("demoMode", "normal");
        reject(new Error(FAIL_MESSAGE));
      } else if (mode === "fail") {
        reject(new Error(FAIL_MESSAGE));
      } else if (mode === "empty") {
        resolve([]);
      } else {
        // make one course sold out after the user put it in the cart
        const data = courses.map((course) =>
          course.id === soldOutId ? { ...course, seatsLeft: 0 } : course
        );
        resolve(data);
      }
    }, 700);
  });
}
