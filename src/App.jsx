import { useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SmokeBackground from "./components/SmokeBackground";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="app">
      <SmokeBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        {currentPage === "home" && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === "viewer" && (
          <div className="coming-soon">
            <h2>AR Viewer — Coming Soon</h2>
            <p>3D product viewer with AR try-on mode</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;