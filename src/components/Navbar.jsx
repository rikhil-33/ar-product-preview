import { motion } from "framer-motion";
import { Home, Eye, Box, History } from "lucide-react";
import "./Navbar.css";

export default function Navbar({ currentPage, setCurrentPage }) {
  // Navigation structure mapping directly to your App.jsx routing states
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "viewer", label: "AR Viewer", icon: Eye },
    { id: "products", label: "Products", icon: Box },
    { id: "history", label: "History", icon: History },
  ];

  return (
    <div className="floating-nav-wrapper">
      <nav className="floating-navbar">
        
        {/* Left Side: Glowing Brand Logo */}
        <div className="nav-dock-logo" onClick={() => setCurrentPage("home")}>
          <span className="logo-icon">◈</span>
          <span className="logo-text-short">ARLO</span>
        </div>

        {/* Center: The Floating Capsule Links */}
        <div className="nav-dock-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                className={`nav-dock-link ${isActive ? "active" : ""}`}
                onClick={() => setCurrentPage(item.id)}
              >
                {/* Desktop view shows text labels */}
                <span className="nav-link-text">{item.label}</span>
                
                {/* Mobile view shows sleek icons instead */}
                <span className="nav-link-icon">
                  <Icon size={18} strokeWidth={2.5} />
                </span>

                {/* Animated Lamp Highlight Pill */}
                {isActive && (
                  <motion.div
                    layoutId="lamp-dock-pill"
                    className="lamp-pill"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    {/* Glowing Accent Top Line */}
                    <div className="lamp-glow-line" />
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Side: Quick Action Button */}
        <button className="btn-dock-action" onClick={() => setCurrentPage("viewer")}>
          <span className="btn-desktop-text">Try AR Now</span>
          <span className="btn-mobile-text">Try AR</span>
        </button>

      </nav>
    </div>
  );
}