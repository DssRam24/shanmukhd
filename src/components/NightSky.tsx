import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  r: number;
  a: number;
  da: number;
  z: number;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  alpha: number;
  width: number;
  bright: boolean;
}

export default function NightSky() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buildStars();
    };

    const buildStars = () => {
      stars = [];
      const count = 120; // slightly reduced for performance in iframe
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.2 + 0.2,
          a: Math.random(),
          da: (Math.random() * 0.006 + 0.002) * (Math.random() < 0.5 ? 1 : -1),
          z: Math.random(),
        });
      }
    };

    const spawnMeteor = () => {
      meteors.push({
        x: Math.random() * canvas.width * 1.4 - canvas.width * 0.2,
        y: -20,
        vx: 3 + Math.random() * 4,
        vy: 4 + Math.random() * 5,
        len: 60 + Math.random() * 100,
        alpha: 1,
        width: 0.8 + Math.random() * 1.0,
        bright: Math.random() < 0.2,
      });
    };

    // Spawn meteors periodically
    const spawnInterval = setInterval(() => {
      if (Math.random() < 0.3) spawnMeteor();
    }, 1200);

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((s) => {
        s.a = Math.max(0.05, Math.min(1, s.a + s.da));
        if (s.a <= 0.05 || s.a >= 1) s.da *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * (0.5 + s.z * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = s.z > 0.7
          ? `rgba(255, 230, 180, ${s.a * 0.85})`
          : `rgba(220, 225, 255, ${s.a * 0.7})`;
        ctx.fill();
      });

      // Filter off-screen or faded meteors
      meteors = meteors.filter((m) => m.alpha > 0.02 && m.x < canvas.width + 100 && m.y < canvas.height + 100);

      // Draw meteors
      meteors.forEach((m) => {
        const hyp = Math.hypot(m.vx, m.vy);
        const tx = m.x - (m.vx / hyp) * m.len;
        const ty = m.y - (m.vy / hyp) * m.len;
        const g = ctx.createLinearGradient(tx, ty, m.x, m.y);

        if (m.bright) {
          g.addColorStop(0, 'rgba(255, 220, 120, 0)');
          g.addColorStop(0.6, `rgba(255, 180, 80, ${m.alpha * 0.5})`);
          g.addColorStop(1, `rgba(255, 240, 200, ${m.alpha})`);
        } else {
          g.addColorStop(0, 'rgba(180, 200, 255, 0)');
          g.addColorStop(1, `rgba(220, 230, 255, ${m.alpha})`);
        }

        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = g;
        ctx.lineWidth = m.width * (m.bright ? 1.6 : 1);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.bright ? 2.0 : 1.0, 0, Math.PI * 2);
        ctx.fillStyle = m.bright
          ? `rgba(255, 220, 150, ${m.alpha})`
          : `rgba(200, 220, 255, ${m.alpha})`;
        ctx.fill();

        m.x += m.vx;
        m.y += m.vy;
        m.alpha -= 0.015;
      });

      animationFrameId = requestAnimationFrame(drawFrame);
    };

    window.addEventListener('resize', resize);
    resize();
    drawFrame();

    return () => {
      window.removeEventListener('resize', resize);
      clearInterval(spawnInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1, // behind interactive text/images but above outer background overlays
        pointerEvents: 'none',
        opacity: 0.6,
      }}
    />
  );
}
