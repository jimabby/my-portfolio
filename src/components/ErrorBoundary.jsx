import React from 'react';

// Catches render-time errors anywhere in the tree below it — including failed
// lazy-chunk imports on flaky networks — so a single broken component shows a
// recoverable message instead of a blank white screen.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" role="alert">
          <h1 className="error-boundary__title">Something went wrong</h1>
          <p className="error-boundary__text">
            The page hit an unexpected error. Reloading usually fixes it.
          </p>
          <div className="error-boundary__actions">
            <button
              type="button"
              className="button"
              onClick={() => window.location.reload()}
            >
              Reload page
            </button>
            <a href="/" className="button button--ghost">
              Go home
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
