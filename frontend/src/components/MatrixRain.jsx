import { useEffect, useRef } from "react";

const SPEED = 2;
const DENSITY = 80;
const FONTSIZE = 10;

const MatrixRain = ({ charset, active }) => {
  const canvasRef = useRef(null);
  const dropsRef = useRef([]);
  const rafRef = useRef(null);
  const lastRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const rchar = () => charset[Math.floor(Math.random() * charset.length)];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const cols = Math.floor(canvas.width / FONTSIZE);
      const drops = [];
      for (let i = 0; i < cols; i++) {
        if (Math.random() * 100 < DENSITY) {
          drops.push({
            x: i,
            y: Math.random() * -(canvas.height / FONTSIZE),
            speed: 0.3 + Math.random() * 0.7,
            length: 3 + Math.floor(Math.random() * 5),
            chars: [],
          });
        }
      }
      dropsRef.current = drops;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FONTSIZE}px monospace`;
      for (const drop of dropsRef.current) {
        drop.y += drop.speed * SPEED;
        drop.chars.push(rchar());
        if (drop.chars.length > drop.length) drop.chars.shift();

        for (let j = 0; j < drop.chars.length; j++) {
          const py = (drop.y - j) * FONTSIZE;
          if (py < 0 || py > canvas.height) continue;
          const b = Math.floor(255 * (1 - j / drop.length));
          ctx.fillStyle = `rgb(${b},${b},${b})`;
          ctx.fillText(
            drop.chars[drop.chars.length - 1 - j],
            drop.x * FONTSIZE,
            py
          );
        }

        if (drop.y * FONTSIZE > canvas.height + drop.length * FONTSIZE) {
          drop.y = Math.random() * -20;
          drop.chars = [];
        }
      }
    };

    const loop = (ts) => {
      if (ts - lastRef.current >= 33) {
        lastRef.current = ts;
        draw();
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    init();
    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", init);
    };
  }, [charset]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{
        zIndex: 1,
        background: "transparent",
        opacity: active ? 1 : 0,
        transition: "opacity 1s ease",
      }}
    />
  );
};

export default MatrixRain;
