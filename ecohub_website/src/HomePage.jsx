import React, { useState } from 'react';
import './HomePage.css';


const cards = Array.from({ length: 12 }, (_, i) => ({
 title: `Card ${i + 1}`,
 description: `This is a detailed description for Card ${i + 1}. Hover over the card to see more information about this eco-friendly initiative.`
}));


export default function HomePage() {
 const [flippedCards, setFlippedCards] = useState({});


 const handleCardClick = (index) => {
   setFlippedCards(prev => ({
     ...prev,
     [index]: !prev[index]
   }));
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
           className={`card-container ${flippedCards[index] ? 'flipped' : ''}`}
           onClick={() => handleCardClick(index)}
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
