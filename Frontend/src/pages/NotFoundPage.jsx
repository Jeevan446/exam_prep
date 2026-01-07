import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Update countdown every second
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Redirect after 5 seconds
    const timeout = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-4 text-center">
      <h1 className="text-9xl font-bold text-secondary">404</h1>
      
      <h2 className="text-2xl md:text-4xl font-semibold text-ghost mb-4">
        Oops! Page Not Found
      </h2>
      
      <p className="text-ghost mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved. 
        You will be redirected to the homepage in <span className="font-bold text-secondary">{countdown}</span> seconds.
      </p>

      <div className="flex gap-4">
        <Link 
          to="/" 
          className="px-6 py-3 bg-secondary text-white rounded-lg font-medium hover:opacity-90 transition-all"
        >
          Go Home Now
        </Link>
        <button 
          onClick={() => navigate(-1)} 
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;