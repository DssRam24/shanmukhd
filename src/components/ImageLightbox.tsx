import { useEffect, useState } from 'react';

interface LightboxProps {
  isOpen: boolean;
  src: string;
  label: string;
  onClose: () => void;
}

export default function ImageLightbox({ isOpen, src, label, onClose }: LightboxProps) {
  const [rating, setWhoRated] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [thanksText, setThanksText] = useState('');

  // Load rating from localstorage on image switch
  useEffect(() => {
    if (!src) return;
    const saved = JSON.parse(localStorage.getItem('dssram-lb-ratings') || '{}');
    const prev = saved[src] || 0;
    setWhoRated(prev);
    setThanksText('');
  }, [src]);

  const handleStarClick = (val: number) => {
    setWhoRated(val);
    const saved = JSON.parse(localStorage.getItem('dssram-lb-ratings') || '{}');
    saved[src] = val;
    localStorage.setItem('dssram-lb-ratings', JSON.stringify(saved));

    const appreciation = [
      '',
      '⭐ Noted!',
      '⭐⭐ Cool!',
      '⭐⭐⭐ Nice!',
      '⭐⭐⭐⭐ Love it!',
      '⭐⭐⭐⭐⭐ Too kind!'
    ];
    setThanksText(appreciation[val] || '');
  };

  const handleStarHover = (val: number | null) => {
    setHoverRating(val);
  };

  if (!isOpen || !src) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[99995] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center gap-6 p-6 animate-fade-in"
    >
      {/* Container Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-[min(85vw,680px)] max-h-[70vh] flex justify-center items-center rounded-2xl overflow-hidden border-2 border-[#FF6B1A]/40 shadow-[0_0_80px_rgba(255,107,26,0.25)] animate-zoom-in"
      >
        <img src={src} alt={label} className="max-w-full max-h-[65vh] object-contain block rounded-2xl" />
        <div className="absolute top-3 left-3 bg-neutral-900/60 backdrop-blur px-2.5 py-1 rounded font-mono text-[0.55rem] text-white tracking-widest uppercase">
          {label}
        </div>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-neutral-900/60 hover:bg-[#FF6B1A] border-2 border-[#FF6B1A]/50 rounded-lg font-mono text-xs text-[#FF6B1A] hover:text-white px-2.5 py-1.5 transition-colors cursor-pointer"
        >
          ✕ Close
        </button>
      </div>

      {/* Ratings Panel */}
      <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-2 select-none">
        <div className="font-serif text-[#FFD580] text-sm md:text-base tracking-wider">
          Rate this work ✦
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((val) => {
            const isLit = (hoverRating !== null ? hoverRating : rating) >= val;
            return (
              <span
                key={val}
                onClick={() => handleStarClick(val)}
                onMouseEnter={() => handleStarHover(val)}
                onMouseLeave={() => handleStarHover(null)}
                className={`text-3xl cursor-pointer transition-all duration-150 active:scale-125 ${
                  isLit ? 'text-[#FFD580] scale-110 drop-shadow-[0_0_8px_rgba(255,213,128,0.6)]' : 'text-neutral-800 hover:text-[#FFD580]'
                }`}
              >
                ★
              </span>
            );
          })}
        </div>
        {thanksText && (
          <div className="font-mono text-xs text-green-400 font-bold tracking-wider animate-bounce mt-1">
            {thanksText}
          </div>
        )}
      </div>
    </div>
  );
}
