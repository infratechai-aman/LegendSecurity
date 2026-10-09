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
      <div className="relative z-10 w-full max-w-5xl bg-[#121318] border border-brand-red/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0d0e13] border-b border-[#292a2f]">
          <div className="flex items-center gap-3">
            <span className="font-label-tactical text-xs px-2.5 py-1 rounded bg-brand-red text-white uppercase font-bold tracking-wider">
              {image.tag || 'OPERATIONAL FEED'}
            </span>
            <span className="font-heading font-black text-sm uppercase text-slate-200">
              {image.title}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-surface-container-high hover:bg-brand-red text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {/* Image Display */}
        <div className="relative max-h-[70vh] bg-black flex items-center justify-center overflow-hidden group">
          <img
            src={image.src}
            alt={image.title}
            className="max-h-[70vh] w-auto max-w-full object-contain"
          />

          {/* Prev/Next Navigation Controls */}
          {onPrev && (
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-brand-red text-white flex items-center justify-center transition-all shadow-lg"
              title="Previous Photo"
            >
              <i className="fa-solid fa-chevron-left text-sm"></i>
            </button>
          )}

          {onNext && (
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-brand-red text-white flex items-center justify-center transition-all shadow-lg"
              title="Next Photo"
            >
              <i className="fa-solid fa-chevron-right text-sm"></i>
            </button>
          )}
        </div>

        {/* Footer Details */}
        <div className="px-6 py-4 bg-[#0e0f14] border-t border-[#292a2f] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <div className="flex items-center gap-2 text-slate-300 font-semibold mb-1">
              <i className="fa-solid fa-location-dot text-brand-red"></i>
              <span>{image.location || 'Maharashtra Regional Command'}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400 font-mono text-[11px]">{image.shift || '24/7 ACTIVE'}</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-2xl">{image.desc}</p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <a
              href="tel:+919876543210"
              className="px-4 py-2 rounded-lg bg-brand-red hover:bg-brand-crimson text-white font-heading font-bold uppercase tracking-wider text-[11px] flex items-center gap-2 transition-all shadow-md"
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
