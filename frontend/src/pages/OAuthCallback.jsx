import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export default function OAuthCallback() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const handleOAuth = async () => {
      if (isProcessing) return;
      setIsProcessing(true);

      try {
        const params = new URLSearchParams(location.search);
        const urlToken = params.get('token');

        if (!urlToken) {
          throw new Error('Authentication token not found in URL.');
        }
        
        // Fetch the user's profile using the token from the URL
        const res = await fetch('/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${urlToken}`
          }
        });
        
        const userData = await res.json();

        if (!res.ok) {
          throw new Error(userData.message || 'Failed to fetch user profile.');
        }

        // Update the global state with user data AND the token
        login(userData, urlToken);
        navigate('/');

      } catch (error) {
        console.error('OAuth Callback Error:', error);
        navigate('/login');
      }
    };

    handleOAuth();
  }, [login, navigate, location, isProcessing]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl">Finalizing your login...</p>
    </div>
  );
}
