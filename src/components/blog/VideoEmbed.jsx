import { useState } from 'react';
import Img from '../image/Img';

// Click-to-load YouTube player. Until someone presses play this is a poster
// served from this origin — no iframe, no YouTube cookies, and none of the
// player's script on an article most readers only scroll through. The iframe
// arrives on click, from the privacy-enhanced youtube-nocookie.com domain,
// which is the one frame origin the CSP allows (scripts/csp.mjs).
//
// With no `videoId` the poster links to `fallbackHref` instead, so the article
// still has a working video before the upload exists.
const PlayIcon = () => (
  <span className="blog__video-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="28" height="28" focusable="false">
      <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
    </svg>
  </span>
);

const VideoEmbed = ({ videoId, poster, title, playLabel, fallbackHref }) => {
  const [playing, setPlaying] = useState(false);

  const posterImg = (
    <Img
      src={poster}
      alt=""
      className="blog__video-poster"
      fetchPriority="high"
      decoding="async"
      sizes="(max-width: 820px) 100vw, 780px"
    />
  );

  if (!videoId) {
    return (
      <div className="blog__video">
        <a className="blog__video-play" href={fallbackHref} target="_blank" rel="noopener noreferrer" aria-label={playLabel}>
          {posterImg}
          <PlayIcon />
        </a>
      </div>
    );
  }

  return (
    <div className="blog__video">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button type="button" className="blog__video-play" onClick={() => setPlaying(true)} aria-label={playLabel}>
          {posterImg}
          <PlayIcon />
        </button>
      )}
    </div>
  );
};

export default VideoEmbed;
