import DemoControls from "./DemoControls.jsx";

export default function Footer({ onDemoChange }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>AA Academy · made by M. Amish, powered by way too much chai ☕</p>
        <DemoControls onChange={onDemoChange} />
      </div>
    </footer>
  );
}
