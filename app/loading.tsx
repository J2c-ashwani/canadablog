export default function Loading() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#0f172a' }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#38bdf8', margin: 0, animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
          FSI Digital
        </h1>
        
        {/* Loading spinner */}
        <div style={{ 
          width: '3rem', 
          height: '3rem', 
          border: '4px solid #1e293b',
          borderTopColor: '#0ea5e9',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        
        {/* Skeleton UI elements */}
        <div style={{ width: '100%', maxWidth: '32rem', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0 2rem' }}>
          <div style={{ height: '2rem', width: '75%', backgroundColor: '#1e293b', borderRadius: '0.375rem', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
          <div style={{ height: '1rem', width: '100%', backgroundColor: '#1e293b', borderRadius: '0.375rem', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '150ms' }} />
          <div style={{ height: '1rem', width: '85%', backgroundColor: '#1e293b', borderRadius: '0.375rem', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
