import React from 'react';
import { LanguageContext } from '../i18n/context';
import { DEFAULT_LANG, localizedPath } from '../i18n/routes';

// Catches render-time errors anywhere in the tree below it — including failed
// lazy-chunk imports on flaky networks — so a single broken component shows a
// recoverable message instead of a blank white screen.
//
// It sits inside LanguageProvider, so it can speak the visitor's language via
// contextType. The default context value returns the key path unchanged, which
// is why the copy below falls back to explicit English strings: if the failure
// took the provider with it, "Something went wrong" beats "error.title".
class ErrorBoundary extends React.Component {
  static contextType = LanguageContext;

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
      const { t, lang } = this.context ?? {};
      const text = (key, fallback) => (typeof t === 'function' ? t(key, fallback) : fallback);
      // A plain href, not a LocaleLink: the router is part of what may have
      // failed, so this has to work as a full page load. Keeping the language
      // prefix stops a Japanese visitor from being dropped onto the English
      // home page as their recovery route.
      const home = localizedPath(lang ?? DEFAULT_LANG, '/');

      return (
        <div className="error-boundary" role="alert">
          <h1 className="error-boundary__title">
            {text('error.title', 'Something went wrong')}
          </h1>
          <p className="error-boundary__text">
            {text('error.text', 'The page hit an unexpected error. Reloading usually fixes it.')}
          </p>
          <div className="error-boundary__actions">
            <button
              type="button"
              className="button"
              onClick={() => window.location.reload()}
            >
              {text('error.reload', 'Reload page')}
            </button>
            <a href={home} className="button button--ghost">
              {text('error.home', 'Go home')}
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
