import { useState } from "react";

// my little dev tools to break stuff on purpose (error, no courses, sold out)
export default function DemoControls({ onChange }) {
  const [mode, setMode] = useState(() => localStorage.getItem("demoMode") || "normal");

  function handleModeChange(e) {
    setMode(e.target.value);
    localStorage.setItem("demoMode", e.target.value);
    onChange();
  }

  function sellOutCourse() {
    localStorage.setItem("demoSoldOut", "c101");
    onChange();
  }

  function resetDemo() {
    localStorage.removeItem("demoSoldOut");
    localStorage.setItem("demoMode", "normal");
    setMode("normal");
    onChange();
  }

  return (
    <div className="demo-controls">
      <strong>🛠 Dev tools:</strong>
      <label htmlFor="demo-mode">Loading</label>
      <select id="demo-mode" value={mode} onChange={handleModeChange}>
        <option value="normal">Normal</option>
        <option value="fail-once">Break it once (Try again fixes it)</option>
        <option value="fail">Break it for good</option>
        <option value="empty">No courses</option>
      </select>
      <button type="button" className="btn secondary" onClick={sellOutCourse}>
        Sell out "Safe Pesticide Handling Basics"
      </button>
      <button type="button" className="btn secondary" onClick={resetDemo}>
        Reset
      </button>
    </div>
  );
}
