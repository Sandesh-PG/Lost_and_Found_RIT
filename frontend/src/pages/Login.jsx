import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import AuthBackdrop from '../components/AuthBackdrop';

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
    <div className="relative min-h-screen overflow-hidden bg-slate-50 flex items-center justify-center p-4">
      <AuthBackdrop />
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/60 bg-white/85 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl">
        <div className="mb-8 text-center">
          <p className="mb-3 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
            Secure access
          </p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            Welcome Back
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Sign in to track reports, browse listings, and manage your profile.
          </p>
        </div>
        
        {/* Google Sign-In Button */}
        <a
          href="http://localhost:5000/api/auth/google"
          className="w-full flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/90 py-3 px-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
        >
          <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google icon" />
          <span className="font-semibold text-slate-700">Sign in with Google</span>
        </a>

        {/* Divider */}
        <div className="flex items-center py-1">
          <div className="flex-grow bg-slate-200 h-px"></div>
          <span className="px-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">or</span>
          <div className="flex-grow bg-slate-200 h-px"></div>
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
              className='w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100' 
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
              className='w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100' 
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
            className='w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-3 font-semibold uppercase tracking-wide text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-80'
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          <p>
            Don't have an account?
            <Link to={'/signup'} className='ml-1 font-semibold text-blue-600 hover:text-blue-500'>Sign up</Link>
          </p>
        </div>
        
        {error && <p className='mt-4 text-center text-sm text-red-500'>{error}</p>}
      </div>
    </div>
  );
}
