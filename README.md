# AA Academy

- **Course:** CS4032 Web Programming, Assignment 02, Fall 2026
- **Student:** M. Amish
- **Roll number:** 24I-2099
- **Section:** CY-5C
- **GitHub:** <add your public repo link>
- **Live website:** <add your Vercel link>
- **Final commit:** <add the commit hash>

## What is this?

AA Academy is a made-up website for online pesticide safety courses. The courses are for
farmers and spray workers in Sindh and Punjab. The user can look at 10 courses, search and filter
them, open a course page, put courses in a cart, fill in a form and see a confirmation.

All bookings are tests. No payment is taken. No data goes to a server.

The reference website is https://www.sj-ce.org/ (free online courses for pesticide workers).

## Commands

```
npm install      install the packages
npm run dev      start the website on your computer
npm run build    make the final files in the dist folder
npm test         run the rule test (node --test)
```

If you use your own Vite React project, run `npm install react-router-dom`. Then copy the
`src` folder and `index.html` into your project. Add this line to the "scripts" in package.json:
`"test": "node --test src/rules/rules.test.js"`. Also check that package.json has `"type": "module"`.

`vercel.json` is only for Vercel. It lets you refresh a page like `/courses/c101` without an error.

## Pages

| Route | What it shows |
|---|---|
| `/` | Home page |
| `/courses` | All courses. Search, category filter and sort. The choices stay in the URL |
| `/courses/:id` | One course. A wrong ID shows "Course not found" |
| `/cart` | Cart. Change the seats. See the summary |
| `/checkout` | Booking form |
| `/confirmation` | Test confirmation |
| any other URL | "Page not found" |

## The three rules (file: `src/rules/rules.js`)

| Rule | Condition | Where the user sees it | Edge case |
|---|---|---|---|
| Seats | 1 to 5 seats for each course, and not more than the seats left | Next to the seat box in the cart. Seats left show on the cards | 5 seats is OK. 6 seats is blocked. Course c103 has 2 seats left, so 3 is blocked |
| Licence | A course with "Licence required" needs the answer "Yes" in the form | Badge on the card, notice on the course page, question at checkout | Course c105 with "No" is blocked |
| Smallest order | The total must be PKR 1500 or more | Home page and cart summary | PKR 1500 is OK (c108 with 1 seat). PKR 800 is blocked (c102 with 1 seat) |

## How to test the edge cases

Use the "Dev tools" at the bottom of every page.

- **Loading error:** choose "Break it once (Try again fixes it)". An error shows. Click "Try again". The courses load.
  If you want to do it again, click "Reset" first.
- **Error every time:** choose "Break it for good". The error stays until you choose "Normal".
- **No courses:** choose "No courses".
- **Course sells out:** put "Safe Pesticide Handling Basics" in the cart. Click the "Sell out" button. Open the cart.
- **No search result:** search for `zzzz`.
- **Wrong URL:** open `/courses/xyz` or `/abc`.
- **No description:** course c110 has no description on purpose.
- **Long title:** course c106.
- **Bad saved cart:** in the browser console type
  `localStorage.setItem("cart", JSON.stringify([{id:"c999",qty:1}]))` and open `/cart`.

## Test parts and limits

- Orders, payment and SMS are tests. Only the cart is saved (in localStorage).
- If you open `/confirmation` by itself, you see "No recent booking".
- There are 10 courses in local data. There are no user accounts.
- I only checked the website in Chrome.

## Which file does what

| Idea | File | Function or component |
|---|---|---|
| Routes and URL parameter | `src/App.jsx`, `src/pages/CourseDetails.jsx` | `Routes`, `useParams` |
| Search, filter, sort in the URL | `src/pages/Courses.jsx` | `useSearchParams`, `updateParam` |
| Props and callback props | `src/pages/Courses.jsx`, `src/components/CourseCard.jsx` | `onAdd`, `onRetry` |
| useState and updates from the old state | `src/App.jsx` | `addToCart`, `changeQty`, `removeFromCart` |
| useEffect and cleanup | `src/App.jsx` | the effect that loads the courses |
| Save in localStorage | `src/App.jsx` | `readSavedCart`, the effect that saves the cart |
| Async loader | `src/api/loadCourses.js` | `loadCourses` |
| The three rules | `src/rules/rules.js` | `checkSeats`, `checkEligibility`, `checkMinOrder` |
| Rule test | `src/rules/rules.test.js` | 3 tests for `checkSeats` |
| Values from other values | `src/utils/cartHelpers.js` | `buildCartRows`, `getTotals` |
| Form and checks | `src/pages/Checkout.jsx` | `validateForm`, `handleChange`, `handleSubmit` |
| Show or hide parts | `src/components/DataStatus.jsx`, `src/pages/Cart.jsx` | loading, error, empty, sold out |
| Lists and keys | `src/pages/Courses.jsx` | `key={course.id}` |
