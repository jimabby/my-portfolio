import { BrowserRouter, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
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
import { Suspense, lazy, useEffect } from 'react';
import NotFound from './components/notfound/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import Seo from './components/seo/Seo';
import { detectBrowserLang, useLanguage } from './i18n/LanguageContext';
import { DEFAULT_LANG, PREFIXED_LOCALES, localizedPath, splitLocalePath } from './i18n/routes';

// Code splitting: the blog pages, the chat assistant, and the testimonials
// carousel (Swiper) pull in heavy dependencies the initial landing view doesn't
// need up front, so they load on demand instead of in the main bundle.
const Blog = lazy(() => import('./components/blog/Blog'));
const MMode = lazy(() => import('./components/blog/MMode'));
const Hermes = lazy(() => import('./components/blog/Hermes'));
const Hiro = lazy(() => import('./components/blog/Hiro'));
const GrandHotelTaipei = lazy(() => import('./components/blog/GrandHotelTaipei'));
const HousedRedesign = lazy(() => import('./components/blog/HousedRedesign'));
const Assistant = lazy(() => import('./components/assistant/Assistant'));
const Testimonials = lazy(() => import('./components/Testimonials/Testimonials'));
const CaseStudy = lazy(() => import('./components/portfolio/CaseStudy'));
const WorkIndex = lazy(() => import('./components/portfolio/WorkIndex'));
const Resume = lazy(() => import('./components/resume/Resume'));

function useSectionReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const observe = (el) => {
      if (!el.classList.contains('section--visible')) observer.observe(el);
    };

    document.querySelectorAll('.section').forEach(observe);

    // Lazy-loaded sections (e.g. Testimonials) mount after this effect runs, so
    // their <section> isn't caught by the initial query. Watch for sections
    // added later and observe them too, otherwise they stay at opacity: 0.
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.matches?.('.section')) observe(node);
          node.querySelectorAll?.('.section').forEach(observe);
        });
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}

function PortfolioPage() {
  const location = useLocation();
  const { t } = useLanguage();
  useSectionReveal();

  useEffect(() => {
    const hash = location.hash; // e.g. "#about"
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    // Wait one frame so the DOM is laid out before scrolling.
    const frameId = requestAnimationFrame(() => {
      const el = document.getElementById(hash.slice(1));
      const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
      if (el) el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    return () => cancelAnimationFrame(frameId);
  }, [location.hash, location.pathname]);

  return (
    <>
      <Seo title={t('seo.homeTitle')} description={t('seo.homeDesc')} path="/" />
      <Header />

      <main className="main" id="main-content">
        <Home />
        <About />
        <Skills />
        <Services />
        <Qualification />
        <Portfolio />
        <Suspense fallback={<div style={{ minHeight: '420px' }} />}>
          <Testimonials />
        </Suspense>
        <Contact />
      </main>

      <Footer />
      <ScrollUp />
    </>
  );
}

function RouteScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

// The URL decides the language, not localStorage — otherwise a shared link
// renders in whatever language the recipient last used, and every translation
// is unreachable to a crawler.
//
// The one exception is a first-ever visit to a bare English URL: if the browser
// asks for a language we publish and the visitor has never chosen one, we
// forward to that translation once. `replace` keeps it out of history, and it
// cannot loop because the destination is a prefixed path.
function LocaleRoute() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { lang, setLang, hasStoredPreference } = useLanguage();
  const urlLang = splitLocalePath(pathname).lang;

  useEffect(() => {
    if (urlLang !== lang) setLang(urlLang, { persist: false });
  }, [urlLang, lang, setLang]);

  useEffect(() => {
    if (urlLang !== DEFAULT_LANG || hasStoredPreference) return;
    const preferred = detectBrowserLang();
    if (preferred === DEFAULT_LANG) return;
    const { path } = splitLocalePath(pathname);
    navigate(localizedPath(preferred, path), { replace: true });
    // Runs only on the first render at an unprefixed URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Outlet />;
}

// The same page tree is mounted once per language: at the bare path for
// English and under /zh-Hans, /zh-Hant and /ja for the rest. LocaleRoute makes
// the URL the single source of truth for which language renders.
// Called once per language so each mount gets its own element instances.
const localePages = () => (
  <Route element={<LocaleRoute />}>
    <Route index element={<PortfolioPage />} />
    <Route path="blog" element={<Blog />} />
    <Route path="blog/m-mode" element={<MMode />} />
    <Route path="blog/hermes" element={<Hermes />} />
    <Route path="blog/hiro" element={<Hiro />} />
    <Route path="blog/grand-hotel-taipei" element={<GrandHotelTaipei />} />
    <Route path="blog/housed-redesign" element={<HousedRedesign />} />
    <Route path="resume" element={<Resume />} />
    {/* The index has to be declared before the :slug route so "/work" is not
        read as a case study whose slug is empty. */}
    <Route path="work" element={<WorkIndex />} />
    <Route path="work/:slug" element={<CaseStudy />} />
    <Route path="*" element={<NotFound />} />
  </Route>
);

// Everything inside the router, so tests can mount the same tree under a
// MemoryRouter and exercise real URLs.
export function AppRoutes() {
  const { t } = useLanguage();

  return (
    <>
      <div id="top"></div>
      <a href="#main-content" className="skip-link">{t('nav.skipToContent')}</a>
      <RouteScrollManager />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/">{localePages()}</Route>
          {PREFIXED_LOCALES.map((locale) => (
            <Route key={locale} path={`/${locale}`}>
              {localePages()}
            </Route>
          ))}
        </Routes>
      </Suspense>
      <Suspense fallback={null}>
        <Assistant />
      </Suspense>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AppRoutes />
        <Analytics />
        <SpeedInsights />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
