'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ 
        margin: 0, 
        backgroundColor: '#0f172a', 
        color: '#f8fafc', 
        fontFamily: 'system-ui, -apple-system, sans-serif' 
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh', 
          padding: '2rem' 
        }}>
          <div style={{ textAlign: 'center', maxWidth: '32rem' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#38bdf8' }}>
              FSI Digital
            </h1>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: '#ef4444' }}>
              Critical System Error
            </h2>
            <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: '1.6' }}>
              A fatal error occurred at the application root level.
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
                cursor: 'pointer' 
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0ea5e9'}
            >
              Reload Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
