import React, { useEffect, useMemo, useState } from 'react'
import { projectsData, projectsNav } from './Data';
import WorksItems from './WorksItems';

const Works = () => {
  const [item, setItem] = useState({name:  "all"});
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState(0);
  const [galleryState, setGalleryState] = useState({
    isOpen: false,
    title: '',
    summary: '',
    tags: [],
    images: [],
    index: 0,
  });

  const galleryImages = useMemo(() => galleryState.images, [galleryState.images]);

  useEffect(() => {
    if(item.name === "all"){
      setProjects(projectsData);
    }
    else {
      const newProjects = projectsData.filter((project) => {
        return project.category.toLowerCase() === item.name;
      });
      setProjects(newProjects);
    }
  }, [item]);

  const handleClick = (name, index) => {
    setItem({ name: name.toLowerCase() });
    setActive(index);
  }

  const openGallery = (project, startIndex = 0) => {
    const images = project.gallery && project.gallery.length > 0
      ? project.gallery
      : [project.image];
    setGalleryState({
      isOpen: true,
      title: project.title,
      summary: project.summary || '',
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

  useEffect(() => {
    if (!galleryState.isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [galleryState.isOpen, galleryState.index]);

  return (
    <div>
      <div className='work__filters'>
        {projectsNav.map((nav, index) => {
          return (
            <button
              type="button"
              onClick={() => handleClick(nav.name, index)}
              className={`${active === index ? 'active-work' : ""} work__item`}
              key={nav.name}
              aria-pressed={active === index}
            >
              {nav.name}
            </button>
          )
        })}
      </div>

      <div className='work__container container grid'>
        {projects.map((item) => {
          return (
            <WorksItems item={item} key={item.id} onOpenGallery={openGallery} />
          )
        })}
      </div>

      {galleryState.isOpen && (
        <div className="work__modal" role="dialog" aria-modal="true" aria-label={`${galleryState.title} gallery`}>
          <div className="work__modal-backdrop" onClick={closeGallery} />
          <div className="work__modal-content">
            <button type="button" className="work__modal-close" onClick={closeGallery} aria-label="Close gallery">
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
              {galleryImages.length > 1 && (
                <span className="work__modal-count">
                  {galleryState.index + 1} / {galleryImages.length}
                </span>
              )}
            </div>
            <div className={`work__modal-body${galleryImages.length <= 1 ? ' work__modal-body--single' : ''}`}>
              {galleryImages.length > 1 && (
                <button type="button" className="work__modal-nav work__modal-nav--prev" onClick={showPrev} aria-label="Previous image">
                  <i className="bx bx-chevron-left"></i>
                </button>
              )}
              <img
                src={galleryImages[galleryState.index]}
                alt={`${galleryState.title} screenshot ${galleryState.index + 1}`}
                className="work__modal-img"
              />
              {galleryImages.length > 1 && (
                <button type="button" className="work__modal-nav work__modal-nav--next" onClick={showNext} aria-label="Next image">
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
