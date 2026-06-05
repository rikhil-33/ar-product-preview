import styled from 'styled-components';

const StyledWrapper = styled.div`
  .card {
    width: 190px;
    height: 254px;
    background-image: linear-gradient(163deg, rgba(180,140,255,0.8) 0%, rgba(80,40,180,0.8) 100%);
    border-radius: 20px;
    transition: all .3s;
    cursor: pointer;
    position: relative;
  }

  .card2 {
    width: 190px;
    height: 254px;
    background-color: rgba(15, 10, 35, 0.95);
    border-radius: 10px;
    transition: all .2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 20px;
    position: relative;
    overflow: hidden;
  }

  .card2::before {
    content: '';
    position: absolute;
    top: 0; left: 10%; right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(180,140,255,0.6), transparent);
  }

  .card2:hover {
    transform: scale(0.98);
    border-radius: 20px;
  }

  .card:hover {
    box-shadow: 0px 0px 30px 1px rgba(180, 140, 255, 0.35);
  }

  .card-tag {
    position: absolute;
    top: 12px;
    left: 12px;
    font-size: 9px;
    font-weight: 700;
    color: rgba(180,140,255,0.9);
    background: rgba(180,140,255,0.12);
    border: 1px solid rgba(180,140,255,0.25);
    padding: 3px 9px;
    border-radius: 999px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .card-emoji {
    font-size: 52px;
    filter: drop-shadow(0 0 16px var(--c));
    animation: float 4s ease-in-out infinite;
    margin-top: 8px;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  .card-glow {
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--c) 0%, transparent 70%);
    opacity: 0.25;
    filter: blur(16px);
    pointer-events: none;
  }

  .card-category {
    font-size: 10px;
    color: rgba(255,255,255,0.35);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 600;
    font-family: 'Syne', sans-serif;
  }

  .card-name {
    font-size: 13px;
    font-weight: 700;
    color: rgba(255,255,255,0.9);
    text-align: center;
    line-height: 1.3;
    font-family: 'Syne', sans-serif;
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 4px;
  }

  .card-price {
    font-size: 13px;
    font-weight: 700;
    color: rgba(180,140,255,0.9);
    font-family: 'Syne', sans-serif;
  }

  .card-ar-btn {
    font-size: 10px;
    font-weight: 600;
    color: rgba(255,255,255,0.5);
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    padding: 4px 8px;
    border-radius: 999px;
    transition: 0.2s;
    font-family: 'Syne', sans-serif;
  }

  .card-ar-btn:hover {
    color: rgba(180,140,255,0.9);
    border-color: rgba(180,140,255,0.3);
    background: rgba(180,140,255,0.08);
  }
`;

export default function ProductCard({ product, onClick }) {
  return (
    <StyledWrapper>
      <div className="card" onClick={onClick}>
        <div className="card2" style={{ '--c': product.color }}>
          {product.tag && <span className="card-tag">{product.tag}</span>}
          <div className="card-glow" />
          <span className="card-emoji">{product.emoji}</span>
          <span className="card-category">{product.category}</span>
          <span className="card-name">{product.name}</span>
          <div className="card-footer">
            <span className="card-price">{product.price}</span>
            <button className="card-ar-btn" onClick={onClick}>AR ◈</button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}
