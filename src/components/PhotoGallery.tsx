import React, { useState, useEffect } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { PhotoItem } from '../types';

interface PhotoGalleryProps {
  photos: PhotoItem[];
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
    document.body.style.overflow = 'auto';
  };

  const nextPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length);
    }
  };

  const prevPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + photos.length) % photos.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex]);

  return (
    <section id="gallery" className="w-full py-12 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#e6d1a0] text-xs uppercase tracking-widest mb-2 font-medium">
            <Camera className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>កម្រងរូបភាព • Pre-Wedding Gallery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#f2e4c4] tracking-wide">
            Moments of Love
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 font-serif">
            A glimpse into the cherished journey of Suyhong &amp; Vinaya
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
          {photos.map((photo, idx) => {
            const isFullSpan = idx === 0;
            return (
              <div
                key={photo.id}
                onClick={() => openLightbox(idx)}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer border border-[#c5a059]/25 shadow-lg bg-stone-900 ${
                  isFullSpan ? 'col-span-2 sm:col-span-3 h-64 sm:h-80' : 'h-36 sm:h-48'
                }`}
              >
                <img
                  src={photo.thumbnail}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3.5">
                  <p className="text-xs text-stone-100 font-medium truncate pr-2">
                    {photo.caption}
                  </p>
                  <span className="p-1.5 rounded-full bg-[#c5a059] text-stone-900 shadow-md shrink-0">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 select-none"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-stone-800/80 text-stone-200 hover:text-white hover:bg-stone-700 border border-stone-600 transition-all z-50 cursor-pointer"
            aria-label="Close photo preview"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Photo container */}
          <div 
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[selectedPhotoIndex].url}
              alt={photos[selectedPhotoIndex].caption}
              className="max-w-full max-h-[75vh] object-contain rounded-xl border border-stone-800 shadow-2xl"
            />
            <p className="text-center text-sm text-stone-200 mt-3 font-serif px-4">
              {photos[selectedPhotoIndex].caption}
            </p>
            <p className="text-xs text-stone-400 mt-0.5">
              {selectedPhotoIndex + 1} of {photos.length}
            </p>

            {/* Navigation buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-900/80 text-stone-200 hover:text-white border border-stone-700 transition-all cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-900/80 text-stone-200 hover:text-white border border-stone-700 transition-all cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
