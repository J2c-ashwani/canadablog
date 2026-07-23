'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#0f172a', 
      color: '#f8fafc', 
      padding: '2rem', 
      fontFamily: 'system-ui, -apple-system, sans-serif' 
    }}>
      <div style={{ textAlign: 'center', maxWidth: '32rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#38bdf8' }}>
          FSI Digital
        </h1>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
          Something went wrong!
        </h2>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: '1.6' }}>
          We apologize for the inconvenience. An unexpected error has occurred in our systems.
        </p>
        <button
          onClick={() => reset()}
          style={{ 
            padding: '0.75rem 1.5rem', 
            backgroundColor: '#0ea5e9', 
            color: 'white', 
            border: 'none', 
            borderRadius: '0.375rem', 
            fontSize: '1rem', 
            fontWeight: '500', 
            cursor: 'pointer', 
            transition: 'background-color 0.2s' 
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0ea5e9'}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
