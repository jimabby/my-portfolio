import React, { useEffect, useMemo, useState } from 'react'
import { projectsData, projectsNav } from './Data';
import WorksItems from './WorksItems';
import { useLanguage } from '../../i18n/LanguageContext';

// Cards per page. The grid is 3 columns on desktop, so this fills three full
// rows and keeps the section from running the length of the page.
const PAGE_SIZE = 9;

const Works = () => {
  const { t } = useLanguage();
  const [item, setItem] = useState({name:  "all"});
  const [active, setActive] = useState(0);
  const [page, setPage] = useState(1);
  const gridRef = React.useRef(null);
  const pageChangePendingRef = React.useRef(false);
  const [galleryState, setGalleryState] = useState({
    isOpen: false,
    title: '',
    summary: '',
    tags: [],
    images: [],
    index: 0,
  });

  const galleryImages = useMemo(() => galleryState.images, [galleryState.images]);

  const closeButtonRef = React.useRef(null);
  const modalContentRef = React.useRef(null);
  const lastFocusedRef = React.useRef(null);

  const projects = useMemo(() => {
    if (item.name === 'all') return projectsData;
    return projectsData.filter(
      (project) => project.category.toLowerCase() === item.name
    );
  }, [item]);

  const totalPages = Math.max(1, Math.ceil(projects.length / PAGE_SIZE));
  // Guard against a stale page number if the filtered set ever shrinks under
  // the current page without going through handleClick.
  const currentPage = Math.min(page, totalPages);
  const visibleProjects = useMemo(
    () => projects.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [projects, currentPage]
  );

  useEffect(() => {
    if (!pageChangePendingRef.current) return;
    pageChangePendingRef.current = false;

    const grid = gridRef.current;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    grid?.scrollIntoView?.({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
    grid?.querySelector('.work__img-button')?.focus({ preventScroll: true });
  }, [currentPage]);

  const handleClick = (name, index) => {
    setItem({ name: name.toLowerCase() });
    setActive(index);
    setPage(1);
  }

  const goToPage = (next) => {
    const clamped = Math.min(Math.max(next, 1), totalPages);
    if (clamped === currentPage) return;
    pageChangePendingRef.current = true;
    setPage(clamped);
  };

  const openGallery = (project, startIndex = 0) => {
    lastFocusedRef.current = document.activeElement;
    const images = project.gallery && project.gallery.length > 0
      ? project.gallery
      : [project.image];
    setGalleryState({
      isOpen: true,
      title: project.title,
      summary: t(`projects.${project.id}`, project.summary || ''),
      tags: project.tags || [],
      images,
      index: Math.max(0, Math.min(startIndex, images.length - 1)),
    });
  };

  const closeGallery = () => {
    setGalleryState((prev) => ({ ...prev, isOpen: false }));
  };

  const showPrev = () => {
    setGalleryState((prev) => ({
      ...prev,
      index: (prev.index - 1 + prev.images.length) % prev.images.length,
    }));
  };

  const showNext = () => {
    setGalleryState((prev) => ({
      ...prev,
      index: (prev.index + 1) % prev.images.length,
    }));
  };

  const touchStartX = React.useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || galleryState.images.length <= 1) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) < 40) return;
    if (deltaX < 0) showNext();
    else showPrev();
  };

  useEffect(() => {
    if (!galleryState.isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'Tab' && modalContentRef.current) {
        const focusable = Array.from(
          modalContentRef.current.querySelectorAll(
            'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((element) => !element.disabled);
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [galleryState.isOpen, galleryState.index]);

  useEffect(() => {
    if (galleryState.isOpen) {
      closeButtonRef.current?.focus();
    } else if (lastFocusedRef.current) {
      lastFocusedRef.current.focus?.();
      lastFocusedRef.current = null;
    }
  }, [galleryState.isOpen]);

  return (
    <div>
      <div className='work__filters' inert={galleryState.isOpen}>
        {projectsNav.map((nav, index) => {
          return (
            <button
              type="button"
              onClick={() => handleClick(nav.name, index)}
              className={`${active === index ? 'active-work' : ""} work__item`}
              key={nav.name}
              aria-pressed={active === index}
            >
              {t(`portfolio.filters.${nav.name.toLowerCase()}`, nav.name)}
            </button>
          )
        })}
      </div>

      <div className='work__container container grid' ref={gridRef} inert={galleryState.isOpen}>
        {visibleProjects.map((item) => {
          return (
            <WorksItems item={item} key={item.id} onOpenGallery={openGallery} />
          )
        })}
      </div>

      {totalPages > 1 && (
        <nav
          className='work__pagination'
          aria-label={t('portfolio.pagination.label')}
          inert={galleryState.isOpen}
        >
          <button
            type='button'
            className='work__page work__page--arrow'
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label={t('portfolio.pagination.prev')}
          >
            <i className='bx bx-chevron-left'></i>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              type='button'
              key={n}
              className={`work__page${n === currentPage ? ' is-active' : ''}`}
              onClick={() => goToPage(n)}
              aria-label={t('portfolio.pagination.page').replace('{n}', n)}
              aria-current={n === currentPage ? 'page' : undefined}
            >
              {n}
            </button>
          ))}

          <button
            type='button'
            className='work__page work__page--arrow'
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label={t('portfolio.pagination.next')}
          >
            <i className='bx bx-chevron-right'></i>
          </button>

          <span className='work__page-status' aria-live='polite'>
            {t('portfolio.pagination.status')
              .replace('{current}', currentPage)
              .replace('{total}', totalPages)}
          </span>
        </nav>
      )}

      {galleryState.isOpen && (
        <div className="work__modal" role="dialog" aria-modal="true" aria-label={`${galleryState.title} gallery`}>
          <div className="work__modal-backdrop" onClick={closeGallery} />
          <div className="work__modal-content" ref={modalContentRef}>
            <button ref={closeButtonRef} type="button" className="work__modal-close" onClick={closeGallery} aria-label={t('portfolio.closeGallery')}>
              X
            </button>
            <div className="work__modal-header">
              <div className="work__modal-heading">
                <h3 className="work__modal-title">{galleryState.title}</h3>
                {galleryState.summary && (
                  <p className="work__modal-summary">{galleryState.summary}</p>
                )}
                {galleryState.tags.length > 0 && (
                  <div className="work__modal-tags">
                    {galleryState.tags.map((tag) => (
                      <span key={`${galleryState.title}-${tag}`} className="work__modal-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className={`work__modal-body${galleryImages.length <= 1 ? ' work__modal-body--single' : ''}`}>
              {galleryImages.length > 1 && (
                <button type="button" className="work__modal-nav work__modal-nav--prev" onClick={showPrev} aria-label={t('portfolio.prevImage')}>
                  <i className="bx bx-chevron-left"></i>
                </button>
              )}
              <div
                className="work__modal-figure"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={galleryImages[galleryState.index]}
                  alt={`${galleryState.title} screenshot ${galleryState.index + 1}`}
                  className="work__modal-img"
                />
                {galleryImages.length > 1 && (
                  <span className="work__modal-count">
                    {galleryState.index + 1} / {galleryImages.length}
                  </span>
                )}
              </div>
              {galleryImages.length > 1 && (
                <button type="button" className="work__modal-nav work__modal-nav--next" onClick={showNext} aria-label={t('portfolio.nextImage')}>
                  <i className="bx bx-chevron-right"></i>
                </button>
              )}
            </div>
            {galleryImages.length > 1 && (
              <div className="work__modal-thumbs">
                {galleryImages.map((img, idx) => (
                  <button
                    type="button"
                    key={`${galleryState.title}-${idx}`}
                    className={`work__modal-thumb${idx === galleryState.index ? ' is-active' : ''}`}
                    onClick={() => setGalleryState((prev) => ({ ...prev, index: idx }))}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    
  )
}

export default Works
