export default function ArchivesBanner() {
  return (
    <div className="flex items-center justify-center gap-5 w-full my-12 py-6 px-8 bg-[#0a0a0a] border-t-2 border-b-2 border-[#FF6B1A] relative overflow-hidden bg-[linear-gradient(rgba(255,107,26,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,26,0.03)_1px,transparent_1px)] bg-[size:16px_16px]">
      {/* Left accent line vector */}
      <div className="flex-1 max-w-[220px] h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,107,26,0.4))]" />

      {/* Redesigned Standalone Link Button */}
      <a
        href="https://github.com/DssRam24"
        target="_blank"
        rel="noopener noreferrer"
        className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold text-[#FF6B1A] tracking-wider transition-all duration-300 hover:text-white hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(255,107,26,0.8)]"
      >
        R<span className="text-[#FF6B1A] group-hover:text-white transition-colors duration-300">chives</span>
      </a>

      {/* Right accent line vector */}
      <div className="flex-1 max-w-[220px] h-[1px] bg-[linear-gradient(90deg,rgba(255,107,26,0.4),transparent)]" />
    </div>
  );
}
