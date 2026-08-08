import { useEffect, useState } from 'react';

interface PhotographyProps {
  onImageClick: (src: string, label: string) => void;
}

export default function Photography({ onImageClick }: PhotographyProps) {
  const photos = [
    { src: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=400', label: 'Hyderabad Heritage - Charminar' },
    { src: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=400', label: 'Rainy Hyderabad Streetlight' },
    { src: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=400', label: 'Scenic Twilight Horizon' },
    { src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=400', label: 'Niloufer Cafe Cozy Tea Cup' },
    { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400', label: 'College Hackathon Vibes' },
    { src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=400', label: 'Nature Walk Landscape' },
    { src: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=400', label: 'Abstract Light Trails' },
    { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=400', label: 'Childhood Playground nostalgia' },
    { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=400', label: 'Lush Forest Wilderness' }
  ];

  return (
    <section id="photos" className="py-24 px-[5%] bg-gradient-to-b from-[#FFFAF2] to-[#F0E8DE]">
      <div className="font-mono text-[0.6rem] text-[#FF6B1A] tracking-[0.2em] uppercase mb-4 flex items-center justify-start gap-4">
        004 — Photography
        <span className="h-[1px] bg-[#FF6B1A]/30 flex-1" />
      </div>

      <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-bold mb-12 text-neutral-900 text-left">
        Through the <em className="italic text-[#FF6B1A]">lens.</em>
      </h2>

      {/* Masonry layout column count */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {photos.map((photo, index) => (
          <div
            key={index}
            onClick={() => onImageClick(photo.src, photo.label)}
            className="break-inside-avoid relative rounded-xl overflow-hidden shadow-md group cursor-pointer hover:scale-[1.03] hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={photo.src}
              alt={photo.label}
              className="w-full h-auto object-cover rounded-xl filter brightness-[0.93] group-hover:brightness-100 transition-all duration-500"
            />
            {/* Elegant overlay caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="font-mono text-[0.55rem] text-white tracking-widest uppercase font-bold">
                {photo.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
