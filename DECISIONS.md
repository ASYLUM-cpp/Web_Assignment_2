# Frontend decisions

Reference website: https://www.sj-ce.org/ (the course list at `/courses` and one course page,
`/9046/course/Pesticide-Drift-Prevention-2026`). The screenshots are in the report (section 4 and section 6).

## Decision 1: Show the facts that help the user compare courses (information and mobile layout)

- **Problem:** On sj-ce.org, each course in the list shows a title, "Free" and a short text that stops in the
  middle of a sentence. The list does not show hours. The hours and the CE credit are only on the course page.
- **Decision:** Each card shows price, hours, language, level and seats left. A badge shows "Licence required".
  The text is cut at 90 characters and ends with "...". On a phone the cards are in one column.
- **Other way:** Show only the title and price, and put the other facts in a pop-up.
- **Reason:** A farmer chooses a course by language, time and price. The farmer should not need to open
  every course. This helps the user find a course and book it.
- **Cost:** The cards are taller, mostly on a phone.
- **Code:** `src/components/CourseCard.jsx` (`CourseCard`, `SeatsBadge`) and `.facts` and `.badge` in `src/index.css`.
- **Evidence:** Report, figure 6.2 and figure 6.11. Steps: open `/courses` and compare the cards. Do not open any course.

## Decision 2: Keep search, filter and sort in the URL (interaction and state)

- **Problem:** sj-ce.org has no search, filter or sort on the course list. The courses are on separate
  category pages, so the user cannot search all of them at one time.
- **Decision:** One page has search, a category filter and a sort control. They work together. The values are in the
  URL (`/courses?q=...&cat=...&sort=...`). When the user opens a course and clicks "Back to results", the same
  list shows again.
- **Other way:** Keep the values in `useState` in the `Courses` page. This is simpler, but the values are lost when the user leaves the page.
- **Reason:** Users compare many courses and go back and forth. They should not need to filter again.
  When nothing matches, the page shows a "Clear search" button.
- **Cost:** More code (`useSearchParams`). The URL changes each time the user types.
- **Code:** `src/pages/Courses.jsx` (`useSearchParams`, `updateParam`) and `backLink` in `src/pages/CourseDetails.jsx`.
- **Evidence:** Report, figure 6.2 and figure 6.3. Steps: open `/courses`, choose the category "Equipment",
  open "Spray Drift Prevention", click "Back to results". The filter is still on.

## Decision 3: Show the conditions before the user adds a course

- **Problem:** On the sj-ce.org course page, the licence statement ("Please Note") is at the very bottom of the page,
  below the footer. The page does not say which licence the course needs. A user can miss it.
- **Decision:** "Licence required" shows on the card and in a notice on the course page. The seat limit and the
  smallest order show in the cart. At checkout the site checks the licence answer for each course in the cart.
- **Other way:** Show all conditions only at checkout.
- **Reason:** A user with no licence should know this before adding the course. This stops a wasted booking.
- **Cost:** More text on the cards and pages. The rules are checked in two places (cart and checkout).
- **Code:** `src/components/CourseCard.jsx` (badge), `src/pages/CourseDetails.jsx` (the `needsLicense` notice),
  `src/rules/rules.js` (`checkEligibility`) and `src/pages/Checkout.jsx` (`handleSubmit`).
- **Evidence:** Report, figure 6.4 and figure 6.9. Steps: open `/courses/c105`. The notice shows before "Add to cart".
  At checkout choose "No". The booking is blocked and a message tells the user why.
