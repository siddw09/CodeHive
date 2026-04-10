import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Frontend render error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#f9f5eb',
          color: '#002b5b',
          padding: '96px 24px 24px',
          fontFamily: '"JetBrains Mono", monospace',
        }}>
          <h1 style={{ fontSize: '1.2rem', marginBottom: 16 }}>Frontend crashed while rendering</h1>
          <p style={{ color: '#a0a0bd', marginBottom: 16 }}>
            Open the browser console for the full stack trace. The first error is shown below.
          </p>
          <pre style={{
            whiteSpace: 'pre-wrap',
            background: '#fffdf7',
            border: '1px solid rgba(0,43,91,0.14)',
            borderRadius: 12,
            padding: 16,
            overflow: 'auto',
          }}>
            {String(this.state.error)}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}
