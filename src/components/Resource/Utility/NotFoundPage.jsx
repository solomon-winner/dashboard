// src/pages/NotFoundPage.jsx
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6 text-gray-800">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="animate-spin h-12 w-12 text-red-500 mb-4">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
      </svg>
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg">Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFoundPage;