import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './HomePage.css';


// ML models data with environmental impact information
const models = [
 {
   title: 'EcoBERT',
   description: 'A lightweight BERT variant optimized for environmental text analysis with 60% reduced carbon footprint.',
   icon: '🌱',
   category: 'NLP',
   carbonFootprint: 'Low',
   accuracy: '92%',
   useCase: 'Environmental sentiment analysis, greenwashing detection'
 },
 {
   title: 'GreenVision',
   description: 'Computer vision model for identifying endangered species with minimal computational requirements.',
   icon: '🦁',
   category: 'Computer Vision',
   carbonFootprint: 'Very Low',
   accuracy: '89%',
   useCase: 'Wildlife monitoring, biodiversity assessment'
 },
 {
   title: 'EcoForecast',
   description: 'Time series prediction model for climate patterns with efficient architecture and reduced training cycles.',
   icon: '🌤️',
   category: 'Time Series',
   carbonFootprint: 'Medium',
   accuracy: '87%',
   useCase: 'Climate prediction, resource optimization'
 },
 {
   title: 'SustainableGAN',
   description: 'Generative model for creating eco-friendly product designs with optimized architecture.',
   icon: '🎨',
   category: 'Generative',
   carbonFootprint: 'Medium',
   accuracy: 'N/A',
   useCase: 'Sustainable product design, material optimization'
 },
 {
   title: 'EcoClassifier',
   description: 'Multi-class classification model for environmental data with minimal parameter count.',
   icon: '🔍',
   category: 'Classification',
   carbonFootprint: 'Low',
   accuracy: '94%',
   useCase: 'Waste classification, environmental hazard detection'
 },
 {
   title: 'GreenNLP',
   description: 'Natural language processing model for environmental policy analysis with efficient tokenization.',
   icon: '📜',
   category: 'NLP',
   carbonFootprint: 'Low',
   accuracy: '91%',
   useCase: 'Policy analysis, environmental regulation compliance'
 },
 {
   title: 'EcoDetector',
   description: 'Object detection model for environmental monitoring with reduced computational complexity.',
   icon: '🔎',
   category: 'Computer Vision',
   carbonFootprint: 'Low',
   accuracy: '88%',
   useCase: 'Pollution detection, deforestation monitoring'
 },
 {
   title: 'SustainableRL',
   description: 'Reinforcement learning model for energy optimization with efficient training algorithms.',
   icon: '⚡',
   category: 'Reinforcement Learning',
   carbonFootprint: 'Medium',
   accuracy: 'N/A',
   useCase: 'Energy management, resource allocation'
 },
 {
   title: 'EcoRecommender',
   description: 'Recommendation system for sustainable products with minimal data requirements.',
   icon: '🛒',
   category: 'Recommendation',
   carbonFootprint: 'Very Low',
   accuracy: '85%',
   useCase: 'Sustainable product recommendations, eco-friendly alternatives'
 },
 {
   title: 'GreenTransformer',
   description: 'Transformer architecture optimized for environmental applications with reduced attention heads.',
   icon: '🧠',
   category: 'NLP',
   carbonFootprint: 'Medium',
   accuracy: '90%',
   useCase: 'Environmental document analysis, sustainability reporting'
 },
 {
   title: 'EcoSegmenter',
   description: 'Image segmentation model for environmental analysis with efficient architecture.',
   icon: '🖼️',
   category: 'Computer Vision',
   carbonFootprint: 'Low',
   accuracy: '86%',
   useCase: 'Habitat mapping, environmental change detection'
 },
 {
   title: 'SustainableForecast',
   description: 'Forecasting model for renewable energy production with minimal computational requirements.',
   icon: '🌞',
   category: 'Time Series',
   carbonFootprint: 'Low',
   accuracy: '93%',
   useCase: 'Renewable energy prediction, grid management'
 }
];


