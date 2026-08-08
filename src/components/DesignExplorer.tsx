import { useState } from 'react';
import { DesignFolder } from '../types';

interface DesignExplorerProps {
  onImageClick: (src: string, label: string) => void;
}

export default function DesignExplorer({ onImageClick }: DesignExplorerProps) {
  const [selectedFolder, setSelectedFolder] = useState<DesignFolder>('designs');

  const folderData = {
    designs: {
      name: 'Designs',
      desc: 'Original graphic layouts, print designs, vector flyers, and typography artwork created at 2 AM.',
      meta: 'Type: System Folder\nPath: C:\\DSSRam\\Design\\\nAttributes: Read-Only',
      images: [
        { src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400&h=300', alt: 'Fully Loaded Gun Typography poster' },
        { src: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=400&h=300', alt: 'Geometric Abstract Poster' },
        { src: 'https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&q=80&w=400&h=300', alt: 'Steve Jobs Quote Frame' },
        { src: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=400&h=300', alt: 'Tech Sprint Poster' },
        { src: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400&h=300', alt: 'GDG Event Graphics' }
      ]
    },
    ui: {
      name: 'UI Exploration',
      desc: 'Modern wireframes, dark landing pages, complex responsive grids, and micro-component prototypes.',
      meta: 'Type: System Folder\nPath: C:\\DSSRam\\UI\\\nAttributes: Read-Only',
      images: [
        { src: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=400&h=300', alt: 'Mobile Dashboard wireframe' },
        { src: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=400&h=300', alt: 'Responsive Web Grid UI' }
      ]
    },
    content: {
      name: 'Content Creation',
      desc: 'Viral posts, slide designs, social banners, and thumbnail frameworks optimized for communities.',
      meta: 'Type: System Folder\nPath: C:\\DSSRam\\Content\\\nAttributes: Read-Only',
      images: [
        { src: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=400&h=300', alt: 'Brutalist Instagram Slideshow Frame' },
        { src: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=400&h=300', alt: 'Community Banner Layout' }
      ]
    },
    app: {
      name: 'App Design',
      desc: 'Completed user flows, mockup systems, high-fidelity interaction prototypes, and mobile screens.',
      meta: 'Type: System Folder\nPath: C:\\DSSRam\\Apps\\\nAttributes: Read-Only',
      images: [
        { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=300', alt: 'OutfitOracle Mockups' },
        { src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400&h=300', alt: 'Mobile App wireflow' }
      ]
    },
    motion: {
      name: 'Motion.ae',
      desc: 'Dynamic kinetic typography reels, vector transitions, and liquid animation systems (dropping soon).',
      meta: 'Status: In development',
      images: []
    },
    brand: {
      name: 'Brand Kit',
      desc: 'Complete identity guidelines, custom stationery assets, and SVG typography kits (dropping soon).',
      meta: 'Status: In development',
      images: []
    }
  };

  return (
    <section id="design" className="py-24 px-[5%] bg-gradient-to-b from-[#FFFAF2] to-[#F5EEE2]">
      <div className="font-mono text-[0.6rem] text-[#FF6B1A] tracking-[0.2em] uppercase mb-4 flex items-center justify-start gap-4">
        002 — Design Works
        <span className="h-[1px] bg-[#FF6B1A]/30 flex-1" />
      </div>

      <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-bold mb-12 text-neutral-900 text-left">
        The stuff I make <em className="italic text-[#FF6B1A]">at 2 AM.</em>
      </h2>

      {/* Retro Explorer Frame Container */}
      <div className="perspective-[1200px] mt-8">
        <div className="rounded-xl overflow-hidden bg-white border border-neutral-300 shadow-2xl rotate-x-[1.5deg] rotate-y-[-0.5deg] transition-all duration-500 hover:rotate-x-0 hover:rotate-y-0 hover:scale-[1.01] hover:shadow-[0_40px_100px_rgba(255,107,26,0.12)]">
          
          {/* Simulated Titlebar */}
          <div className="bg-gradient-to-r from-[#FF6B1A] to-[#E55C10] px-4 py-2 flex items-center gap-2 select-none">
            <span className="text-sm">🗂️</span>
            <span className="font-mono text-[0.62rem] text-white font-bold tracking-wider">
              DSSRam's Portfolio — File Explorer
            </span>
            <div className="flex gap-1.5 ml-auto">
              <div className="w-3.5 h-3.5 rounded-sm bg-white/20 flex items-center justify-center text-[0.5rem] text-white">─</div>
              <div className="w-3.5 h-3.5 rounded-sm bg-white/20 flex items-center justify-center text-[0.5rem] text-white">□</div>
              <div className="w-3.5 h-3.5 rounded-sm bg-red-600 hover:bg-red-700 flex items-center justify-center text-[0.5rem] text-white font-bold cursor-pointer">✕</div>
            </div>
          </div>

          {/* Menubar column */}
          <div className="bg-neutral-100 border-b border-neutral-200 px-3 py-1 flex gap-4 text-neutral-700 font-mono text-[0.58rem] select-none">
            {['File', 'Edit', 'View', 'Tools', 'Help'].map((menu) => (
              <span key={menu} className="hover:bg-[#FF6B1A] hover:text-white px-1.5 py-0.5 rounded transition-colors cursor-pointer">
                {menu}
              </span>
            ))}
          </div>

          {/* Action Toolbar buttons */}
          <div className="bg-neutral-50 border-b border-neutral-200 px-4 py-1.5 flex gap-2 items-center select-none flex-wrap">
            <button className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-neutral-200 rounded text-[0.56rem] font-mono text-neutral-700 hover:bg-[#FF6B1A] hover:text-white hover:border-[#FF6B1A] transition-all">
              ← Back
            </button>
            <button className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-neutral-200 rounded text-[0.56rem] font-mono text-neutral-700 hover:bg-[#FF6B1A] hover:text-white hover:border-[#FF6B1A] transition-all">
              → Fwd
            </button>
            <button className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-neutral-200 rounded text-[0.56rem] font-mono text-neutral-700 hover:bg-[#FF6B1A] hover:text-white hover:border-[#FF6B1A] transition-all">
              ↑ Up
            </button>
            <div className="w-[1px] h-4 bg-neutral-200 mx-1" />
            <button className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-neutral-200 rounded text-[0.56rem] font-mono text-neutral-700 hover:bg-[#FF6B1A] hover:text-white hover:border-[#FF6B1A] transition-all">
              🔍 Search
            </button>
            <button className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-neutral-200 rounded text-[0.56rem] font-mono text-neutral-700 hover:bg-[#FF6B1A] hover:text-white hover:border-[#FF6B1A] transition-all">
              📁 Folders
            </button>
            <div className="w-[1px] h-4 bg-neutral-200 mx-1" />
            <button className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-neutral-200 rounded text-[0.56rem] font-mono text-neutral-700 hover:bg-[#FF6B1A] hover:text-white hover:border-[#FF6B1A] transition-all">
              ⊞ View
            </button>
          </div>

          {/* Address Bar */}
          <div className="bg-neutral-50 border-b border-neutral-200 px-4 py-1.5 flex gap-2 items-center flex-wrap select-none">
            <span className="font-mono text-[0.56rem] text-neutral-400 font-bold">Address:</span>
            <div className="flex-1 min-w-[150px] bg-white border border-neutral-300 rounded px-2 py-0.5 font-mono text-[0.6rem] text-neutral-700">
              {`C:\\DSSRam\\Portfolio\\Design\\${folderData[selectedFolder].name}`}
            </div>
          </div>

          {/* Desktop Body area split columns */}
          <div className="flex flex-col md:flex-row min-h-[380px]">
            {/* Left explorer tree view sidebar */}
            <div className="hidden md:block w-44 bg-[#f7f5f2] border-r border-neutral-200 py-3 shrink-0 select-none">
              <div className="px-4 py-1.5 font-mono text-[0.5rem] text-neutral-400 font-bold tracking-widest uppercase">
                Favorites
              </div>
              <div className="flex items-center gap-2 px-5 py-1.5 font-mono text-[0.58rem] text-neutral-600 hover:bg-[#FF6B1A]/10 hover:text-[#FF6B1A] transition-colors cursor-pointer">
                🖥️ Desktop
              </div>
              <div className="flex items-center gap-2 px-5 py-1.5 font-mono text-[0.58rem] text-[#FF6B1A] bg-[#FF6B1A]/10 font-bold">
                🎨 Design
              </div>
              <div className="flex items-center gap-2 px-5 py-1.5 font-mono text-[0.58rem] text-neutral-600 hover:bg-[#FF6B1A]/10 hover:text-[#FF6B1A] transition-colors cursor-pointer">
                📸 Photos
              </div>
              <div className="px-4 py-1.5 font-mono text-[0.5rem] text-neutral-400 font-bold tracking-widest uppercase mt-4">
                Drives
              </div>
              <div className="flex items-center gap-2 px-5 py-1.5 font-mono text-[0.58rem] text-neutral-600 hover:bg-[#FF6B1A]/10 hover:text-[#FF6B1A] transition-colors cursor-pointer">
                💾 Local Disk (C:)
              </div>
              <div className="flex items-center gap-2 px-5 py-1.5 font-mono text-[0.58rem] text-neutral-600 hover:bg-[#FF6B1A]/10 hover:text-[#FF6B1A] transition-colors cursor-pointer">
                ☁️ Cloud Sync (Firebase)
              </div>
            </div>

            {/* Folder list grid view window */}
            <div className="flex-1 p-4 bg-white border-r border-neutral-100 min-w-0">
              <div className="flex gap-1.5 mb-4 border-b border-neutral-100 pb-2 select-none">
                <span className="bg-[#FF6B1A] text-white px-2 py-0.5 rounded text-[0.52rem] font-mono font-bold">
                  ⊞ Icons
                </span>
                <span className="text-neutral-400 hover:bg-neutral-100 px-2 py-0.5 rounded text-[0.52rem] font-mono transition-colors cursor-pointer">
                  ≡ List
                </span>
                <span className="text-neutral-400 hover:bg-neutral-100 px-2 py-0.5 rounded text-[0.52rem] font-mono transition-colors cursor-pointer">
                  ⊟ Details
                </span>
              </div>

              {/* Folders Selection grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {(Object.keys(folderData) as DesignFolder[]).map((key) => {
                  const folder = folderData[key];
                  const isSelected = selectedFolder === key;
                  return (
                    <div
                      key={key}
                      onClick={() => setSelectedFolder(key)}
                      className={`flex flex-col items-center gap-1 p-2.5 rounded-lg select-none transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FF6B1A]/15 border border-[#FF6B1A] scale-105'
                          : 'hover:bg-[#FF6B1A]/10 border border-transparent'
                      }`}
                    >
                      {/* Custom folder graphical asset */}
                      <div className="text-3xl filter drop-shadow hover:scale-110 transition-transform">
                        {key === 'motion' ? '🎬' : key === 'brand' ? '📦' : '📁'}
                      </div>
                      <span className="font-mono text-[0.5rem] text-neutral-800 text-center font-bold tracking-tight break-all max-w-[80px]">
                        {folder.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Simulated file preview / info panel */}
            <div className="w-full md:w-64 bg-neutral-50 p-4 shrink-0 flex flex-col gap-4">
              <div className="font-mono text-[0.5rem] text-neutral-400 font-extrabold uppercase tracking-widest">
                File Details
              </div>
              <h3 className="font-mono text-[0.68rem] font-black text-neutral-800 uppercase tracking-wide">
                {folderData[selectedFolder].name}
              </h3>
              <p className="font-mono text-[0.58rem] text-neutral-500 leading-relaxed">
                {folderData[selectedFolder].desc}
              </p>

              {/* Folder specific images previews */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[220px]">
                {folderData[selectedFolder].images.length > 0 ? (
                  folderData[selectedFolder].images.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => onImageClick(img.src, img.alt)}
                      className="group relative rounded-lg border border-neutral-200 overflow-hidden bg-white shadow-sm cursor-pointer hover:border-[#FF6B1A] transition-colors"
                    >
                      <img src={img.src} alt={img.alt} className="w-full h-auto object-cover max-h-24 grayscale group-hover:grayscale-0 transition-all duration-300" />
                      <div className="absolute top-2 left-2 bg-neutral-900/60 backdrop-blur-sm px-1.5 py-0.5 rounded font-mono text-[0.45rem] text-white">
                        {`item_${i + 1}.png`}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="border border-dashed border-neutral-300 rounded-lg p-6 font-mono text-[0.55rem] text-neutral-400 text-center italic">
                    Folder is empty
                  </div>
                )}
              </div>

              {/* Static metadata block */}
              <div className="mt-auto font-mono text-[0.45rem] text-neutral-400 leading-relaxed whitespace-pre-line border-t border-neutral-200/60 pt-2 select-none">
                {folderData[selectedFolder].meta}
              </div>
            </div>
          </div>

          {/* Explorer Bottom Status bar */}
          <div className="bg-[#f0f0f0] border-t border-neutral-200 px-4 py-1.5 flex items-center gap-4 text-neutral-600 font-mono text-[0.52rem] select-none flex-wrap">
            <span>
              {`${Object.keys(folderData).length} folders listed · select folder to view`}
            </span>
            <div className="hidden sm:block w-[1px] h-3 bg-neutral-300" />
            <div className="hidden sm:flex items-center gap-2">
              <span>Drive (C:) Cache</span>
              <div className="w-16 h-2 bg-neutral-200 rounded overflow-hidden">
                <div className="w-4/5 h-full bg-[#FF6B1A] animate-pulse" />
              </div>
            </div>
            <div className="hidden sm:block w-[1px] h-3 bg-neutral-300" />
            <span className="ml-auto font-bold text-[#FF6B1A]">
              🎨 Creative Mode: ON
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
