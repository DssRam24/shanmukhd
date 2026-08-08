export default function OriginStory() {
  const floatingImages = [
    { src: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=150', delay: '0s', style: 'top-8 left-4 w-20 rotate-[-6deg]' },
    { src: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=150', delay: '2s', style: 'top-24 right-6 w-16 rotate-[4deg]' },
    { src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=150', delay: '4s', style: 'top-[45%] left-3 w-14 rotate-[-3deg]' },
    { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=150', delay: '1s', style: 'top-[60%] right-3 w-18 rotate-[7deg]' },
    { src: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=150', delay: '3s', style: 'bottom-20 left-6 w-16 rotate-[-8deg]' },
    { src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=150', delay: '5s', style: 'bottom-8 right-8 w-12 rotate-[5deg]' }
  ];

  return (
    <section id="story" className="relative py-28 px-5 overflow-hidden bg-[#fdf6e3]">
      {/* Background artwork layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-15 mix-blend-multiply pointer-events-none select-none"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=1000')"
        }}
      />

      {/* Radial fade margins to bleed story cleanly into background */}
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,#fdf6e3_0%,transparent_18%,transparent_82%,#fdf6e3_100%),linear-gradient(to_right,#fdf6e3_0%,transparent_15%,transparent_85%,#fdf6e3_100%)] pointer-events-none" />

      {/* Floating Retro Hardware grayscales */}
      {floatingImages.map((img, index) => (
        <div
          key={index}
          className={`hidden md:block absolute z-[1] pointer-events-none select-none border border-neutral-300 rounded p-1 bg-white shadow-sm opacity-20 filter grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 animate-pulse ${img.style}`}
          style={{ animationDelay: img.delay }}
        >
          <img src={img.src} alt="Retro tech origin" className="w-full h-auto rounded" />
        </div>
      ))}

      {/* Main Narrative Structure */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-left">
        <span className="font-mono text-[0.6rem] text-[#b84a00] tracking-[0.22em] uppercase mb-8 block font-bold">
          000 — Origin
        </span>

        <div className="space-y-8">
          <div className="font-serif text-lg leading-relaxed text-[#3a2a10] italic">
            I wasn't the loudest kid growing up. Most of the time, I was somewhere between curiosity and chaos, trying to understand how things worked.
          </div>

          <div className="font-serif text-lg leading-relaxed text-[#3a2a10] italic">
            Some of my earliest memories are sitting in front of a computer, completely immersed in games like{' '}
            <span className="text-[#b84a00] font-bold">Cricket 07 and Vice City.</span>{' '}
            To most people, they were just games. To me, they were entire worlds. I wasn't only playing them, I was fascinated by the machines that made them possible.
          </div>

          <div className="font-serif text-lg leading-relaxed text-[#3a2a10] italic">
            Technology found me early. My father's first smartphone,{' '}
            <span className="text-[#b84a00] font-bold">the Nokia Lumia 530</span>,{' '}
            became my favorite piece of technology. While most people used it for calls and photos, I spent hours exploring every setting, every feature, and every application I could find. Discovering Microsoft's Windows ecosystem through that little phone sparked a fascination that would stay with me for years.
          </div>

          <div className="font-serif text-lg leading-relaxed text-[#3a2a10] italic">
            At home, my brother and I would dismantle old computers just to see what lived inside them. We opened cabinets, removed components, and asked questions we rarely knew the answers to.{' '}
            <span className="text-[#b84a00] font-bold">We weren't trying to fix anything. We simply couldn't accept using something without understanding it.</span>
          </div>

          <div className="w-10 h-[2px] bg-[#c85a10] opacity-50 my-8" />

          <div className="font-serif text-lg leading-relaxed text-[#3a2a10] italic">
            Soon curiosity became creativity. I started drawing in MS Paint, creating random designs and experimenting with anything I could get my hands on. Design taught me how to communicate ideas. Engineering taught me how to build them. Technology taught me that every problem is just a puzzle waiting for someone patient enough to solve it.
          </div>

          <div className="font-serif text-lg leading-relaxed text-[#3a2a10] italic">
            Today, I'm a Computer Science student, designer, developer, and community builder. Whether it's creating AI-powered applications, designing experiences, leading communities, or building products from scratch, I'm driven by the same instinct that started years ago:{' '}
            <span className="text-[#b84a00] font-bold">"How does this work, and how can it be better?"</span>
          </div>
        </div>

        {/* Big stylized pull quote framed elegantly */}
        <div className="border-l-4 border-[#c85a10] pl-6 py-4 mt-12 bg-white/45 backdrop-blur-sm rounded-r-xl">
          <p className="font-serif text-[clamp(1.1rem,2.4vw,1.32rem)] text-neutral-900 leading-normal font-bold italic mb-3">
            Curiosity turned into creativity. Creativity turned into building. And building became the way I leave a mark on the world.
          </p>
          <span className="font-mono text-[0.6rem] text-[#b84a00] tracking-[0.15em] uppercase font-bold">
            Curious by nature. Builder by choice. ✦
          </span>
        </div>
      </div>
    </section>
  );
}
