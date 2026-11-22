import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Courses from "./pages/Courses.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import Cart from "./pages/Cart.jsx";
import NotFound from "./pages/NotFound.jsx";
import { courses } from "./data/courses.js";

export default function App() {
  const [cart, setCart] = useState([]);

  function addToCart(id) {
    setCart((prev) => (prev.some((item) => item.id === id) ? prev : [...prev, { id, qty: 1 }]));
  }

  const courseProps = {
    courses,
    loading: false,
    error: "",
    onRetry: () => {},
    cart,
    onAdd: addToCart,
  };

  return (
    <div className="app-container">
      <Header cartCount={cart.length} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses {...courseProps} />} />
          <Route path="/courses/:id" element={<CourseDetails {...courseProps} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
