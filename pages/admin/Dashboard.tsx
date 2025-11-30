import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // The "Dashboard" is now the site itself.
    navigate('/');
    // We could add a toast here saying "Welcome Admin", but keeping it simple.
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to site editor...</p>
    </div>
  );
};