import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
// Internal styles to avoid external CSS issues
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    width: '100%',
    fontFamily: 'Arial, sans-serif',
    overflow: 'hidden',
  },
  
  formContainer: {
    width: '50%',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  
  formContent: {
    maxWidth: '400px',
    width: '100%',
  },
  
  logo: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#00c2a8',
  },
  
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  
  subtitle: {
    color: '#666',
    marginBottom: '30px',
  },
  
  inputGroup: {
    marginBottom: '20px',
  },
  
  input: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#f5f5f5',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    marginBottom: '10px',
  },
  
  forgotPassword: {
    textAlign: 'right',
    marginBottom: '20px',
  },
  
  forgotLink: {
    color: '#00c2a8',
    textDecoration: 'none',
  },
  
  submitButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#00c2a8',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  
  coloredContainer: {
    width: '50%',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00c2a8',
    color: 'white',
    textAlign: 'center',
  },
  
  coloredTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  
  coloredText: {
    fontSize: '18px',
    marginBottom: '30px',
    lineHeight: '1.5',
  },
  
  coloredButton: {
    padding: '12px 45px',
    backgroundColor: 'transparent',
    border: '2px solid white',
    borderRadius: '30px',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
  }
};

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [spec, setSpec] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? 'Login attempted with:' : 'Signup attempted with:', { email, password, name });
    navigate('/home');
  };

  return (
    <div style={styles.container}>
      {/* Form Section */}
      <div style={styles.formContainer}>
        <div style={styles.formContent}>
          <div style={styles.logo}>EcoHub</div>

          <h1 style={styles.title}>{isLogin ? 'Sign in to EcoHub' : 'Create Account'}</h1>
          
          <p style={styles.subtitle}>
            {isLogin ? 'or use your email account:' : 'or use your email for registration:'}
          </p>
          
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div style={styles.inputGroup}>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            
            <div style={styles.inputGroup}>
              <input
                type="email"
                style={styles.input}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div style={styles.inputGroup}>
              <input
                type="password"
                style={styles.input}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {!isLogin && (
              <div style={styles.inputGroup}>
                <select
                  style={styles.input}
                  value={spec}
                  onChange={(e) => setSpec(e.target.value)}
                  required
                >
                  <option value="">Select Spec</option> {/* Default option */}
                  <option value="Edge">Edge</option>
                  <option value="LaptopPC">Laptop/PC</option>
                  <option value="Cloud">Cloud</option>
                </select>
              </div>
            )}
            
            {isLogin && (
              <div style={styles.forgotPassword}>
                <a href="#" style={styles.forgotLink}>Forgot your password?</a>
              </div>
            )}
            
            <button type="submit" style={styles.submitButton}>
              {isLogin ? 'SIGN IN' : 'SIGN UP'}
            </button>
          </form>
        </div>
      </div>

      {/* Colored Section */}
      <div style={styles.coloredContainer}>
        {isLogin ? (
          <div>
            <h2 style={styles.coloredTitle}>Hello, Friend!</h2>
            <p style={styles.coloredText}>Enter your personal details and start journey with us</p>
            <button onClick={toggleForm} style={styles.coloredButton}>
              SIGN UP
            </button>
          </div>
        ) : (
          <div>
            <h2 style={styles.coloredTitle}>Welcome Back!</h2>
            <p style={styles.coloredText}>To keep connected with us please login with your personal info</p>
            <button onClick={toggleForm} style={styles.coloredButton}>
              SIGN IN
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;