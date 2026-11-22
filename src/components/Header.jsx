import { Link, NavLink } from "react-router-dom";

export default function Header({ cartCount }) {
  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="brand">AA Academy</Link>
        <nav aria-label="Main">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/cart">Cart ({cartCount})</NavLink>
        </nav>
      </div>
    </header>
  );
}
