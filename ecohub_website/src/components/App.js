import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import HomePage from './HomePage';
import './App.css';
import { AuthContextProvider } from '../context/AuthContext'
import ComparePage from './ComparePage';


function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<AuthForm />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/compare" element={<ComparePage />} />
            {/* Redirect root to login page */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            {/* Catch all for undefined routes */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;