import React from 'react';
import './HomePage.css';

const cards = Array.from({ length: 12 }, (_, i) => `Card ${i + 1}`);

export default function HomePage() {
  return (
    <div className="homepage">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
        />
      </div>

      <div className="card-grid">
        {cards.map((card, index) => (
          <div key={index} className="card">
            <h2>{card}</h2>
            <p>This is a sample card description.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
