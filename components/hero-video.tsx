'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

const poster = '/videos/water-hero-poster.jpg';
const pickSource = () => window.matchMedia('(max-width: 48rem)').matches
  ? '/videos/water-hero-mobile.mp4' : '/videos/water-hero.mp4';

export function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState<string>();
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const respectPreferences = () => {
      if (motion.matches || connection?.saveData) {
        video.current?.pause();
        setSource(undefined);
        setReady(false);
      } else {
        setSource(pickSource());
      }
    };
    respectPreferences();
    motion.addEventListener('change', respectPreferences);
    return () => motion.removeEventListener('change', respectPreferences);
  }, []);

  useEffect(() => {
    if (!source || !video.current) return;
    video.current.muted = true;
    // Autoplay may be blocked by the browser; the play button remains available.
    void video.current.play().catch(() => {});
  }, [source]);

  function togglePlayback() {
    if (!source) { setSource(pickSource()); return; }
    if (video.current?.paused) {
      void video.current.play().catch(() => {});
    } else {
      video.current?.pause();
    }
  }

  return (
    <div className="hero-media">
      <img className="hero-poster" src={poster} alt="Close-up of fresh water pouring into a glass" fetchPriority="high" width="1280" height="720" />
      <video
        id="hero-film"
        ref={video}
        className={`hero-film${ready && !failed ? ' is-ready' : ''}`}
        src={source}
        poster={poster}
        muted
        loop
        playsInline
        preload={source ? 'metadata' : 'none'}
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => { setPlaying(true); setReady(true); }}
        onPause={() => setPlaying(false)}
        onError={() => { setFailed(true); setPlaying(false); }}
      />
      {!failed && <button className="video-toggle" type="button" aria-controls="hero-film" aria-label={playing ? 'Pause background video' : 'Play background video'} onClick={togglePlayback}>
        {playing ? <Pause size={16} aria-hidden="true"/> : <Play size={16} aria-hidden="true"/>}
        <span>{playing ? 'Pause video' : 'Play video'}</span>
      </button>}
    </div>
  );
}
