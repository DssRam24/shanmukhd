import { useEffect, useRef, useState, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';

const DOODLE_COLORS = [
  '#0a0a0a', // Deep charcoal
  '#FF6B1A', // Bright theme orange
  '#FFD580', // Soft yellow
  '#FF6B9D', // Bubblegum pink
  '#6B9DFF', // Neon blue
  '#6BFFB8', // Lime green
  '#ffffff', // Clean white
  '#FF4444'  // Alert red
];

export default function DoodleSpace() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState('#0a0a0a');
  const [tool, setTool] = useState<'draw' | 'erase'>('draw');
  const [brushSize, setBrushSize] = useState(6);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // Initialize and resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      // Store existing canvas content
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
        tempCtx.drawImage(canvas, 0, 0);
      }

      // Resize
      canvas.width = canvas.parentElement?.offsetWidth || 600;
      canvas.height = 400;

      // Restore content
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.drawImage(tempCanvas, 0, 0);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const getCoordinates = (e: ReactMouseEvent | ReactTouchEvent | TouchEvent | MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    
    // Check if touch event
    if ('touches' in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    
    // Check if mouse event
    if ('clientX' in e) {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }

    return { x: 0, y: 0 };
  };

  const startDrawing = (e: ReactMouseEvent<HTMLCanvasElement> | ReactTouchEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const pos = getCoordinates(e);
    lastPos.current = pos;
  };

  const draw = (e: ReactMouseEvent<HTMLCanvasElement> | ReactTouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const pos = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);

    if (tool === 'erase') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = brushSize * 2; // bigger eraser
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
    }

    ctx.stroke();
    lastPos.current = pos;
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveDoodle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'doodle-dssram.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    <section id="doodle" className="py-24 px-[5%] bg-[#FFFAF2]">
      <div className="font-mono text-[0.6rem] text-[#FF6B1A] tracking-[0.2em] uppercase mb-4 flex items-center justify-start gap-4">
        005 — Doodle Space
        <span className="h-[1px] bg-[#FF6B1A]/30 flex-1" />
      </div>

      <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-bold mb-12 text-neutral-900 text-left">
        Leave your <em className="italic text-[#FF6B1A]">mark.</em>
      </h2>

      <p className="font-mono text-[0.68rem] text-neutral-400 -mt-8 mb-6 text-left">
        // permission granted to go completely unhinged here
      </p>

      {/* Styled Canvas Wrapper */}
      <div className="rounded-2xl overflow-hidden border-2 border-[#FF6B1A]/20 bg-[#FFFAF2] shadow-xl relative w-full">
        {/* Draw toolbar */}
        <div className="bg-white border-b border-[#FF6B1A]/10 px-4 py-3 flex items-center gap-3 flex-wrap select-none">
          <button
            onClick={() => setTool('draw')}
            className={`px-3 py-1.5 rounded-lg border font-mono text-[0.6rem] font-bold flex items-center gap-1.5 transition-all ${
              tool === 'draw'
                ? 'bg-[#FF6B1A] text-white border-[#FF6B1A]'
                : 'bg-white border-neutral-200 text-neutral-800 hover:bg-neutral-50'
            }`}
          >
            ✏️ Draw
          </button>
          <button
            onClick={() => setTool('erase')}
            className={`px-3 py-1.5 rounded-lg border font-mono text-[0.6rem] font-bold flex items-center gap-1.5 transition-all ${
              tool === 'erase'
                ? 'bg-[#FF6B1A] text-white border-[#FF6B1A]'
                : 'bg-white border-neutral-200 text-neutral-800 hover:bg-neutral-50'
            }`}
          >
            ⬜ Erase
          </button>
          <button
            onClick={clearCanvas}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 bg-white font-mono text-[0.6rem] text-neutral-800 font-bold hover:bg-red-50 hover:text-red-600 transition-all"
          >
            🗑️ Clear
          </button>
          <button
            onClick={saveDoodle}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 bg-white font-mono text-[0.6rem] text-neutral-800 font-bold hover:bg-[#FF6B1A] hover:text-white hover:border-[#FF6B1A] transition-all"
          >
            💾 Save
          </button>

          <div className="w-[1px] h-5 bg-neutral-200 mx-1" />

          {/* Color palette swatches */}
          <div className="flex gap-1.5 items-center flex-wrap">
            {DOODLE_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setColor(c);
                  setTool('draw');
                }}
                className={`w-6 h-6 rounded border-2 transition-all ${
                  color === c && tool === 'draw' ? 'scale-110 border-neutral-800' : 'border-transparent hover:scale-105'
                }`}
                style={{
                  backgroundColor: c,
                  boxShadow: c === '#ffffff' ? 'inset 0 0 0 1px #ccc' : 'none'
                }}
                aria-label={`Color ${c}`}
              />
            ))}
          </div>

          <div className="w-[1px] h-5 bg-neutral-200 mx-1" />

          {/* Brush Thickness slide */}
          <label className="font-mono text-[0.6rem] text-neutral-400 flex items-center gap-2 whitespace-nowrap">
            Size
            <input
              type="range"
              min="2"
              max="40"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-20 accent-[#FF6B1A] h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="font-bold text-neutral-700 w-4 inline-block">{brushSize}</span>
          </label>
        </div>

        {/* Real drawing Canvas */}
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="block w-full bg-[#FFFAF2] bg-[radial-gradient(circle,rgba(255,107,26,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"
          style={{ height: '400px' }}
        />

        {/* Ambient hint label */}
        <div className="absolute bottom-3 right-4 font-serif text-[0.8rem] text-[#FF6B1A]/40 pointer-events-none select-none">
          draw something cursed ✦
        </div>
      </div>
    </section>
  );
}
