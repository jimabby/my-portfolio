import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import FirstPost from './components/blog/FirstPost';

function PortfolioPage() {
  useEffect(() => {
    // when this page loads, check the hash and scroll to that section
    const hash = window.location.hash; // e.g. "#about"
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        // optional: setTimeout to ensure layout is ready
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 0);
      }
    }
  }, []);

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
    <BrowserRouter>
      <div id="top"></div>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/my-portfolio" element={<PortfolioPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/first-post" element={<FirstPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;