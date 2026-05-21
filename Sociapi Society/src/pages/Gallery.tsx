import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Calendar, Folder } from 'lucide-react';
import { GalleryItem } from '../data/initialData';

interface GalleryProps {
  gallery: GalleryItem[];
}

export const Gallery: React.FC<GalleryProps> = ({ gallery }) => {
  const [activeCategory, setActiveCategory] = useState<'All' | GalleryItem['category']>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories: ('All' | GalleryItem['category'])[] = [
    'All', 'Workshops', 'Seminars', 'Hackathons', 'Community', 'Projects'
  ];

  // Filter gallery items
  const filteredGallery = gallery.filter((item) => {
    return activeCategory === 'All' || item.category === activeCategory;
  });

  const openLightbox = (item: GalleryItem) => {
    // Find index of item in the current filtered dataset
    const idx = filteredGallery.findIndex((x) => x.id === item.id);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const closeLightbox = () => setLightboxIndex(null);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => 
      prev !== null && prev > 0 ? prev - 1 : filteredGallery.length - 1
    );
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => 
      prev !== null && prev < filteredGallery.length - 1 ? prev + 1 : 0
    );
  };

  const activeLightboxItem = lightboxIndex !== null ? filteredGallery[lightboxIndex] : null;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-28 space-y-12 relative z-10">
      
      {/* Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="text-[10px] text-[#7bd355] uppercase tracking-widest font-bold font-mono">Visual Terminal // gallery</span>
        <h1 className="text-4xl md:text-5xl font-futuristic font-black tracking-tight text-[#e8ecee]">
          SOCIETY <span className="text-[#7bd355] glow-text">ARCHIVES</span>
        </h1>
        <p className="text-xs text-[#939596] leading-relaxed">
          Explore captured imagery of , late-night coding hackathons, and hardware projects built at Islamia University Peshawar.
        </p>
      </div>

      {/* Filter Tabs */}
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
                ? 'bg-[#7bd355] text-[#121212] font-bold shadow-[0_0_15px_rgba(123,211,85,0.25)]'
                : 'text-[#939596] hover:text-[#e8ecee] hover:bg-[#333333]/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Columns/Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            onClick={() => openLightbox(item)}
            className="break-inside-avoid relative group rounded-2xl overflow-hidden border border-[#333333] hover:border-[#7bd355]/40 transition-all cursor-pointer bg-[#161616]"
          >
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500" 
            />
            
            {/* Overlay description details on hover */}
            <div className="absolute inset-0 bg-[#121212]/90 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-between p-5">
              <div className="flex justify-between items-start">
                <span className="text-[9px] uppercase tracking-widest font-bold text-[#7bd355] bg-[#517642]/20 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <Maximize2 className="w-4 h-4 text-[#939596] hover:text-[#7bd355]" />
              </div>
              
              <div className="space-y-1">
                <h3 className="font-futuristic font-bold text-xs text-[#e8ecee] leading-snug line-clamp-2">
                  {item.title}
                </h3>
                <span className="block text-[8px] text-[#939596] uppercase">{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX COMPONENT MODAL */}
      {activeLightboxItem && (
        <div className="fixed inset-0 z-55 flex items-center justify-center bg-[#121212]/95 backdrop-blur-md p-4">
          
          {/* Close trigger */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-full bg-[#333333]/80 border border-[#939596]/10 text-[#e8ecee] hover:text-[#7bd355] z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 p-2.5 rounded-full bg-[#333333]/80 border border-[#939596]/10 text-[#e8ecee] hover:text-[#7bd355] z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 p-2.5 rounded-full bg-[#333333]/80 border border-[#939596]/10 text-[#e8ecee] hover:text-[#7bd355] z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Main Content Pane */}
          <div className="w-full max-w-4xl max-h-[85vh] flex flex-col items-center justify-center space-y-4">
            
            <div className="relative rounded-2xl overflow-hidden border border-[#333333] max-h-[60vh] flex items-center justify-center bg-black">
              <img 
                src={activeLightboxItem.imageUrl} 
                alt={activeLightboxItem.title} 
                className="max-w-full max-h-[60vh] object-contain"
              />
            </div>

            {/* Description details */}
            <div className="w-full max-w-2xl bg-[#1e1e1e] border border-[#7bd355]/30 rounded-xl p-5 space-y-2 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between text-xs border-b border-[#333333] pb-2">
                <h3 className="font-futuristic font-bold text-sm text-[#e8ecee]">
                  {activeLightboxItem.title}
                </h3>
                <div className="flex items-center space-x-4 text-[9px] text-[#939596] mt-2 md:mt-0 justify-center">
                  <span className="flex items-center"><Folder className="w-3.5 h-3.5 text-[#7bd355] mr-1" /> {activeLightboxItem.category}</span>
                  <span className="flex items-center"><Calendar className="w-3.5 h-3.5 text-[#7bd355] mr-1" /> {activeLightboxItem.date}</span>
                </div>
              </div>
              <p className="text-xs text-[#939596] leading-relaxed">
                {activeLightboxItem.description}
              </p>
              <div className="text-center pt-2 text-[10px] text-[#7bd355] uppercase tracking-widest font-mono">
                Frame {lightboxIndex! + 1} of {filteredGallery.length} in Archive
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
