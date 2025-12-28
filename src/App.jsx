import React from 'react';
import DubaiAIDashboard from './DubaiAIDashboard';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('❌ React Error:', error);
    console.error('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: '#e2e8f0',
          padding: '40px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>⚠️ Error Loading Dashboard</h1>
          <p style={{ marginBottom: '20px', color: '#94a3b8' }}>{this.state.error?.message || 'An unexpected error occurred'}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              background: '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Reload Page
          </button>
          <details style={{ marginTop: '20px', maxWidth: '600px' }}>
            <summary style={{ cursor: 'pointer', color: '#60a5fa' }}>Error Details</summary>
            <pre style={{
              marginTop: '10px',
              padding: '15px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '8px',
              overflow: 'auto',
              fontSize: '12px'
            }}>
              {this.state.error?.stack || this.state.error?.toString()}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <DubaiAIDashboard />
    </ErrorBoundary>
  );
}

export default App;

