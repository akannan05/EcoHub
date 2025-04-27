import React, { useState } from 'react';
import './HomePage.css';


const cards = Array.from({ length: 12 }, (_, i) => ({
 title: `Card ${i + 1}`,
 description: `This is a detailed description for Card ${i + 1}. Hover over the card to see more information about this eco-friendly initiative.`
}));


export default function HomePage() {
 const [flippedCards, setFlippedCards] = useState({});
 const [hoveredCard, setHoveredCard] = useState(null);


 const handleCardClick = (index) => {
   setFlippedCards(prev => ({
     ...prev,
     [index]: !prev[index]
   }));
   // Clear hover state when clicked
   setHoveredCard(null);
 };


 const handleCardHover = (index, isHovering) => {
   if (isHovering && !flippedCards[index]) {
     setHoveredCard(index);
   } else if (!isHovering && hoveredCard === index) {
     setHoveredCard(null);
   }
 };


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
         <div
           key={index}
           className={`card-container ${flippedCards[index] ? 'flipped' : ''} ${hoveredCard === index ? 'hovered' : ''}`}
           onClick={() => handleCardClick(index)}
           onMouseEnter={() => handleCardHover(index, true)}
           onMouseLeave={() => handleCardHover(index, false)}
         >
           <div className="card">
             <div className="card-front">
               <h2>{card.title}</h2>
               <p>Hover to preview, click to lock</p>
             </div>
             <div className="card-back">
               <p>{card.description}</p>
             </div>
           </div>
         </div>
       ))}
     </div>
   </div>
 );
}
