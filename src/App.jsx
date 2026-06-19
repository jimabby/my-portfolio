import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Portfolio from './components/portfolio/Portfolio';
import Qualification from './components/qualification/Qualification';
import ScrollUp from './components/scrollup/ScrollUp';
import Services from './components/services/Services';
import Skills from './components/skills/Skills';
import Testimonials from './components/Testimonials/Testimonials';
import { Suspense, lazy, useEffect } from 'react';
import NotFound from './components/notfound/NotFound';

// Route-level code splitting: the blog pages and the chat assistant pull in
// heavy dependencies (long-form content, the Gemini SDK) that the landing page
// doesn't need, so they load on demand instead of in the initial bundle.
const Blog = lazy(() => import('./components/blog/Blog'));
const MMode = lazy(() => import('./components/blog/MMode'));
const Hermes = lazy(() => import('./components/blog/Hermes'));
const Hiro = lazy(() => import('./components/blog/Hiro'));
const GrandHotelTaipei = lazy(() => import('./components/blog/GrandHotelTaipei'));
const Assistant = lazy(() => import('./components/assistant/Assistant'));

function useSectionReveal() {
  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section--visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
}

function PortfolioPage() {
  const location = useLocation();
  useSectionReveal();

  useEffect(() => {
    const hash = location.hash; // e.g. "#about"
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    // Wait one frame so the DOM is laid out before scrolling.
    const id = requestAnimationFrame(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
    return () => cancelAnimationFrame(id);
  }, [location.hash, location.pathname]);

  return (
    <>
      <Header />

      <main className="main" id="main-content">
        <Home />
        <About />
        <Skills />
        <Services />
        <Qualification />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <ScrollUp />
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div id="top"></div>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/m-mode" element={<MMode />} />
          <Route path="/blog/hermes" element={<Hermes />} />
          <Route path="/blog/hiro" element={<Hiro />} />
          <Route path="/blog/grand-hotel-taipei" element={<GrandHotelTaipei />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Suspense fallback={null}>
        <Assistant />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
