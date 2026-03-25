import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import About from './components/about/About';
import Blog from './components/blog/Blog';
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
import { useEffect } from 'react';
import MMode from './components/blog/MMode';
import Hermes from './components/blog/Hermes';
import Hiro from './components/blog/Hiro';
import Assistant from './components/assistant/Assistant';
import NotFound from './components/notfound/NotFound';

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
    // when this page loads, check the hash and scroll to that section
    const hash = location.hash; // e.g. "#about"
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        // optional: setTimeout to ensure layout is ready
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 0);
      }
    }
  }, [location.hash]);

  return (
    <>
      <Header />

      <main className="main">
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
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/my-portfolio" element={<PortfolioPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/m-mode" element={<MMode />} />
        <Route path="/blog/hermes" element={<Hermes />} />
        <Route path="/blog/hiro" element={<Hiro />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Assistant />
    </BrowserRouter>
  );
}

export default App;
