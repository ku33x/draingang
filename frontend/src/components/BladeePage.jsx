import { useEffect, useMemo, useState, useRef } from "react";
import MatrixRain from "./MatrixRain";
import { ASCII_PORTRAIT, SONGS, CHARSETS } from "../data/asciiArt";

const BladeePage = () => {
  const videoRef = useRef(null);
  const [entered, setEntered] = useState(false);

  const pick = useMemo(
    () => SONGS[Math.floor(Math.random() * SONGS.length)],
    []
  );
  const charset = useMemo(
    () => CHARSETS[Math.floor(Math.random() * CHARSETS.length)],
    []
  );

  // Set page title to "dg" like the original
  useEffect(() => {
    document.title = "dg";
  }, []);

  const handleEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    setEntered(true);
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: "#000" }}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        src={pick.file}
        loop
        playsInline
        preload="auto"
        muted
        className="fixed"
        style={{
          top: "50%",
          left: "50%",
          minWidth: "100%",
          minHeight: "100%",
          width: "auto",
          height: "auto",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
          objectFit: "cover",
          opacity: 0.4,
        }}
      />

      {/* Matrix Rain Canvas */}
      <MatrixRain charset={charset} active={entered} />

      {/* ASCII Portrait Content */}
      <div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
        style={{
          zIndex: 5,
          pointerEvents: "none",
          opacity: entered ? 1 : 0,
          transition: "opacity 1s ease",
        }}
      >
        <pre
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: "clamp(5px, 1.1vw, 11px)",
            lineHeight: 1.2,
            color: "#ffffff",
            whiteSpace: "pre",
            margin: 0,
          }}
        >
          {ASCII_PORTRAIT}
        </pre>
      </div>

      {/* Lyric */}
      <div
        className="fixed"
        style={{
          left: "50%",
          bottom: "80px",
          transform: "translateX(-50%)",
          zIndex: 6,
          fontFamily: "'Courier New', Courier, monospace",
          color: "rgba(255,255,255,0.55)",
          textAlign: "center",
          maxWidth: "min(720px, 88vw)",
          opacity: entered ? 1 : 0,
          transition: "opacity 1.4s ease",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: "clamp(12px, 1.4vw, 16px)",
            fontStyle: "italic",
            letterSpacing: "0.04em",
            lineHeight: 1.5,
          }}
        >
          {`\u201C${pick.lyric}\u201D`}
        </div>
        <div
          style={{
            marginTop: "10px",
            fontSize: "11px",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.2em",
            textTransform: "lowercase",
          }}
        >
          {pick.title}
        </div>
      </div>

      {/* Links */}
      <div
        className="fixed flex"
        style={{
          bottom: "28px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          gap: "28px",
          opacity: entered ? 1 : 0,
          transition: "opacity 1s ease",
          pointerEvents: entered ? "auto" : "none",
        }}
      >
        <a
          href="mailto:admin@bladee.com"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: "12px",
            color: "rgba(255,255,255,0.35)",
            textDecoration: "none",
            letterSpacing: "0.15em",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
        >
          contact
        </a>
        <a
          href="https://discord.gg/leandoer"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: "12px",
            color: "rgba(255,255,255,0.35)",
            textDecoration: "none",
            letterSpacing: "0.15em",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
        >
          discord
        </a>
      </div>

      {/* Start Overlay */}
      {!entered && (
        <div
          onClick={handleEnter}
          className="fixed inset-0 flex items-center justify-center cursor-pointer group"
          style={{ zIndex: 100 }}
        >
          <div
            className="group-hover:!text-white/80 group-hover:!border-white/40"
            style={{
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: "13px",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.2em",
              textTransform: "lowercase",
              border: "1px solid rgba(255,255,255,0.15)",
              padding: "10px 24px",
              borderRadius: "40px",
              pointerEvents: "none",
              transition: "color 0.3s, border-color 0.3s",
            }}
          >
            click anywhere to enter
          </div>
        </div>
      )}
    </div>
  );
};

export default BladeePage;
