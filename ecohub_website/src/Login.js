import React, { useState } from 'react';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login/signup logic here
    console.log(isLogin ? 'Login attempted with:' : 'Signup attempted with:', { email, password, name });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white rounded-lg shadow-lg">
      <div 
        className={`flex flex-col justify-center items-center w-full md:w-1/2 transition-all duration-700 ease-in-out transform ${isLogin ? 'translate-x-0' : 'translate-x-full'} ${isLogin ? 'order-1' : 'order-2'}`}
        style={{ position: isLogin ? 'relative' : 'absolute', right: isLogin ? 'auto' : '0', zIndex: isLogin ? '10' : '20' }}
      >
        {isLogin ? (
          // Login Form
          <div className="w-full max-w-md px-8 py-10">
            <div className="mb-6">
              <div className="flex items-center">
                <div className="text-emerald-500 border border-emerald-500 p-2 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                  </svg>
                </div>
                <span className="text-xl font-medium">EcoHub</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-6">Sign in to EcoHub</h1>
            
            <p className="text-gray-500 mb-8">or use your email account:</p>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="email"
                    className="w-full py-3 px-4 pl-10 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="absolute left-3 top-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full py-3 px-4 pl-10 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="absolute left-3 top-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <button 
                    type="button"
                    className="absolute right-3 top-3 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 014.02 8.971m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="mb-6 text-right">
                <a href="#" className="text-sm text-emerald-500 hover:underline">Forgot your password?</a>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-emerald-500 text-white py-3 rounded-md hover:bg-emerald-600 transition duration-300"
              >
                SIGN IN
              </button>
            </form>
          </div>
        ) : (
          // Signup Form
          <div className="w-full max-w-md px-8 py-10">
            <div className="mb-6">
              <div className="flex items-center">
                <div className="text-emerald-500 border border-emerald-500 p-2 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                  </svg>
                </div>
                <span className="text-xl font-medium">EcoHub</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Account</h1>
            
            <p className="text-gray-500 mb-8">or use your email for registration:</p>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full py-3 px-4 pl-10 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <div className="absolute left-3 top-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="email"
                    className="w-full py-3 px-4 pl-10 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="absolute left-3 top-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full py-3 px-4 pl-10 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="absolute left-3 top-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <button 
                    type="button"
                    className="absolute right-3 top-3 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 014.02 8.971m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-emerald-500 text-white py-3 rounded-md hover:bg-emerald-600 transition duration-300"
              >
                SIGN UP
              </button>
            </form>
          </div>
        )}
      </div>

      <div 
        className={`bg-emerald-500 text-white w-full md:w-1/2 flex flex-col justify-center items-center px-8 py-10 transition-all duration-700 ease-in-out transform ${isLogin ? 'translate-x-0' : '-translate-x-full'} ${isLogin ? 'order-2' : 'order-1'}`}
        style={{ position: isLogin ? 'relative' : 'absolute', left: isLogin ? 'auto' : '0', zIndex: isLogin ? '20' : '10' }}
      >
        {isLogin ? (
          // Content for the right side when in login mode
          <div className="text-center max-w-md">
            <h2 className="text-4xl font-bold mb-6">Hello, Friend!</h2>
            <p className="text-xl mb-8">Enter your personal details and start journey with us</p>
            <button 
              onClick={toggleForm} 
              className="border-2 border-white bg-transparent text-white px-10 py-3 rounded-full hover:bg-white hover:text-emerald-500 transition duration-300"
            >
              SIGN UP
            </button>
          </div>
        ) : (
          // Content for the left side when in signup mode
          <div className="text-center max-w-md">
            <h2 className="text-4xl font-bold mb-6">Welcome Back!</h2>
            <p className="text-xl mb-8">To keep connected with us please login with your personal info</p>
            <button 
              onClick={toggleForm} 
              className="border-2 border-white bg-transparent text-white px-10 py-3 rounded-full hover:bg-white hover:text-emerald-500 transition duration-300"
            >
              SIGN IN
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;