export default function HomePage() {
 const [flippedCards, setFlippedCards] = useState({});
 const [hoveredCard, setHoveredCard] = useState(null);
 const [searchTerm, setSearchTerm] = useState('');
 const [selectedCategory, setSelectedCategory] = useState('All');
 const navigation = useNavigate();
 
 useEffect(() => {
  const storedEmail = localStorage.getItem('userEmail');
  if (storedEmail) {
    console.log('User is logged in with email:', storedEmail);
    // you can also set it to a state if you want to show it on the page
  } else {
    console.log('No user is logged in.');
    // maybe redirect to login page if you want
    navigation('/login')
  }
}, []);

 const handleCardClick = (index) => {
   // Toggle the flipped state of the card
   setFlippedCards(prev => ({
     ...prev,
     [index]: !prev[index]
   }));
  
   // Always clear hover state when clicked
   setHoveredCard(null);
 };


 const handleCardHover = (index, isHovering) => {
   // Only apply hover effect if the card is not already flipped
   if (isHovering && !flippedCards[index]) {
     setHoveredCard(index);
   } else if (!isHovering && hoveredCard === index) {
     setHoveredCard(null);
   }
 };


 // Get unique categories for filter
 const categories = ['All', ...new Set(models.map(model => model.category))];


 // Filter models based on search term and category
 const filteredModels = models.filter(model => {
   const matchesSearch =
     model.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     model.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
     model.useCase.toLowerCase().includes(searchTerm.toLowerCase());
  
   const matchesCategory = selectedCategory === 'All' || model.category === selectedCategory;
  
   return matchesSearch && matchesCategory;
 });


 return (
   <div className="homepage">
     <div className="hero-section">
       <h1>EcoML Hub</h1>
       <p className="tagline">Environmentally conscious machine learning models for sustainable AI</p>
     </div>
    
     <div className="filters-container">
       <div className="search-container">
         <div className="search-wrapper">
           <span className="search-icon">🔍</span>
           <input
             type="text"
             placeholder="Search eco-friendly ML models..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="search-input"
           />
           {searchTerm && (
             <button
               className="clear-search"
               onClick={() => setSearchTerm('')}
               aria-label="Clear search"
             >
               ✕
             </button>
           )}
         </div>
       </div>
      
       <div className="category-filters">
         {categories.map(category => (
           <button
             key={category}
             className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
             onClick={() => setSelectedCategory(category)}
           >
             {category}
           </button>
         ))}
       </div>
     </div>


     <div className="card-grid">
       {filteredModels.map((model, index) => (
         <div
           key={index}
           className={`card-container ${flippedCards[index] ? 'flipped' : ''} ${hoveredCard === index ? 'hovered' : ''}`}
           onClick={() => handleCardClick(index)}
           onMouseEnter={() => handleCardHover(index, true)}
           onMouseLeave={() => handleCardHover(index, false)}
         >
           <div className="card">
             <div className="card-front">
               <div className="card-icon">{model.icon}</div>
               <h2>{model.title}</h2>
               <div className="model-category">{model.category}</div>
               <div className="carbon-badge" data-footprint={model.carbonFootprint}>
                 {model.carbonFootprint} Carbon
               </div>
               <p className="card-hint">Hover to preview, click to lock</p>
             </div>
             <div className="card-back">
               <h3>{model.title}</h3>
               <p className="model-description">{model.description}</p>
              
               <div className="mowhy del-details">
                 <div className="detail-item">
                   <span className="detail-label">Accuracy:</span>
                   <span className="detail-value">{model.accuracy}</span>
                 </div>
                 <div className="detail-item">
                   <span className="detail-label">Category:</span>
                   <span className="detail-value">{model.category}</span>
                 </div>
                 <div className="detail-item">
                   <span className="detail-label">Carbon Footprint:</span>
                   <span className="detail-value">{model.carbonFootprint}</span>
                 </div>
               </div>
              
               <div className="use-case">
                 <span className="use-case-label">Use Case:</span>
                 <p>{model.useCase}</p>
               </div>
              
               <button className="learn-more-btn">View Model Details</button>
             </div>
           </div>
         </div>
       ))}
     </div>
    
     {filteredModels.length === 0 && (
       <div className="no-results">
         <p>No eco-friendly ML models found for "{searchTerm}" in {selectedCategory !== 'All' ? selectedCategory : 'all categories'}</p>
         <button onClick={() => {
           setSearchTerm('');
           setSelectedCategory('All');
         }}>Clear filters</button>
       </div>
     )}
   </div>
 );
}


