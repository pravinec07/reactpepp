import React from 'react';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flex: 1,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <p style={{ fontSize: '30px', fontWeight: 'bold' }}>
            Loading failed! Please reload.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
