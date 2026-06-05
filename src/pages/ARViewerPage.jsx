import { useState, useRef, useEffect } from "react";
import "./ARViewerPage.css";

const products = [
  { id: 1, name: "Arc Lounge Chair", category: "Furniture", price: "₹24,999", emoji: "🪑", color: "#a78bfa" },
  { id: 2, name: "Minimal Desk Lamp", category: "Lighting", price: "₹3,499", emoji: "💡", color: "#fbbf24" },
  { id: 3, name: "Canvas Sneakers", category: "Footwear", price: "₹2,199", emoji: "👟", color: "#34d399" },
  { id: 4, name: "Leather Crossbody", category: "Accessories", price: "₹5,799", emoji: "👜", color: "#f87171" },
  { id: 5, name: "Bookshelf Pro", category: "Furniture", price: "₹18,499", emoji: "📚", color: "#60a5fa" },
  { id: 6, name: "Ceramic Table Lamp", category: "Lighting", price: "₹4,299", emoji: "🏮", color: "#fb923c" },
];

const sizes = ["XS", "S", "M", "L", "XL"];

export default function ARViewerPage({ setCurrentPage }) {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [mode, setMode] = useState("idle"); // idle | choose | camera | image
  const [scale, setScale] = useState(120);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 50, y: 40 }); // percent
  const [captured, setCaptured] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [liked, setLiked] = useState([]);
  const [camError, setCamError] = useState("");

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);
  const dragging = useRef(false);
  const dragStart = useRef({ mx: 0, my: 0, px: 0, py: 0 });
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);

  // Start camera
  const startCamera = async () => {
    setCamError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      setMode("camera");
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }, 100);
    } catch (err) {
      setCamError("Camera access denied. Please allow camera permission and try again.");
      setMode("idle");
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setMode("idle");
    setUploadedImage(null);
    setPosition({ x: 50, y: 40 });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    };
  }, []);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUploadedImage(ev.target.result);
      setMode("image");
      setPosition({ x: 50, y: 40 });
    };
    reader.readAsDataURL(file);
  };

  // Drag handlers
  const onMouseDown = (e) => {
    e.preventDefault();
    dragging.current = true;
    dragging.current = true;
    const rect = containerRef.current.getBoundingClientRect();
    dragStart.current = {
      mx: e.clientX,
      my: e.clientY,
      px: position.x,
      py: position.y,
      w: rect.width,
      h: rect.height,
    };
  };

  const onMouseMove = (e) => {
    if (!dragging.current) return;
    const dx = e.clientX - dragStart.current.mx;
    const dy = e.clientY - dragStart.current.my;
    const newX = dragStart.current.px + (dx / dragStart.current.w) * 100;
    const newY = dragStart.current.py + (dy / dragStart.current.h) * 100;
    setPosition({
      x: Math.max(5, Math.min(95, newX)),
      y: Math.max(5, Math.min(95, newY)),
    });
  };

  const onMouseUp = () => { dragging.current = false; };

  // Touch drag
  const onTouchStart = (e) => {
    const touch = e.touches[0];
    dragging.current = true;
    const rect = containerRef.current.getBoundingClientRect();
    dragStart.current = {
      mx: touch.clientX,
      my: touch.clientY,
      px: position.x,
      py: position.y,
      w: rect.width,
      h: rect.height,
    };
  };

  const onTouchMove = (e) => {
    if (!dragging.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStart.current.mx;
    const dy = touch.clientY - dragStart.current.my;
    const newX = dragStart.current.px + (dx / dragStart.current.w) * 100;
    const newY = dragStart.current.py + (dy / dragStart.current.h) * 100;
    setPosition({
      x: Math.max(5, Math.min(95, newX)),
      y: Math.max(5, Math.min(95, newY)),
    });
  };

  const onTouchEnd = () => { dragging.current = false; };

  // Capture
  const handleCapture = () => {
    setCaptured(true);
    setTimeout(() => setCaptured(false), 2000);
  };

  const toggleLike = (id) => {
    setLiked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const isActive = mode === "camera" || mode === "image";

  return (
    <main className="ar-viewer">
      {/* Top bar */}
      <div className="ar-topbar">
        <button className="ar-back" onClick={() => { stopCamera(); setCurrentPage("home"); }}>← Back</button>
        <div className="ar-topbar-title">
          <span className="ar-topbar-name">{selectedProduct.name}</span>
          <span className="ar-topbar-cat">{selectedProduct.category}</span>
        </div>
        <div className="ar-topbar-price">{selectedProduct.price}</div>
      </div>

      <div className="ar-layout">
        {/* Left sidebar */}
        <aside className="ar-sidebar">
          <p className="ar-sidebar-label">Products</p>
          <div className="ar-product-list">
            {products.map(p => (
              <button
                key={p.id}
                className={`ar-product-item ${selectedProduct.id === p.id ? "active" : ""}`}
                onClick={() => { setSelectedProduct(p); }}
              >
                <span className="ar-product-item-emoji" style={{ "--c": p.color }}>{p.emoji}</span>
                <div className="ar-product-item-info">
                  <span className="ar-product-item-name">{p.name}</span>
                  <span className="ar-product-item-price">{p.price}</span>
                </div>
                <button
                  className={`ar-like ${liked.includes(p.id) ? "liked" : ""}`}
                  onClick={e => { e.stopPropagation(); toggleLike(p.id); }}
                >♥</button>
              </button>
            ))}
          </div>
        </aside>

        {/* Center canvas */}
        <div className="ar-canvas-wrap">
          <div
            ref={containerRef}
            className={`ar-canvas ${isActive ? "active" : ""} ${captured ? "flash" : ""}`}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Camera feed */}
            {mode === "camera" && (
              <video
                ref={videoRef}
                className="ar-video"
                autoPlay
                playsInline
                muted
              />
            )}

            {/* Uploaded image */}
            {mode === "image" && uploadedImage && (
              <img src={uploadedImage} className="ar-bg-image" alt="uploaded" />
            )}

            {/* Idle state */}
            {mode === "idle" && (
              <div className="ar-idle">
                <div className="ar-idle-product" style={{ "--c": selectedProduct.color }}>
                  <div className="ar-glow" />
                  <span className="ar-big-emoji">{selectedProduct.emoji}</span>
                </div>
                <p className="ar-idle-hint">Tap <strong>Start AR</strong> to place this in your space</p>
                {camError && <p className="ar-error">{camError}</p>}
              </div>
            )}

            {/* Choose mode overlay */}
            {mode === "choose" && (
              <div className="ar-choose-overlay">
                <h3 className="ar-choose-title">How do you want to try it?</h3>
                <div className="ar-choose-options">
                  <button className="ar-choose-btn" onClick={startCamera}>
                    <span className="ar-choose-icon">📷</span>
                    <span className="ar-choose-label">Turn on Camera</span>
                    <span className="ar-choose-sub">See it live in your space</span>
                  </button>
                  <button className="ar-choose-btn" onClick={() => fileInputRef.current.click()}>
                    <span className="ar-choose-icon">🖼️</span>
                    <span className="ar-choose-label">Upload a Photo</span>
                    <span className="ar-choose-sub">Place it on your image</span>
                  </button>
                </div>
                <button className="ar-choose-cancel" onClick={() => setMode("idle")}>Cancel</button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
              </div>
            )}

            {/* Draggable product overlay */}
            {isActive && (
              <>
                <div
                  className="ar-overlay-product"
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale / 100})`,
                    "--c": selectedProduct.color,
                  }}
                  onMouseDown={onMouseDown}
                  onTouchStart={onTouchStart}
                >
                  <div className="ar-overlay-glow" />
                  <span className="ar-overlay-emoji">{selectedProduct.emoji}</span>
                </div>

                {/* Corner brackets */}
                <div className="ar-corners">
                  <div className="ar-corner tl" /><div className="ar-corner tr" />
                  <div className="ar-corner bl" /><div className="ar-corner br" />
                </div>

                {/* Live badge */}
                <div className="ar-live-badge">
                  <span className="ar-live-dot" />
                  {mode === "camera" ? "AR LIVE" : "AR IMAGE"}
                </div>

                {/* Drag hint */}
                <div className="ar-drag-hint">Drag to move · Sliders to resize & rotate</div>
              </>
            )}

            {/* Controls */}
            {isActive && (
              <div className="ar-controls-bar">
                <div className="ar-ctrl">
                  <span>Size</span>
                  <input type="range" min="40" max="250" value={scale} onChange={e => setScale(+e.target.value)} className="ar-slider" />
                  <span>{scale}%</span>
                </div>
                <div className="ar-ctrl">
                  <span>Rotate</span>
                  <input type="range" min="0" max="360" value={rotation} onChange={e => setRotation(+e.target.value)} className="ar-slider" />
                  <span>{rotation}°</span>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="ar-actions">
            {!isActive && mode !== "choose" && (
              <button className="ar-btn-main start" onClick={() => setMode("choose")}>
                ◈ Start AR
              </button>
            )}
            {isActive && (
              <>
                <button className="ar-btn-main stop" onClick={stopCamera}>⏹ Stop AR</button>
                <button className="ar-btn-icon" onClick={handleCapture} title="Capture">📸</button>
                <button className="ar-btn-icon" title="Share">↗</button>
              </>
            )}
            {mode === "choose" && (
              <button className="ar-btn-main" onClick={() => setMode("idle")}>← Cancel</button>
            )}
          </div>

          {captured && <div className="ar-toast">✓ Captured!</div>}
        </div>

        {/* Right details */}
        <aside className="ar-details">
          <div className="ar-detail-card">
            <div className="ar-detail-emoji" style={{ "--c": selectedProduct.color }}>{selectedProduct.emoji}</div>
            <h2 className="ar-detail-name">{selectedProduct.name}</h2>
            <p className="ar-detail-cat">{selectedProduct.category}</p>
            <p className="ar-detail-price">{selectedProduct.price}</p>
          </div>

          <div className="ar-size-wrap">
            <p className="ar-sidebar-label">Select Size</p>
            <div className="ar-sizes">
              {sizes.map(s => (
                <button key={s} className={`ar-size ${selectedSize === s ? "active" : ""}`} onClick={() => setSelectedSize(s)}>{s}</button>
              ))}
            </div>
          </div>

          <div className="ar-info-list">
            <div className="ar-info-item"><span>Free delivery</span><span className="ar-info-val">Above ₹499</span></div>
            <div className="ar-info-item"><span>Returns</span><span className="ar-info-val">30 days</span></div>
            <div className="ar-info-item"><span>In stock</span><span className="ar-info-val green">Yes</span></div>
          </div>

          <button className="ar-add-cart">Add to Cart →</button>
        </aside>
      </div>
    </main>
  );
}