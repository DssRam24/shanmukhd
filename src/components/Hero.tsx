import { useEffect, useState, useRef, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';

const GREETINGS = [
  { word: 'Hello', lang: 'EN' },
  { word: 'नमस्ते', lang: 'HI' },
  { word: 'నమస్కారం', lang: 'TE' },
  { word: 'こんにちは', lang: 'JP' },
  { word: 'Hola', lang: 'ES' },
  { word: 'Bonjour', lang: 'FR' },
  { word: 'नमस्कार', lang: 'MR' },
  { word: 'నమస్కారం', lang: 'KN' },
  { word: 'നമസ്കാരം', lang: 'ML' },
  { word: 'Ciao', lang: 'IT' },
  { word: 'مرحباً', lang: 'AR' }
];

export default function Hero() {
  const [greetIndex, setGreetIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialOffset = useRef({ x: 0, y: 0 });

  // Parallax scroll event
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Greeting rotation
    const interval = setInterval(() => {
      setGreetIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2200);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  // Draggable Photo Logic
  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    initialOffset.current = { ...dragOffset };
    e.preventDefault();
  };

  const handleTouchStart = (e: ReactTouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const touch = e.touches[0];
    dragStart.current = { x: touch.clientX, y: touch.clientY };
    initialOffset.current = { ...dragOffset };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setDragOffset({
        x: initialOffset.current.x + dx,
        y: initialOffset.current.y + dy
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      const dx = touch.clientX - dragStart.current.x;
      const dy = touch.clientY - dragStart.current.y;
      setDragOffset({
        x: initialOffset.current.x + dx,
        y: initialOffset.current.y + dy
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const handleDoubleClick = () => {
    setDragOffset({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      className="relative min-height-[100vh] flex flex-col md:flex-row items-center overflow-hidden px-[5%] pt-28 pb-16 bg-[#FFFAF2] gap-16"
    >
      {/* 3D Background Grid Parallax */}
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,106,26,0.18)__1px,transparent__1px),linear-gradient(90deg,rgba(255,106,26,0.08)__1px,transparent__1px)] bg-[size:44px_44px] origin-bottom transition-transform duration-75"
        style={{
          transform: `perspective(600px) rotateX(18deg) scale(1.3) translateY(${scrollY * 0.13}px)`,
          zIndex: 0
        }}
      />

      {/* Absolute Ambient Tags */}
      <div className="absolute top-[18%] right-[8%] text-[#FF6B1A] opacity-70 animate-bounce text-sm font-semibold pointer-events-none z-10">
        ✦ creative
      </div>
      <div className="absolute bottom-[25%] left-[2%] text-[#FF6B1A] opacity-70 animate-pulse text-xs font-semibold pointer-events-none z-10">
        ↗ lets build
      </div>
      <div className="absolute top-[58%] right-[5%] text-[#FF6B1A] opacity-70 text-xs font-semibold pointer-events-none z-10">
        ⌘ maker
      </div>

      {/* Left Column: Text & Terminal */}
      <div className="flex-1 relative z-10 w-full">
        <div className="mb-8">
          {/* Greeting Box */}
          <div className="h-10 overflow-hidden relative mb-4">
            <div className="text-[#FF6B1A] uppercase text-xs font-extrabold flex items-center h-full">
              <span className="font-mono text-sm tracking-widest mr-2 animate-pulse">
                {GREETINGS[greetIndex].word}
              </span>
              <span className="font-mono text-[0.62rem] text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded uppercase">
                {GREETINGS[greetIndex].lang}
              </span>
            </div>
          </div>

          <h2 className="font-mono text-neutral-400 text-[0.65rem] tracking-widest uppercase mb-1">I am</h2>
          <h1 className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold leading-none text-neutral-900 tracking-tight">
            Shanmukha <br />
            <span className="text-[#FF6B1A]">Donepudi</span>
          </h1>
          <span className="block font-mono text-[0.62rem] text-neutral-400 mt-2 tracking-widest uppercase">
            alias dssr · B.Tech CSE · Vijayawada, India
          </span>
        </div>

        {/* Vintage Terminal Box */}
        <div className="bg-neutral-950 rounded-2xl p-6 max-w-[480px] shadow-2xl relative overflow-hidden border border-[rgba(255,107,26,0.15)]">
          <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.01)_2px,rgba(255,255,255,0.01)_4px)]" />
          
          {/* Terminal Title bar */}
          <div className="flex gap-2 mb-4 items-center border-b border-neutral-900 pb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            <span className="font-mono text-[0.55rem] text-neutral-600 ml-auto tracking-wider">
              dssram@portfolio ~
            </span>
          </div>

          <div className="space-y-4 font-mono text-[0.72rem] text-neutral-300">
            <div>
              <div className="text-[#FF6B1A] inline-block mr-2">$</div>
              <div className="inline-block text-white">whoami</div>
              <span className="block text-[#FFB380] pl-4 mt-1">Shanmukha Sai Ram Donepudi</span>
              <span className="block text-neutral-600 italic pl-4"># B.Tech CSE/IT · Vijayawada</span>
            </div>

            <div>
              <div className="text-[#FF6B1A] inline-block mr-2">$</div>
              <div className="inline-block text-white">ls interests/</div>
              <div className="text-[#FFB380] pl-4 mt-1 grid grid-cols-3 gap-1">
                <span>development/</span>
                <span>design/</span>
                <span>books/</span>
                <span>music/</span>
                <span>fitness/</span>
                <span>speaking/</span>
              </div>
            </div>

            <div>
              <div className="text-[#FF6B1A] inline-block mr-2">$</div>
              <div className="inline-block text-white">cat vibe.txt</div>
              <span className="block text-[#FFB380] pl-4 mt-1">
                Listens to FLAC because bad audio is personally offensive. 🎵
              </span>
            </div>

            <div className="flex items-center">
              <span className="text-[#FF6B1A] mr-2">$</span>
              <span className="inline-block w-2 h-4 bg-[#FF6B1A] animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: 3D Draggable Avatar */}
      <div className="flex-[0_0_min(350px,42vw)] relative z-10 flex justify-center items-center w-full">
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onDoubleClick={handleDoubleClick}
          className={`relative w-[min(280px,80vw)] h-[min(320px,90vw)] cursor-grab ${
            isDragging ? 'cursor-grabbing scale-105 duration-75' : 'transition-transform duration-500 ease-out'
          }`}
          style={{
            transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0)`,
          }}
        >
          {/* Draggable instructional tag */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center text-neutral-400 font-mono text-[0.45rem] uppercase tracking-wider whitespace-nowrap select-none pointer-events-none">
            drag me ✦ double-click to snap back
          </div>

          {/* Floating abstract geometrical layers behind picture */}
          <div className="absolute w-20 h-20 bg-[#FF6B1A] -top-5 -right-5 rotate-12 rounded-xl animate-pulse" style={{ zIndex: 0 }} />
          <div className="absolute w-12 h-12 bg-neutral-900 -bottom-3 -left-3 -rotate-12 rounded-lg" style={{ zIndex: 0 }} />
          <div className="absolute w-10 h-10 bg-[#FFD580] top-8 -left-6 rotate-45 rounded-full" style={{ zIndex: 0 }} />
          <div className="absolute w-16 h-16 border-[3px] border-[#FF6B1A] bottom-6 -right-6 -rotate-6 rounded-xl" style={{ zIndex: 0 }} />

          {/* Real user image frame with retro corner brackets */}
          <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-[#FF6B1A]/45">
            {/* High-quality profile photo placeholder */}
            <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=500"
                alt="Shanmukha Sai Ram Donepudi"
                className="w-full h-full object-cover grayscale brightness-105 contrast-105 hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Aesthetic photo frames */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#FF6B1A] z-20" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#FF6B1A] z-20" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#FF6B1A] z-20" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#FF6B1A] z-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
