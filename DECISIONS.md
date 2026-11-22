# Frontend decisions

Reference website: https://www.sj-ce.org/ (the course list at `/courses` and the course page
`/9046/course/Pesticide-Drift-Prevention-2026`). I looked at both pages in Chrome. The screenshots
are in the report (section 4 for the reference site, section 6 for my app).

## Decision 1: Show the facts people need to compare courses on the card

- **Problem:** On sj-ce.org each course card in the list has a picture, a title, a short text and the
  word "FREE". The short text stops with "..." in the middle of a sentence (for example "This type of..."
  and "...are one of the most common types of regulatory inspections performed..."). The card has no
  duration, no credit hours and no language. The duration ("1 h approx") and the approved hours ("0.5 hour
  Laws & Regulations and 0.5 hour Other") are only on the course page.
- **Decision:** Each card in my list shows price, hours, language, level and seats left. A badge shows
  "Licence required". The text is cut at 90 characters and ends with "...". On a phone the cards are in one column.
- **Other way:** Show only the title and price and put the other facts in a pop-up.
- **Reason:** A farmer picks a course by language, time and price. He should not need to open every
  course to compare them.
- **Cost:** The cards are taller, mostly on a phone.
- **Code:** `src/components/CourseCard.jsx` (`CourseCard`, `SeatsBadge`) and `.facts` and `.badge` in `src/index.css`.
- **Evidence:** Report, figure 6.2 and figure 6.11. Steps: open `/courses` and compare the cards. Do not open any course.

## Decision 2: Search, filter and sort together on one page, saved in the URL

- **Problem:** sj-ce.org has a text search and a grid/list switch, but no filter and no sort. The category menu
  at the top mixes topics (Laws & Regulations, Other) with languages (Espanol, Punjabi), so a user cannot pick a
  topic and a language together.
- **Decision:** One page has search, a category filter and a sort control. They work together. The values
  are saved in the URL (`/courses?q=...&cat=...&sort=...`). When the user opens a course and clicks
  "Back to results", the same list shows again. Language words (Urdu, Sindhi...) work in the search box.
- **Other way:** Keep the values in `useState` in the `Courses` page. This is simpler, but the values are lost when the user leaves the page.
- **Reason:** People compare many courses and go back and forth. They should not need to filter again.
  When nothing matches, the page shows a "Clear search" button.
- **Cost:** More code (`useSearchParams`). The URL changes each time the user types.
- **Code:** `src/pages/Courses.jsx` (`useSearchParams`, `updateParam`) and `backLink` in `src/pages/CourseDetails.jsx`.
- **Evidence:** Report, figure 6.2 and figure 6.3. Steps: open `/courses`, choose the category "Equipment",
  open "Spray Drift Prevention", click "Back to results". The filter is still on.

## Decision 3: Show the conditions before the user adds a course

- **Problem:** On sj-ce.org the course page does not say anything about a licence or an ID. The "Please Note"
  message (fraud warning and a Yes/No statement about the licence or certificate number) only shows in a pop-up after
  the user clicks "Take this course". A user finds out about the condition at the last step.
- **Decision:** "Licence required" shows on the card and in a notice on the course page. The seat limit and the
  smallest order show in the cart. At checkout the site checks the licence answer for each course in the cart.
- **Other way:** Show all conditions only at checkout.
- **Reason:** A user with no licence should know this before adding the course. This stops a wasted booking.
- **Cost:** More text on the cards and pages. The rules are checked in two places (cart and checkout).
- **Code:** `src/components/CourseCard.jsx` (badge), `src/pages/CourseDetails.jsx` (the `needsLicense` notice),
  `src/rules/rules.js` (`checkEligibility`) and `src/pages/Checkout.jsx` (`handleSubmit`).
- **Evidence:** Report, figure 6.4 and figure 6.9. Steps: open `/courses/c105`. The notice shows before "Add to cart".
  At checkout choose "No". The booking is blocked and a message tells the user why.
