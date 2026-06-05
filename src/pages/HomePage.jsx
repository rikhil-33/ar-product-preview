import "./HomePage.css";


const products = [
 { id: 1, name: "Arc Lounge Chair", category: "Furniture", price: "₹24,999", tag: "Popular", emoji: "🪑" },
 { id: 2, name: "Minimal Desk Lamp", category: "Lighting", price: "₹3,499", tag: "New", emoji: "💡" },
 { id: 3, name: "Canvas Sneakers", category: "Footwear", price: "₹2,199", tag: "Trending", emoji: "👟" },
 { id: 4, name: "Leather Crossbody", category: "Accessories", price: "₹5,799", tag: "New", emoji: "👜" },
 { id: 5, name: "Bookshelf Pro", category: "Furniture", price: "₹18,499", tag: "Popular", emoji: "📚" },
 { id: 6, name: "Ceramic Table Lamp", category: "Lighting", price: "₹4,299", tag: "", emoji: "🏮" },
];


export default function HomePage({ setCurrentPage }) {
 return (
   <main className="homepage">


     {/* Hero */}
     <section className="hero">
       <div className="hero-badge">✦ Augmented Reality Shopping</div>
       <h1 className="hero-title">
         See it in your<br />
         <span className="hero-highlight">space first.</span>
       </h1>
       <p className="hero-sub">
         Point your camera. Place the product. Know before you buy.
         No app downloads. No guesswork. Just reality.
       </p>
       <div className="hero-actions">
         <button className="btn-primary" onClick={() => setCurrentPage("viewer")}>
           Launch AR Viewer →
         </button>
         <button className="btn-secondary">Browse Products</button>
       </div>


       <div className="hero-stats">
         <div className="stat"><span className="stat-num">50K+</span><span className="stat-label">Products</span></div>
         <div className="stat-divider" />
         <div className="stat"><span className="stat-num">2M+</span><span className="stat-label">AR Try-ons</span></div>
         <div className="stat-divider" />
         <div className="stat"><span className="stat-num">68%</span><span className="stat-label">Fewer Returns</span></div>
       </div>
     </section>


     {/* How it works */}
     <section className="how-it-works">
       <p className="section-eyebrow">How it works</p>
       <h2 className="section-title">Three steps. Zero doubt.</h2>
       <div className="steps-grid">
         <div className="step-card">
           <div className="step-num">01</div>
           <div className="step-icon">🛍️</div>
           <h3>Pick a product</h3>
           <p>Browse our catalogue and select any item you want to visualise.</p>
         </div>
         <div className="step-card">
           <div className="step-num">02</div>
           <div className="step-icon">📷</div>
           <h3>Open AR camera</h3>
           <p>Allow camera access. No app download. Works in your browser instantly.</p>
         </div>
         <div className="step-card">
           <div className="step-num">03</div>
           <div className="step-icon">✨</div>
           <h3>Place & decide</h3>
           <p>See it in your real space. Resize, rotate, capture, and share.</p>
         </div>
       </div>
     </section>


     {/* Products */}
     <section className="products-section">
       <p className="section-eyebrow">Featured products</p>
       <h2 className="section-title">Try before you buy</h2>
       <div className="products-grid">
         {products.map((p) => (
           <div key={p.id} className="product-card" onClick={() => setCurrentPage("viewer")}>
             <div className="product-visual">
               <span className="product-emoji">{p.emoji}</span>
               {p.tag && <span className="product-tag">{p.tag}</span>}
               <button className="ar-btn">View in AR ◈</button>
             </div>
             <div className="product-info">
               <span className="product-category">{p.category}</span>
               <h3 className="product-name">{p.name}</h3>
               <div className="product-footer">
                 <span className="product-price">{p.price}</span>
                 <button className="add-btn">+ Add</button>
               </div>
             </div>
           </div>
         ))}
       </div>
     </section>


     {/* CTA */}
     <section className="cta-section">
       <div className="cta-inner">
         <h2>Ready to shop smarter?</h2>
         <p>Join thousands of shoppers who never return a product anymore.</p>
         <button className="btn-primary" onClick={() => setCurrentPage("viewer")}>
           Start AR Shopping →
         </button>
       </div>
     </section>


     <footer className="footer">
       <span>◈ ARLO — AR Product Preview</span>
       <span>Built by Rikhil Siripurapu · KL University</span>
     </footer>


   </main>
 );
}
