import React, { useEffect } from 'react';

export default function ImageModal({ image, isOpen, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Main Modal Box */}
      <div className="relative z-10 w-full max-w-5xl bg-[#0e0f14] border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 bg-[#0a0b0e] border-b border-white/10">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-brand-red text-white font-medium tracking-wide shrink-0">
              {image.tag || 'Operational Feed'}
            </span>
            <span className="font-heading font-semibold text-xs sm:text-sm text-slate-200 truncate">
              {image.title}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors shrink-0 ml-2 cursor-pointer"
            aria-label="Close modal"
          >
            <i className="fa-solid fa-xmark text-xs"></i>
          </button>
        </div>

        {/* Image Display */}
        <div className="relative max-h-[70vh] bg-black flex items-center justify-center overflow-hidden group">
          <img
            src={image.src}
            alt={image.title}
            className="max-h-[70vh] w-auto max-w-full object-contain select-none"
          />

          {/* Prev/Next Navigation Controls */}
          {onPrev && (
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-brand-red text-white flex items-center justify-center transition-all shadow-lg backdrop-blur-sm cursor-pointer"
              title="Previous Photo"
            >
              <i className="fa-solid fa-chevron-left text-xs"></i>
            </button>
          )}

          {onNext && (
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-brand-red text-white flex items-center justify-center transition-all shadow-lg backdrop-blur-sm cursor-pointer"
              title="Next Photo"
            >
              <i className="fa-solid fa-chevron-right text-xs"></i>
            </button>
          )}
        </div>

        {/* Footer Details */}
        <div className="px-5 sm:px-6 py-3.5 sm:py-4 bg-[#0a0b0e] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <div className="flex items-center gap-2 text-slate-300 font-medium mb-1">
              <i className="fa-solid fa-location-dot text-brand-red text-xs"></i>
              <span>{image.location || 'Maharashtra Regional Command'}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400 font-light text-[11px]">{image.shift || 'Active Deployment'}</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-2xl font-light text-xs">{image.desc}</p>
          </div>

          <div className="shrink-0 flex items-center gap-3 w-full sm:w-auto">
            <a
              href="tel:+918806078677"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-brand-red hover:bg-red-600 text-white font-heading font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <i className="fa-solid fa-phone text-xs"></i>
              <span>Deploy Similar Squad</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
