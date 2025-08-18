import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send the username input as the 'loginIdentifier'
        body: JSON.stringify({
            loginIdentifier: formData.username,
            password: formData.password
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      login(data.user, data.token);
      setLoading(false);
      navigate('/');
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>
        
        {/* Google Sign-In Button */}
        <a 
          href="http://localhost:5000/api/auth/google" 
          className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        >
          <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google icon" />
          <span className="text-gray-700 font-semibold">Sign in with Google</span>
        </a>

        {/* Divider */}
        <div className="flex items-center">
          <div className="flex-grow bg-gray-200 h-px"></div>
          <span className="px-4 text-gray-500 text-sm">or</span>
          <div className="flex-grow bg-gray-200 h-px"></div>
        </div>

        {/* Manual Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input 
              type='text' 
              placeholder='Enter your username' 
              className='w-full border border-gray-300 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500' 
              id='username' 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input 
              type='password' 
              placeholder='Enter your password' 
              className='w-full border border-gray-300 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500' 
              id='password' 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="text-right text-sm">
            <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
              Forgot Password?
            </Link>
          </div>
          
          <button 
            disabled={loading} 
            className='w-full bg-blue-600 text-white p-3 rounded-lg font-semibold uppercase hover:bg-blue-700 disabled:opacity-80 transition'
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          <p>
            Don't have an account?
            <Link to={'/signup'} className='font-medium text-blue-600 hover:text-blue-500 ml-1'>Sign up</Link>
          </p>
        </div>
        
        {error && <p className='text-red-500 text-center text-sm mt-4'>{error}</p>}
      </div>
    </div>
  );
}
