import React, { useState, useEffect, useRef } from 'react';
import './HomePage.css';
import { FaSearch, FaTimes, FaArrowUp, FaLeaf, FaChartLine, FaBrain, FaTimes as FaClose } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleModels, setVisibleModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeTab, setActiveTab] = useState('Models');
  const [selectedModel, setSelectedModel] = useState(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const [stats, setStats] = useState({
    totalModels: models.length,
    lowCarbonModels: models.filter(m => m.carbonFootprint === 'Low' || m.carbonFootprint === 'Very Low').length,
    highAccuracyModels: models.filter(m => m.accuracy !== 'N/A' && parseInt(m.accuracy) >= 90).length
  });
  const scrollTopRef = useRef(null);
  const navigate = useNavigate();


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


  // Animate cards appearing one by one
  useEffect(() => {
    setIsLoading(true);
    setVisibleModels([]);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory]);


  useEffect(() => {
    if (isLoading) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < filteredModels.length) {
        setVisibleModels(prev => [...prev, currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isLoading, filteredModels.length]);


  // Handle scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };


    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  const handleViewDetails = (model) => {
    setSelectedModel(model);
    setShowLightbox(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  };


  const closeLightbox = () => {
    setShowLightbox(false);
    document.body.style.overflow = ''; // Restore scrolling
  };


  return (
    <div className="homepage">
      <div className="hero-section">
        <div className="hero-tabs">
          <div
            className={`hero-tab ${activeTab === 'Compare' ? 'active' : ''}`}
            onClick={() => { setActiveTab('Compare'); navigate('/compare'); }}
            style={{ marginRight: '30px' }}
          >
            Compare Models
          </div>
          <div
            className={`hero-tab ${activeTab === 'Models' ? 'active' : ''}`}
            onClick={() => setActiveTab('Models')}
          >
            Models
          </div>
          <div
            className={`hero-tab ${activeTab === 'About' ? 'active' : ''}`}
            onClick={() => setActiveTab('About')}
          >
            About
          </div>
          <div
            className={`hero-tab ${activeTab === 'Contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('Contact')}
          >
            Contact
          </div>
        </div>
        <h1>Eco Hub</h1>
        <p className="tagline">Environmentally conscious machine learning models for sustainable AI</p>
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-value">{stats.totalModels}</span>
            <span className="stat-label">Models</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.lowCarbonModels}</span>
            <span className="stat-label">Low Carbon</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.highAccuracyModels}</span>
            <span className="stat-label">High Accuracy</span>
          </div>
        </div>
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
            className="card-container"
            style={{
              animationDelay: `${index * 0.1}s`,
              opacity: visibleModels.includes(index) ? 1 : 0,
              transform: visibleModels.includes(index) ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <div className="card">
              <div className="card-icon">{model.icon}</div>
              <h2>{model.title}</h2>
              <div className="model-category">{model.category}</div>
              <div className="carbon-badge" data-footprint={model.carbonFootprint}>
                {model.carbonFootprint} Carbon
              </div>
              <p className="model-description">{model.description}</p>
              <div className="model-details">
                <div className="detail-item">
                  <span className="detail-label">Accuracy:</span>
                  <span className="detail-value">{model.accuracy}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Use Case:</span>
                  <span className="detail-value">{model.useCase.split(',')[0]}</span>
                </div>
              </div>
              <button className="learn-more-btn" onClick={() => handleViewDetails(model)}>View Details</button>
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


      {showScrollTop && (
        <button
          className="scroll-top-btn"
          onClick={scrollToTop}
          ref={scrollTopRef}
        >
          ↑
        </button>
      )}


      {/* Lightbox for Model Details */}
      {showLightbox && selectedModel && (
        <div className={`lightbox-overlay ${showLightbox ? 'active' : ''}`}>
          <div className="lightbox-content">
            <button className="lightbox-close" onClick={closeLightbox}>
              <FaClose />
            </button>
            <div className="lightbox-header">
              <div className="lightbox-icon">{selectedModel.icon}</div>
              <h2 className="lightbox-title">{selectedModel.title}</h2>
              <div className="lightbox-category">{selectedModel.category}</div>
            </div>
            <div className="lightbox-body">
              <p className="lightbox-description">{selectedModel.description}</p>

              <div className="lightbox-specs">
                <h3>Specifications</h3>
                <div className="spec-item">
                  <span className="spec-label">Carbon Footprint</span>
                  <span className="spec-value">{selectedModel.carbonFootprint}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Accuracy</span>
                  <span className="spec-value">{selectedModel.accuracy}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Category</span>
                  <span className="spec-value">{selectedModel.category}</span>
                </div>
              </div>

              <div className="lightbox-use-case">
                <h3>Use Cases</h3>
                <ul className="use-case-list">
                  {selectedModel.useCase.split(',').slice(0, 3).map((useCase, idx) => (
                    <li key={idx} className="use-case-item">{useCase.trim()}</li>
                  ))}
                  {selectedModel.useCase.split(',').length > 3 && (
                    <li className="use-case-item">+ {selectedModel.useCase.split(',').length - 3} more use cases</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
