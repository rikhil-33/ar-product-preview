import { useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ARViewerPage from "./pages/ARViewerPage";
import RaycastBackground from "./components/RaycastBackground";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="app">
      <RaycastBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        {currentPage === "home" && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === "viewer" && <ARViewerPage setCurrentPage={setCurrentPage} />}
      </div>
    </div>
  );
}

export default App;