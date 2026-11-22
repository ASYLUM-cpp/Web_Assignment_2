import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Courses from "./pages/Courses.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Confirmation from "./pages/Confirmation.jsx";
import NotFound from "./pages/NotFound.jsx";
import { loadCourses } from "./api/loadCourses.js";

// Read the saved cart one time when the app starts
function readSavedCart() {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadCount, setReloadCount] = useState(0);
  const [cart, setCart] = useState(readSavedCart); // [{ id, qty }]

  // Load the courses (this runs again when the user clicks "Try again")
  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError("");

    loadCourses()
      .then((data) => {
        if (!ignore) {
          setCourses(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message);
          setLoading(false);
        }
      });

    // cleanup: ignore an old request if a new one starts
    return () => {
      ignore = true;
    };
  }, [reloadCount]);

  // Save the cart each time it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function retry() {
    setReloadCount((count) => count + 1);
  }

  function addToCart(id) {
    setCart((prev) => {
      if (prev.some((item) => item.id === id)) return prev;
      return [...prev, { id, qty: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function changeQty(id, qty) {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const dataProps = { courses, loading, error, onRetry: retry };

  return (
    <>
      <Header cartCount={cartCount} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/courses"
            element={<Courses {...dataProps} cart={cart} onAdd={addToCart} />}
          />
          <Route
            path="/courses/:id"
            element={<CourseDetails {...dataProps} cart={cart} onAdd={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                {...dataProps}
                cart={cart}
                onRemove={removeFromCart}
                onChangeQty={changeQty}
              />
            }
          />
          <Route
            path="/checkout"
            element={<Checkout {...dataProps} cart={cart} onClearCart={clearCart} />}
          />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer onDemoChange={retry} />
    </>
  );
}
