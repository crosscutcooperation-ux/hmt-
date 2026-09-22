'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const moments = [
  {
    id: '01',
    label: 'ORIGIN / HMT',
    title: 'ENGINEERED',
    subtitle: 'FOR PRECISION.',
    description: 'Machine tools shaped by decades of industrial intelligence.',
    align: 'right',
  },
  {
    id: '02',
    label: 'PROCESS 01 / MACHINING',
    title: 'PRECISION MACHINING',
    subtitle: 'Where material becomes performance.',
    description: 'Every cut is controlled. Every surface has a purpose.',
    align: 'left',
  },
  {
    id: '03',
    label: 'PROCESS 02 / COMPONENTS',
    title: 'ENGINEERED COMPONENTS',
    subtitle: 'Every component. Every tolerance. Every detail.',
    description: 'Systems designed to work as one precise, powerful whole.',
    align: 'right',
  },
  {
    id: '04',
    label: 'PROCESS 03 / INSPECTION',
    title: 'MEASURED TO PERFORM.',
    subtitle: 'Quality without compromise.',
    description: 'Measured, tested and ready for the demands of tomorrow.',
    align: 'left',
  },
  {
    id: '05',
    label: 'OUTLOOK / HMT',
    title: 'HMT',
    subtitle: 'ENGINEERING THE FUTURE.',
    description: 'Precision is not a destination. It is the standard.',
    align: 'right',
  },
];

export default function Home() {
  const videoRef = useRef(null);
  const heroRef = useRef(null);
  const seekFrameRef = useRef(null);
  const targetTimeRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const seekVideo = gsap.quickTo(video, 'currentTime', {
      duration: 0.18,
      ease: 'none',
    });

    const syncVideo = () => {
      const trigger = heroRef.current;
      if (!trigger) return;

      ScrollTrigger.create({
        trigger,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.35,
        onUpdate: (self) => {
          if (!video.duration) return;
          targetTimeRef.current = self.progress * Math.max(0, video.duration - 0.05);

          if (seekFrameRef.current === null) {
            seekFrameRef.current = requestAnimationFrame(() => {
              const nextTime = targetTimeRef.current;
              if (Math.abs(video.currentTime - nextTime) > 0.015) {
                seekVideo(nextTime);
              }
              seekFrameRef.current = null;
            });
          }
        },
      });
    };

    if (video.readyState >= 1) {
      syncVideo();
    } else {
      video.addEventListener('loadedmetadata', syncVideo);
    }

    gsap.utils.toArray('.story-panel').forEach((panel) => {
      gsap.fromTo(
        panel,
        { opacity: 0.2, y: 72, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            start: 'top 92%',
            end: 'top 42%',
            scrub: 0.6,
          },
        }
      );
    });

    return () => {
      if (video) {
        video.removeEventListener('loadedmetadata', syncVideo);
      }
      if (seekFrameRef.current !== null) {
        cancelAnimationFrame(seekFrameRef.current);
      }
      ScrollTrigger.getAll().forEach((instance) => instance.kill());
    };
  }, []);

  return (
    <main className="page-shell">
      <section className="hero-stage" ref={heroRef}>
        <div className="video-shell">
          <video
            ref={videoRef}
            className="hero-video"
            muted
            playsInline
            preload="auto"
          >
            <source src="/hmt-hero-clean.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay" />
        </div>

        <div className="hero-panel">
          <div className="story-stack">
            {moments.map((moment) => (
              <div className={`story-panel story-${moment.align}`} key={moment.id}>
                <div className="eyebrow">{moment.id} / {moment.label}</div>
                <h1 className="hero-title">
                  {moment.title}
                  <span>{moment.subtitle}</span>
                </h1>
                <p className="hero-subtitle">
                  {moment.description}
                </p>
                <div className="hero-meta">
                  <span>SCROLL / TIMELINE</span>
                  <span>{moment.id} — 05</span>
                </div>
              </div>
            ))}
          </div>

          <div className="scroll-indicator">
            <span>SCROLL TO EXPLORE</span>
            <div className="indicator-line">
              <div className="indicator-fill" />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
