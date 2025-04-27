import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showTrees, setShowTrees] = useState(false);
  const navigation = useNavigate();

  // Reset and trigger tree animation when mode changes
  useEffect(() => {
    setShowTrees(false);
    const timer = setTimeout(() => {
      setShowTrees(true);
    }, 600); // Wait for the panel transition to complete
    
    return () => clearTimeout(timer);
  }, [isSignUpMode]);

  const toggleMode = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to trigger tree animation on form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowTrees(false);
    setTimeout(() => {
      setShowTrees(true);
    }, 100);
    navigation('/home')
  };

  return (
    <div className={`auth-container ${isSignUpMode ? 'signup-mode' : 'login-mode'}`}>
      {/* Trees Animation Container */}
      <div className={`trees-container ${showTrees ? 'show-trees' : ''}`}>
        <div className="tree tree-1"></div>
        <div className="tree tree-2"></div>
        <div className="tree tree-3"></div>
        <div className="tree tree-4"></div>
        <div className="tree tree-5"></div>
        <div className="tree tree-6"></div>
        <div className="tree tree-7"></div>
      </div>

      {/* Form Container */}
      <div className="form-container">
        <div className="form-content">
          <div className="logo">
            <div className="logo-icon">
              {/* Simple lock icon using HTML/CSS */}
              <div className="icon-lock"></div>
            </div>
            <div className="logo-text">EcoHub</div>
          </div>
          
          <h1 className="form-title">
            {isSignUpMode ? 'Create Account' : 'Sign in to EcoHub'}
          </h1>
          <p className="form-subtitle">
            {isSignUpMode ? 'Sign up to get started' : 'or use your email account:'}
          </p>
          
          <form onSubmit={handleSubmit}>
            {isSignUpMode && (
              <div className="form-group">
                <div className="input-with-icon">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Name"
                    required
                  />
                </div>
              </div>
            )}
            
            <div className="form-group">
              <div className="input-with-icon">
                <input
                  type="email"
                  className="form-input"
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <div className="input-with-icon">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            
            {isSignUpMode && (
              <div className="form-group">
                <select className="form-input" required>
                  <option value="">Select Spec</option>
                  <option value="Edge">Edge</option>
                  <option value="LaptopPC">Laptop/PC</option>
                  <option value="Cloud">Cloud</option>
                </select>
              </div>
            )}
            
            {!isSignUpMode && (
              <div className="forgot-password">
                <a href="#" className="forgot-link">
                  Forgot your password?
                </a>
              </div>
            )}
            
            <button type="submit" className="submit-button">
              {isSignUpMode ? 'SIGN UP' : 'SIGN IN'}
            </button>
          </form>
        </div>
      </div>
      
      {/* Colored Container */}
      <div className="colored-container">
        <div className="colored-content">
          <h2 className="colored-title">
            {isSignUpMode ? 'Welcome Back!' : 'Hello, Friend!'}
          </h2>
          <p className="colored-text">
            {isSignUpMode
              ? 'To keep connected with us please login with your personal info'
              : 'Enter your personal details and start journey with us'}
          </p>
          <button className="colored-button" onClick={toggleMode}>
            {isSignUpMode ? 'SIGN IN' : 'SIGN UP'}
          </button>
        </div>
      </div>
      
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .auth-container {
          display: flex;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          font-family: 'Roboto', sans-serif;
          position: relative;
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
          border-radius: 10px;
          background-color: #fff;
        }

        /* Form container */
        .form-container {
          width: 50%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          transition: transform 0.6s ease-in-out;
          z-index: 1;
          position: absolute;
        }

        .login-mode .form-container {
          left: 0;
          transform: translateX(0);
        }

        .signup-mode .form-container {
          left: 0;
          transform: translateX(100%);
        }

        .form-content {
          padding: 40px;
          max-width: 380px;
          width: 100%;
        }

        .logo {
          display: flex;
          align-items: center;
          margin-bottom: 24px;
        }

        .logo-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #00c2a8;
          border-radius: 4px;
          padding: 8px;
          margin-right: 8px;
          color: #00c2a8;
          width: 32px;
          height: 32px;
        }

        /* Simple lock icon */
        .icon-lock {
          width: 12px;
          height: 8px;
          border: 2px solid #00c2a8;
          border-radius: 3px;
          position: relative;
          margin-top: 6px;
        }

        .icon-lock:before {
          content: '';
          position: absolute;
          width: 6px;
          height: 6px;
          border: 2px solid #00c2a8;
          border-bottom: none;
          border-radius: 4px 4px 0 0;
          top: -8px;
          left: 1px;
        }

        .logo-text {
          font-size: 18px;
          font-weight: 500;
        }

        .form-title {
          font-size: 28px;
          font-weight: bold;
          color: #333;
          margin-bottom: 10px;
        }

        .form-subtitle {
          color: #666;
          margin-bottom: 30px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .input-with-icon {
          position: relative;
        }

        .form-input {
          width: 100%;
          padding: 12px;
          background-color: #f5f5f5;
          border: none;
          border-radius: 4px;
          outline: none;
          font-size: 14px;
          transition: all 0.3s;
        }

        select.form-input {
          padding-left: 12px;
        }

        .form-input:focus {
          box-shadow: 0 0 0 2px rgba(0, 194, 168, 0.3);
        }

        .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #999;
          width: 16px;
          height: 16px;
        }

        /* Simple mail icon */
        .mail-icon:before {
          content: '';
          position: absolute;
          width: 16px;
          height: 12px;
          border: 2px solid #999;
          border-radius: 2px;
        }

        .mail-icon:after {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 4px 4px 0 4px;
          border-color: #999 transparent transparent transparent;
          top: 6px;
          left: 4px;
          transform: rotate(180deg);
        }

        /* Simple lock icon for input */
        .lock-icon:before {
          content: '';
          position: absolute;
          width: 10px;
          height: 7px;
          border: 2px solid #999;
          border-radius: 3px;
          top: 8px;
        }

        .lock-icon:after {
          content: '';
          position: absolute;
          width: 6px;
          height: 6px;
          border: 2px solid #999;
          border-bottom: none;
          border-radius: 4px 4px 0 0;
          top: 2px;
          left: 2px;
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #999;
          font-size: 12px;
        }

        .forgot-password {
          text-align: right;
          margin-bottom: 20px;
        }

        .forgot-link {
          color: #00c2a8;
          font-size: 14px;
          text-decoration: none;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        .submit-button {
          width: 100%;
          padding: 12px;
          background-color: #00c2a8;
          color: white;
          border: none;
          border-radius: 4px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .submit-button:hover {
          background-color: #00a08a;
        }

        /* Colored container */
        .colored-container {
          width: 50%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #00c2a8;
          color: white;
          transition: transform 0.6s ease-in-out;
          z-index: 0;
          position: absolute;
        }

        .login-mode .colored-container {
          right: 0;
          transform: translateX(0);
        }

        .signup-mode .colored-container {
          right: 0;
          transform: translateX(-100%);
        }

        .colored-content {
          padding: 40px;
          max-width: 380px;
          text-align: center;
        }

        .colored-title {
          font-size: 36px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .colored-text {
          font-size: 18px;
          margin-bottom: 30px;
          line-height: 1.5;
        }

        .colored-button {
          padding: 12px 45px;
          background-color: transparent;
          border: 2px solid white;
          border-radius: 30px;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s;
        }

        .colored-button:hover {
          background-color: white;
          color: #00c2a8;
        }

        /* Trees Animation Styles */
        .trees-container {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .show-trees {
          opacity: 1;
        }
        
        .tree {
          position: absolute;
          bottom: 0;
          transform: scaleY(0);
          transform-origin: bottom;
          filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.1));
        }
        
        .show-trees .tree {
          animation: growTree 1.5s forwards;
        }
        
        .tree:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 14%;
          height: 20%;
          background-color: #774a26;
          border-radius: 0 0 30% 30%;
          z-index: -1;
        }
        
        .tree-1, .tree-4, .tree-7 {
          background-color: #3a8040;
          border-radius: 50% 50% 0 0 / 80% 80% 0 0;
        }
        
        .tree-2, .tree-5 {
          background-color: #4d9456;
          border-radius: 60% 60% 0 0 / 90% 90% 0 0;
        }
        
        .tree-3, .tree-6 {
          background-color: #5ba867;
          border-radius: 70% 70% 0 0 / 85% 85% 0 0;
        }
        
        .tree-1 {
          left: 8%;
          width: 120px;
          height: 160px;
          animation-delay: 0.1s !important;
        }
        
        .tree-2 {
          left: 20%;
          width: 160px;
          height: 220px;
          animation-delay: 0.3s !important;
        }
        
        .tree-3 {
          left: 35%;
          width: 200px;
          height: 280px;
          animation-delay: 0.2s !important;
        }
        
        .tree-4 {
          left: 50%;
          width: 180px;
          height: 260px;
          animation-delay: 0.4s !important;
        }
        
        .tree-5 {
          left: 65%;
          width: 150px;
          height: 200px;
          animation-delay: 0.25s !important;
        }
        
        .tree-6 {
          left: 78%;
          width: 130px;
          height: 190px;
          animation-delay: 0.45s !important;
        }
        
        .tree-7 {
          left: 90%;
          width: 100px;
          height: 140px;
          animation-delay: 0.5s !important;
        }
        
        /* Add leaf-like highlights */
        .tree:before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          background: radial-gradient(
            circle at 60% 30%, 
            rgba(255, 255, 255, 0.2) 0%, 
            transparent 30%
          );
          pointer-events: none;
        }
        
        @keyframes growTree {
          0% {
            transform: scaleY(0);
          }
          70% {
            transform: scaleY(1.05);
          }
          100% {
            transform: scaleY(1);
          }
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .auth-container {
            flex-direction: column;
          }
          
          .form-container, .colored-container {
            width: 100%;
            height: 50%;
            position: relative;
          }
          
          .login-mode .form-container,
          .signup-mode .form-container {
            transform: translateY(0);
            top: 0;
            left: auto;
          }
          
          .login-mode .colored-container {
            transform: translateY(0);
            bottom: 0;
            right: auto;
          }
          
          .signup-mode .colored-container {
            transform: translateY(-100%);
            top: 0;
            right: auto;
          }
          
          .signup-mode .form-container {
            transform: translateY(100%);
            top: 0;
            left: auto;
          }
          
          .form-content, .colored-content {
            padding: 30px;
          }
          
          .tree {
            width: 80px !important;
            height: 120px !important;
          }
          
          .tree-1 { left: 5%; }
          .tree-2 { left: 20%; }
          .tree-3 { left: 35%; }
          .tree-4 { left: 50%; }
          .tree-5 { left: 65%; }
          .tree-6 { left: 80%; }
          .tree-7 { left: 95%; }
        }
      `}</style>
    </div>
  );
};

export default AuthForm;