import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Calendar,
  Folder
} from 'lucide-react';

import { GalleryItem } from '../data/initialData';

interface GalleryProps {
  gallery: GalleryItem[];
}

export const Gallery: React.FC<GalleryProps> = ({ gallery }) => {
  const [activeCategory, setActiveCategory] = useState<
    'All' | GalleryItem['category']
  >('All');

  const [lightboxIndex, setLightboxIndex] =
    useState<number | null>(null);

  const categories: (
    | 'All'
    | GalleryItem['category']
  )[] = [
    'All',
    'Workshops',
    'Seminars',
    'Hackathons',
    'Community',
    'Projects'
  ];

  // FILTER GALLERY
  const filteredGallery = gallery.filter((item) => {
    return activeCategory === 'All'
      ? true
      : item.category === activeCategory;
  });

  // OPEN LIGHTBOX
  const openLightbox = (item: GalleryItem) => {
    const index = filteredGallery.findIndex(
      (x) => x.id === item.id
    );

    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  // CLOSE LIGHTBOX
  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  // PREVIOUS IMAGE
  const handlePrev = () => {
    if (lightboxIndex === null) return;

    setLightboxIndex((prev) =>
      prev !== null && prev > 0
        ? prev - 1
        : filteredGallery.length - 1
    );
  };

  // NEXT IMAGE
  const handleNext = () => {
    if (lightboxIndex === null) return;

    setLightboxIndex((prev) =>
      prev !== null &&
      prev < filteredGallery.length - 1
        ? prev + 1
        : 0
    );
  };

  // ACTIVE IMAGE
  const activeLightboxItem =
    lightboxIndex !== null
      ? filteredGallery[lightboxIndex]
      : null;

  // KEYBOARD CONTROLS
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }

      if (event.key === 'ArrowLeft') {
        handlePrev();
      }

      if (event.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [lightboxIndex]);

  // BODY SCROLL LOCK
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [lightboxIndex]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 space-y-12 relative z-10">

      {/* HEADER */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">

        <span className="text-[10px] text-[#7bd355] uppercase tracking-widest font-bold">
          Visual Terminal // Gallery
        </span>

        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#e8ecee]">
          SOCIETY{' '}
          <span className="text-[#7bd355]">
            ARCHIVES
          </span>
        </h1>

        <p className="text-xs text-[#939596] leading-relaxed">
          Explore workshops, seminars,
          hackathons, and community events
          at Islamia University Peshawar.
        </p>

      </div>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#333333] pb-6">

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              closeLightbox();
            }}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              activeCategory === cat
                ? 'bg-[#7bd355] text-black shadow-[0_0_15px_rgba(123,211,85,0.25)]'
                : 'text-[#939596] hover:text-white hover:bg-[#333333]/30'
            }`}
          >
            {cat}
          </button>
        ))}

      </div>

      {/* GALLERY GRID */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">

        {filteredGallery.map((item) => (
          <div
            key={item.id}
            onClick={() => openLightbox(item)}
            className="break-inside-avoid relative group rounded-2xl overflow-hidden border border-[#333333] hover:border-[#7bd355]/40 transition-all cursor-pointer bg-[#161616]"
          >

            {/* IMAGE */}
            <img
              src={item.imageUrl}
              alt={item.title}
              className="block w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />

            {/* HOVER OVERLAY */}
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-between p-5">

              <div className="flex justify-between items-start">

                <span className="text-[9px] uppercase tracking-widest font-bold text-[#7bd355] bg-[#7bd355]/10 px-2 py-1 rounded">
                  {item.category}
                </span>

                <Maximize2 className="w-4 h-4 text-white" />

              </div>

              <div>

                <h3 className="text-sm font-bold text-white">
                  {item.title}
                </h3>

                <span className="text-[10px] text-[#b0b0b0] uppercase">
                  {item.date}
                </span>

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* LIGHTBOX */}
      {activeLightboxItem && (

        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm"
          style={{
            zIndex: 50
          }}
        >

          {/* BACKDROP - CLICKABLE TO CLOSE */}
          <div
            onClick={closeLightbox}
            className="absolute inset-0"
            style={{
              pointerEvents: 'auto'
            }}
          />

          {/* CLOSE BUTTON - RESPONSIVE & ALWAYS CLICKABLE */}
          <button
            type="button"
            onClick={closeLightbox}
            style={{
              position: 'fixed',
              top: 'clamp(10px, 3vw, 20px)',
              right: 'clamp(10px, 3vw, 20px)',
              width: 'clamp(44px, 12vw, 58px)',
              height: 'clamp(44px, 12vw, 58px)',
              borderRadius: '9999px',
              background: 'rgba(0,0,0,0.95)',
              border: '2px solid rgba(255,255,255,0.2)',
              color: '#ffffff',
              zIndex: 51,
              fontSize: 'clamp(20px, 5vw, 34px)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'auto',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(4px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(123, 211, 85, 0.15)';
              e.currentTarget.style.border = '2px solid #7bd355';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.95)';
              e.currentTarget.style.border = '2px solid rgba(255,255,255,0.2)';
            }}
          >
            ✕
          </button>

          {/* LEFT BUTTON */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            style={{
              position: 'fixed',
              left: 'clamp(5px, 2vw, 10px)',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 'clamp(44px, 10vw, 52px)',
              height: 'clamp(44px, 10vw, 52px)',
              borderRadius: '9999px',
              background: 'rgba(0,0,0,0.95)',
              border: '2px solid rgba(255,255,255,0.15)',
              color: '#ffffff',
              zIndex: 51,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'auto'
            }}
          >
            <ChevronLeft size={28} />
          </button>

          {/* RIGHT BUTTON */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            style={{
              position: 'fixed',
              right: 'clamp(5px, 2vw, 10px)',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 'clamp(44px, 10vw, 52px)',
              height: 'clamp(44px, 10vw, 52px)',
              borderRadius: '9999px',
              background: 'rgba(0,0,0,0.95)',
              border: '2px solid rgba(255,255,255,0.15)',
              color: '#ffffff',
              zIndex: 51,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'auto'
            }}
          >
            <ChevronRight size={28} />
          </button>

          {/* CONTENT */}
          <div
            className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
            style={{
              position: 'relative',
              zIndex: 10,
              pointerEvents: 'auto'
            }}
          >

            {/* IMAGE */}
            <img
              src={activeLightboxItem.imageUrl}
              alt={activeLightboxItem.title}
              style={{
                maxWidth: '95vw',
                maxHeight: '75vh',
                objectFit: 'contain',
                borderRadius: '20px',
                pointerEvents: 'none',
                border: '1px solid #333'
              }}
            />

            {/* INFO PANEL */}
            <div className="w-full max-w-3xl mt-6 bg-[#1b1b1b] border border-[#333333] rounded-2xl p-5">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-[#333333] pb-3">

                <h3 className="text-lg font-bold text-white">
                  {activeLightboxItem.title}
                </h3>

                <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider text-[#b0b0b0]">

                  <span className="flex items-center">
                    <Folder className="w-3.5 h-3.5 text-[#7bd355] mr-1" />
                    {activeLightboxItem.category}
                  </span>

                  <span className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 text-[#7bd355] mr-1" />
                    {activeLightboxItem.date}
                  </span>

                </div>

              </div>

              <p className="text-sm text-[#c0c0c0] leading-relaxed mt-4">
                {activeLightboxItem.description}
              </p>

              <div className="pt-4 text-center text-[10px] uppercase tracking-widest text-[#7bd355]">
                Frame {lightboxIndex! + 1} of{' '}
                {filteredGallery.length}
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
