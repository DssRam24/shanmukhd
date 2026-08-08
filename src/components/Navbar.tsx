import { useEffect, useState } from 'react';

export default function Navbar() {
  const [time, setTime] = useState('00:00');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Dynamic Clock
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      setTime(`${h}:${m}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Shrink on Scroll
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-[1.2rem] left-0 right-0 z-[1000] flex justify-center items-center pointer-events-none">
      <div
        className={`pointer-events-auto flex items-center max-w-[calc(100vw-3rem)] overflow-hidden transition-all duration-[0.35s] cubic-bezier(0.4, 0, 0.2, 1) ${
          isScrolled
            ? 'py-[0.38rem] px-[0.9rem] bg-[rgba(255,252,248,0.94)] shadow-[0_8px_32px_rgba(0,0,0,0.12),0_1px_0_rgba(255,255,255,0.9)_inset] gap-2'
            : 'py-[0.55rem] pr-[0.6rem] pl-[1.1rem] bg-[rgba(255,252,248,0.82)] shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.9)_inset] gap-4'
        } rounded-full border border-[rgba(0,0,0,0.07)] backdrop-blur-[20px]`}
      >
        {/* Telugu Brand Mark */}
        <a
          href="#"
          className="font-sans font-extrabold text-[0.8rem] text-[#FF6B1A] tracking-wider shrink-0 transition-all duration-[0.35s] hover:scale-105"
        >
          రామ్
        </a>

        {/* Live Clock indicator */}
        <div className="hidden sm:flex items-center gap-[0.25rem] shrink-0">
          <span className="font-mono font-bold text-[0.58rem] text-neutral-800 tracking-wider">
            {time}
          </span>
          <span className="font-mono text-[0.48rem] text-neutral-400 font-medium tracking-widest uppercase">
            IST
          </span>
        </div>

        {/* Vertical divider */}
        <div className="hidden sm:block w-[1px] h-[16px] bg-neutral-200 shrink-0" />

        {/* Links Column */}
        <div className="hidden md:flex gap-6 items-center shrink-0">
          {['about', 'design', 'books', 'photos', 'doodle'].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className="font-mono text-[0.58rem] text-neutral-700 tracking-widest uppercase hover:text-[#FF6B1A] transition-colors relative group py-1"
            >
              {section}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#FF6B1A] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Action Button */}
        <a
          href="#footer"
          className={`hidden sm:inline-flex items-center py-[0.5rem] px-[1.1rem] rounded-full bg-neutral-900 text-white font-mono text-[0.56rem] tracking-widest uppercase shrink-0 hover:bg-[#FF6B1A] transition-all duration-300 ${
            isScrolled ? 'py-[0.38rem] px-[0.9rem] text-[0.5rem]' : ''
          }`}
        >
          Get in Touch
        </a>

        {/* Mobile Hamburger toggle */}
        <button
          onClick={toggleMenu}
          className="flex md:hidden flex-col gap-1 p-[6px] rounded-lg hover:bg-neutral-100 transition-colors pointer-events-auto"
          aria-label="Toggle menu"
        >
          <span className="block w-4 h-[2px] bg-neutral-800 rounded-sm" />
          <span className="block w-4 h-[2px] bg-neutral-800 rounded-sm" />
          <span className="block w-4 h-[2px] bg-neutral-800 rounded-sm" />
        </button>

        {/* Expanded Links Drawer for Mobile Viewports */}
        {isOpen && (
          <div className="flex md:hidden flex-col fixed top-20 left-4 right-4 bg-white/95 backdrop-blur-[20px] border border-neutral-100 rounded-2xl p-6 gap-4 shadow-2xl animate-fade-in pointer-events-auto">
            {['about', 'design', 'books', 'photos', 'doodle'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={() => setIsOpen(false)}
                className="font-mono text-xs text-neutral-700 tracking-wider uppercase hover:text-[#FF6B1A] transition-colors"
              >
                {section}
              </a>
            ))}
            <a
              href="#footer"
              onClick={() => setIsOpen(false)}
              className="py-3 px-6 bg-neutral-950 text-white rounded-xl text-center font-mono text-xs tracking-wider uppercase font-semibold"
            >
              Get in Touch
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
