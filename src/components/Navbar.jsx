import { useState } from "react";
import "./Navbar.css";

export default function Navbar({ currentPage, setCurrentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => setCurrentPage("home")}>
        <span className="logo-icon">◈</span>
        <span className="logo-text">ARLO</span>
        <span className="logo-tag">AR Preview</span>
      </div>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <button
          className={`nav-link ${currentPage === "home" ? "active" : ""}`}
          onClick={() => { setCurrentPage("home"); setMenuOpen(false); }}
        >
          Home
        </button>
        <button
          className={`nav-link ${currentPage === "viewer" ? "active" : ""}`}
          onClick={() => { setCurrentPage("viewer"); setMenuOpen(false); }}
        >
          AR Viewer
        </button>
        <button className="nav-link" onClick={() => setMenuOpen(false)}>
          Products
        </button>
        <button className="nav-link" onClick={() => setMenuOpen(false)}>
          History
        </button>
      </div>

      <div className="navbar-actions">
        <button className="btn-try" onClick={() => setCurrentPage("viewer")}>
          Try AR Now
        </button>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}