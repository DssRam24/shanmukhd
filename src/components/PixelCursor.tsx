import { useEffect, useState } from 'react';

export default function PixelCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.closest('a') ||
          target.closest('button') ||
          target.closest('.interest-card') ||
          target.closest('.win-file') ||
          target.closest('.book-card') ||
          target.closest('.tool-btn') ||
          target.closest('.color-swatch') ||
          target.closest('.social-link') ||
          target.closest('.stab') ||
          target.closest('.win-mi') ||
          target.closest('.win-btn') ||
          target.style.cursor === 'pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      id="px-cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        transform: `translate3d(${position.x - 10}px, ${position.y - 10}px, 0) scale(${isHovered ? 0.3 : 1})`,
        pointerEvents: 'none',
        zIndex: 99999,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: '#ffffff',
        mixBlendMode: 'difference',
        transition: 'transform 0.1s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.15s ease',
        opacity: 1,
      }}
    />
  );
}
