import Link from 'next/link';

export default function NotFound() {
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
        <h2 style={{ fontSize: '4rem', fontWeight: '800', margin: '0 0 1rem 0', color: '#e2e8f0' }}>
          404
        </h2>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
          Page Not Found
        </h3>
        <p style={{ color: '#94a3b8', marginBottom: '2.5rem', lineHeight: '1.6' }}>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link 
            href="/" 
            style={{ 
              padding: '0.75rem 1.5rem', 
              backgroundColor: '#0ea5e9', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '0.375rem', 
              fontSize: '1rem', 
              fontWeight: '500' 
            }}
          >
            Homepage
          </Link>
          <Link 
            href="/contact" 
            style={{ 
              padding: '0.75rem 1.5rem', 
              backgroundColor: '#1e293b', 
              color: '#e2e8f0', 
              textDecoration: 'none', 
              borderRadius: '0.375rem', 
              fontSize: '1rem', 
              fontWeight: '500', 
              border: '1px solid #334155' 
            }}
          >
            Contact Us
          </Link>
          <Link 
            href="/grant-finder" 
            style={{ 
              padding: '0.75rem 1.5rem', 
              backgroundColor: '#1e293b', 
              color: '#e2e8f0', 
              textDecoration: 'none', 
              borderRadius: '0.375rem', 
              fontSize: '1rem', 
              fontWeight: '500', 
              border: '1px solid #334155' 
            }}
          >
            Grant Finder
          </Link>
        </div>
      </div>
    </div>
  );
}
