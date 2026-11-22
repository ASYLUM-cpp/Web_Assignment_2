import { useSearchParams } from "react-router-dom";
import CourseCard from "../components/CourseCard.jsx";
import DataStatus from "../components/DataStatus.jsx";

export default function Courses({ courses, loading, error, onRetry, cart, onAdd }) {
  // Search, filter and sort are saved in the URL. So "Back" keeps them.
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q") || "";
  const category = searchParams.get("cat") || "All";
  const sort = searchParams.get("sort") || "title";

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
  }

  if (loading || error) {
    return <DataStatus loading={loading} error={error} onRetry={onRetry} />;
  }

  if (courses.length === 0) {
    return (
      <div className="message">
        <h1>Courses</h1>
        <p>No courses right now 😕 Check back later.</p>
      </div>
    );
  }

  const categories = ["All", ...new Set(courses.map((c) => c.category))];

  const filtered = courses.filter((c) => {
    const text = `${c.title} ${c.description} ${c.category} ${c.language}`.toLowerCase();
    const matchesSearch = text.includes(search.trim().toLowerCase());
    const matchesCategory = category === "All" || c.category === category;
    return matchesSearch && matchesCategory;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-low") return a.price - b.price;
    if (sort === "price-high") return b.price - a.price;
    if (sort === "hours") return a.hours - b.hours;
    return a.title.localeCompare(b.title);
  });

  return (
    <>
      <h1>Courses</h1>

      <div className="toolbar">
        <div>
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="search"
            placeholder="cotton, drift, Urdu..."
            value={search}
            onChange={(e) => updateParam("q", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select id="category" value={category} onChange={(e) => updateParam("cat", e.target.value === "All" ? "" : e.target.value)}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sort">Sort by</label>
          <select id="sort" value={sort} onChange={(e) => updateParam("sort", e.target.value)}>
            <option value="title">Title (A–Z)</option>
            <option value="price-low">Price (low to high)</option>
            <option value="price-high">Price (high to low)</option>
            <option value="hours">Hours (shortest first)</option>
          </select>
        </div>
      </div>

      <p className="hint" aria-live="polite">Showing {sorted.length} of {courses.length} courses</p>

      {sorted.length === 0 ? (
        <div className="message">
          <p>Nothing matched your search{category !== "All" ? ` in "${category}"` : ""}.</p>
          <button type="button" className="btn secondary" onClick={() => setSearchParams({})}>
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid">
          {sorted.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              inCart={cart.some((item) => item.id === course.id)}
              onAdd={onAdd}
              fromSearch={searchParams.toString()}
            />
          ))}
        </div>
      )}
    </>
  );
}
