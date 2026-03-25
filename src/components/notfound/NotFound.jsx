import { Link } from 'react-router-dom';
import './notfound.css';

const NotFound = () => {
  return (
    <section className="notfound section">
      <div className="notfound__container container">
        <span className="notfound__code">404</span>
        <h1 className="notfound__title">Page not found</h1>
        <p className="notfound__text">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="button button--flex">
          Back to Home
          <i className="uil uil-estate"></i>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
