import { useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="app">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === "home" && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === "viewer" && (
        <div className="coming-soon">
          <h2>AR Viewer — Coming Soon</h2>
          <p>3D product viewer with AR try-on mode</p>
        </div>
      )}
    </div>
  );
}

export default App;