import { useState, useEffect } from 'react';
import PixelCursor from './components/PixelCursor';
import NightSky from './components/NightSky';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ArchivesBanner from './components/ArchivesBanner';
import About from './components/About';
import OriginStory from './components/OriginStory';
import Projects from './components/Projects';
import DesignExplorer from './components/DesignExplorer';
import BooksSection from './components/BooksSection';
import Photography from './components/Photography';
import DoodleSpace from './components/DoodleSpace';
import FeedbackNotes from './components/FeedbackNotes';
import Footer from './components/Footer';
import AdminPortal from './components/AdminPortal';
import ImageLightbox from './components/ImageLightbox';
import { testFirestoreConnection } from './services/firebase';

export default function App() {
  const [lightbox, setLightbox] = useState({ isOpen: false, src: '', label: '' });

  useEffect(() => {
    // Validate Firestore connection on app mount
    testFirestoreConnection();
  }, []);

  const openLightbox = (src: string, label: string) => {
    setLightbox({ isOpen: true, src, label });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, src: '', label: '' });
  };

  return (
    <div className="relative min-h-screen bg-[#FFFAF2] overflow-x-hidden selection:bg-[#FF6B1A] selection:text-white antialiased">
      {/* Dynamic Cursor blending effect */}
      <PixelCursor />

      {/* Retro Night sky celestial canvas layer */}
      <NightSky />

      {/* Floating glass navigation menu */}
      <Navbar />

      {/* Hero presentation with Terminal and draggable photo */}
      <Hero />

      {/* Archives separator banner */}
      <ArchivesBanner />

      {/* Labeled sections */}
      <main>
        {/* Origin narrative block */}
        <OriginStory />

        {/* Dynamic skills highlights & interactive card forms */}
        <About />

        {/* Brutalist builds bento grid */}
        <Projects />

        {/* Retro simulated File Explorer showcase */}
        <DesignExplorer onImageClick={openLightbox} />

        {/* Read queue combined with Suggest Panel */}
        <BooksSection />

        {/* Photography gallery */}
        <Photography onImageClick={openLightbox} />

        {/* Interactive Draw Board canvas */}
        <DoodleSpace />
      </main>

      {/* Sticky pin board drawer */}
      <FeedbackNotes />

      {/* Scenic sunset skyline clock footer */}
      <Footer />

      {/* Secret door portal */}
      <AdminPortal />

      {/* Main Image ratings lightbox modal */}
      <ImageLightbox
        isOpen={lightbox.isOpen}
        src={lightbox.src}
        label={lightbox.label}
        onClose={closeLightbox}
      />
    </div>
  );
}
