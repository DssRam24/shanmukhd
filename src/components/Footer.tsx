import { useEffect, useState } from 'react';

const RANDOM_BUTTON_STYLES = [
  { text: 'CONTACT_NOW', bg: '#000000', color: '#00ff33', border: '2px solid #00ff33', font: 'font-mono tracking-widest uppercase' },
  { text: 'CONTACT.EXE', bg: '#1c1c1c', color: '#ffffff', border: '2px solid transparent', font: 'font-sans uppercase font-black' },
  { text: 'Connect', bg: '#000000', color: '#00ff33', border: '1px solid #00ff33', font: 'font-sans' },
  { text: 'Get in Touch', bg: '#1a0f00', color: '#ffb000', border: '1px solid #ffb000', font: 'font-mono uppercase tracking-wider' },
  { text: 'Click Here', bg: '#c0c0c0', color: '#000000', border: '2px solid #808080', font: 'font-mono' },
  { text: '//initialize', bg: '#000000', color: '#00ff00', border: '1px dashed #00ff00', font: 'font-mono lowercase tracking-[5px]' },
  { text: 'LINK_START', bg: '#0000ff', color: '#00ffff', border: '2px solid #00ffff', font: 'font-sans uppercase tracking-widest' }
];

export default function Footer() {
  const [ctaIndex, setCtaIndex] = useState(0);
  const [time, setTime] = useState('--:--:--');
  const [dateStr, setDateStr] = useState('---');

  useEffect(() => {
    // Style loop every 800ms
    const ctaInterval = setInterval(() => {
      setCtaIndex((prev) => (prev + 1) % RANDOM_BUTTON_STYLES.length);
    }, 800);

    // Live clock update
    const updateClock = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setTime(`${h}:${m}:${s}`);

      const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      setDateStr(`${DAYS[now.getDay()]} ${String(now.getDate()).padStart(2, '0')} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`);
    };
    updateClock();
    const clockInterval = setInterval(updateClock, 1000);

    return () => {
      clearInterval(ctaInterval);
      clearInterval(clockInterval);
    };
  }, []);

  const currentCta = RANDOM_BUTTON_STYLES[ctaIndex];

  return (
    <footer id="footer" className="relative overflow-hidden bg-gradient-to-b from-[#FFFAF2] via-[#FFE0A0] to-[#0a0820] pt-20 pb-28 px-[5%] text-center">
      
      {/* Footer Main columns */}
      <div className="relative z-10 flex flex-col items-center gap-6 mb-12">
        <div className="text-center">
          <h2 className="font-serif text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.92] font-extrabold text-neutral-900">
            Let's build <br />
            <em className="text-[#FF6B1A] italic">something.</em>
          </h2>

          {/* Looping Styled CTA Button */}
          <div className="mt-8 flex justify-center">
            <a
              href="mailto:dssram24067@gmail.com"
              className={`inline-block py-3 px-8 text-sm font-semibold transition-all duration-75 select-none ${currentCta.font}`}
              style={{
                backgroundColor: currentCta.bg,
                color: currentCta.color,
                border: currentCta.border,
                borderRadius: '8px',
                boxShadow: currentCta.bg === '#c0c0c0' ? '2px 2px 0 #fff inset, -2px -2px 0 #000 inset' : 'none'
              }}
            >
              {currentCta.text}
            </a>
          </div>
        </div>
      </div>

      {/* Clock display widgets */}
      <div className="relative z-10 flex justify-center gap-4 flex-wrap mb-16 select-none">
        <div className="bg-neutral-950/65 backdrop-blur-md border border-[#FF6B1A]/30 rounded-xl px-4 py-2 flex flex-col items-center w-24">
          <span className="font-mono text-[0.45rem] text-neutral-400 tracking-widest uppercase">Time</span>
          <span className="font-mono text-xs text-[#FF6B1A] font-bold">{time}</span>
        </div>
        <div className="bg-neutral-950/65 backdrop-blur-md border border-[#FF6B1A]/30 rounded-xl px-4 py-2 flex flex-col items-center w-36">
          <span className="font-mono text-[0.45rem] text-neutral-400 tracking-widest uppercase">Date</span>
          <span className="font-mono text-[0.55rem] text-[#FFD580] font-bold">{dateStr}</span>
        </div>
        <div className="bg-neutral-950/65 backdrop-blur-md border border-[#FF6B1A]/30 rounded-xl px-4 py-2 flex flex-col items-center w-36">
          <span className="font-mono text-[0.45rem] text-neutral-400 tracking-widest uppercase">Location</span>
          <span className="font-mono text-[0.52rem] text-[#FFD580] font-bold">VIJAYAWADA, IN</span>
        </div>
      </div>

      {/* Social Links List */}
      <div id="socials" className="relative z-10 border-t border-white/10 pt-8 flex flex-wrap justify-center gap-8 max-w-4xl mx-auto mb-8">
        <a href="https://github.com/DssRam24" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 text-neutral-400 hover:text-[#FF6B1A] hover:scale-105 transition-all font-mono text-[0.5rem] tracking-wider uppercase">
          <span>GitHub</span>
        </a>
        <a href="https://www.linkedin.com/in/dssram24067/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 text-neutral-400 hover:text-[#FF6B1A] hover:scale-105 transition-all font-mono text-[0.5rem] tracking-wider uppercase">
          <span>LinkedIn</span>
        </a>
        <a href="https://www.instagram.com/shanmukhdonepudi" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 text-neutral-400 hover:text-[#FF6B1A] hover:scale-105 transition-all font-mono text-[0.5rem] tracking-wider uppercase">
          <span>Instagram</span>
        </a>
        <a href="https://x.com/ShanmukhSpeaks" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 text-neutral-400 hover:text-[#FF6B1A] hover:scale-105 transition-all font-mono text-[0.5rem] tracking-wider uppercase">
          <span>X / Twitter</span>
        </a>
      </div>

      {/* Vector City skyline illustration matching layout of image */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none select-none z-[1] opacity-40">
        <svg viewBox="0 0 1440 300" preserveAspectRatio="none" className="w-full h-48 block">
          {/* Layer back */}
          <rect x="100" y="110" width="90" height="190" fill="#1d8ce0" />
          <rect x="260" y="70" width="140" height="230" fill="#1d8ce0" />
          <rect x="560" y="58" width="130" height="242" fill="#1d8ce0" />
          <rect x="800" y="65" width="110" height="235" fill="#1d8ce0" />
          <rect x="1030" y="5" width="170" height="295" fill="#1d8ce0" />
          {/* Layer mid */}
          <rect x="0" y="115" width="90" height="185" fill="#0076db" />
          <rect x="160" y="155" width="140" height="145" fill="#0076db" />
          <rect x="425" y="135" width="130" height="165" fill="#0076db" />
          <rect x="730" y="125" width="115" height="175" fill="#0076db" />
          {/* Layer fore */}
          <rect x="55" y="180" width="110" height="120" fill="#0056b3" />
          <rect x="215" y="150" width="180" height="150" fill="#0056b3" />
          <rect x="750" y="148" width="140" height="152" fill="#0056b3" />
          {/* Layer frontmost */}
          <rect x="0" y="225" width="75" height="75" fill="#003675" />
          <rect x="115" y="240" width="95" height="60" fill="#003675" />
          <rect x="190" y="220" width="110" height="80" fill="#003675" />
          <rect x="330" y="250" width="130" height="50" fill="#003675" />
          <rect x="0" y="280" width="1440" height="20" fill="#003675" />
        </svg>
      </div>

      <div className="relative z-10 font-mono text-[0.58rem] text-neutral-500 pt-8 border-t border-white/5 select-none">
        © 2026 Shanmukha Sai Ram Donepudi — DSSRam ✦ All rights reserved.
      </div>
    </footer>
  );
}
