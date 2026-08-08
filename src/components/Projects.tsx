export default function Projects() {
  const mainBuilds = [
    {
      index: '01 / 03',
      type: 'AI Assistant',
      cmd: '$ chani --init --mode autonomous',
      name: 'CHANI',
      desc: 'A terminal-driven personal AI assistant built for myself, running natively on Windows. Long-term memory via SQLite so it actually remembers context across sessions. DuckDuckGo search, local app launcher, and full file system automation. Named after my nickname Chanti. Powered by Groq running llama-3.3-70b.',
      bg: 'linear-gradient(135deg, #1e1e1e 0%, #111 100%)',
      link: 'https://github.com/DssRam24'
    },
    {
      index: '02 / 03',
      type: 'AI Wardrobe',
      cmd: '$ python OutfitOracle.py --generate-fit',
      name: 'OutfitOracle',
      desc: 'Built because picking an outfit at 7am is a waste of cognitive load. Log your clothes, it reads the weather, asks the occasion, gives you a fit. No scrolling your wardrobe. No thinking. React, Vite, Firebase, and Gemini Vision to actually understand what clothes look like from a photo.',
      bg: 'linear-gradient(135deg, #FF6B1A 0%, #a04000 100%)',
      link: 'https://github.com/DssRam24/OutfitOracle'
    },
    {
      index: '03 / 03',
      type: 'IoT + ML',
      cmd: '$ telemetry stream --target hostel-taps',
      name: 'AquaSense',
      desc: 'Smart water quality monitoring built for the hostel taps at college. ESP32 sensors track TDS, turbidity, pH, and ORP over MQTT in real time. An LSTM model runs forecasting to flag anomalies before they become a health issue. My role was the ML pipeline and Android app integration across hardware sub-teams.',
      bg: 'linear-gradient(135deg, #1b4d3e 0%, #0d2820 100%)',
      link: 'https://github.com/DssRam24'
    }
  ];

  const proudOfItems = [
    { emoji: '🧡', title: 'SRH Fan', desc: "Orange isn't just a design accent. It's loyalty to the Sunrisers Hyderabad." },
    { emoji: '🏠', title: 'Floor Plans', desc: 'Draws house layouts for fun. Floor-to-ceiling windows are non-negotiable.' },
    { emoji: '♟️', title: 'Chess', desc: 'Life is just tempo management with better visuals.' },
    { emoji: '👔', title: 'Fashion', desc: 'Silently judging fits. Style is architecture for the body.' },
    { emoji: '🚗', title: 'Automobile Design', desc: 'Obsessed with chassis profiles. Fast machinery is sculpture you sit in.' }
  ];

  return (
    <section id="projects" className="relative bg-[#f5f0e8] py-24 border-t-4 border-b-4 border-neutral-900 overflow-hidden">
      {/* Brutalist Watermark */}
      <div className="absolute top-0 right-0 font-mono text-[clamp(80px,14vw,160px)] font-bold text-neutral-950/5 leading-none select-none pointer-events-none tracking-tighter">
        BUILDS
      </div>

      <div className="relative z-10">
        {/* Labeled Section Header */}
        <div className="px-8 max-w-5xl mx-auto flex flex-col md:flex-row items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-[#e2693a] mb-2 font-bold">
              003 — Projects &amp; Builds
            </p>
            <h2 className="font-serif text-[clamp(2rem,5vw,3.4rem)] font-bold italic text-neutral-900 leading-none">
              Things I build that <em className="text-[#e2693a] not-italic font-bold">actually work.</em>
            </h2>
          </div>
        </div>

        {/* Brutalist dividing line */}
        <div className="h-[4px] bg-neutral-900 mx-8 my-8 max-w-6xl md:mx-auto" />

        {/* Horizontal Card Split Column Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border-t-4 border-neutral-900">
          {mainBuilds.map((build, idx) => (
            <div
              key={idx}
              className="relative flex flex-col min-h-[500px] bg-[#f5f0e8] border-b-4 lg:border-b-0 lg:border-r-4 border-neutral-900 p-8 justify-between hover:bg-[#ede8df] transition-all duration-300 group"
              style={{ boxShadow: 'none' }}
            >
              {/* Labeled Header */}
              <div className="flex justify-between items-center mb-12">
                <span className="font-mono text-[0.58rem] tracking-wider text-neutral-400 font-bold">
                  {build.index}
                </span>
                <span className="font-mono text-[0.55rem] text-[#e2693a] border-2 border-[#e2693a] px-2 py-1 uppercase tracking-widest font-bold">
                  {build.type}
                </span>
              </div>

              {/* Body details */}
              <div className="flex-1 flex flex-col justify-end">
                <p className="font-mono text-[0.58rem] text-neutral-400 mb-2 select-none">
                  {build.cmd}
                </p>
                <h3 className="font-serif text-2xl font-bold italic text-neutral-900 mb-3 group-hover:text-[#e2693a] transition-colors duration-200">
                  {build.name}
                </h3>
                {/* Labeled line accent */}
                <div className="w-9 h-[3px] bg-[#e2693a] mb-4 group-hover:w-16 transition-all duration-300" />
                <p className="font-mono text-[0.65rem] text-neutral-600 leading-relaxed mb-6">
                  {build.desc}
                </p>
                <a
                  href={build.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[0.58rem] tracking-widest uppercase text-neutral-900 border-b-2 border-neutral-900 pb-1 self-start hover:text-[#e2693a] hover:border-[#e2693a] transition-colors"
                >
                  View on GitHub ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Segment 2: Proud of & Into */}
        <div className="mt-20 px-8 text-center max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-12 text-neutral-900">
            Things I'm proud of &amp; <em className="italic text-[#FF6B1A]">into</em>
          </h2>

          <div className="flex flex-wrap gap-4 justify-center">
            {proudOfItems.map((item, index) => (
              <div
                key={index}
                className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 font-mono text-[0.58rem] text-neutral-400 flex items-start gap-4 max-w-[240px] text-left hover:text-neutral-200 hover:border-[#FF6B1A]/40 hover:translate-y-[-3px] transition-all duration-300"
              >
                <span className="text-xl shrink-0 mt-0.5 select-none">{item.emoji}</span>
                <div className="space-y-1">
                  <strong className="text-[#FF6B1A] block font-bold text-[0.62rem] tracking-wider uppercase">
                    {item.title}
                  </strong>
                  <span className="leading-relaxed">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
