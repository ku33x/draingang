import { useEffect, useMemo, useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import MatrixRain from "./MatrixRain";
import { ASCII_PORTRAIT, SONGS, CHARSETS } from "../data/asciiArt";

const BladeePage = () => {
  const videoRef = useRef(null);
  const [entered, setEntered] = useState(false);
  const [muted, setMuted] = useState(false);

  const pick = useMemo(
    () => SONGS[Math.floor(Math.random() * SONGS.length)],
    []
  );
  const charset = useMemo(
    () => CHARSETS[Math.floor(Math.random() * CHARSETS.length)],
    []
  );

  useEffect(() => {
    document.title = "dg";
  }, []);

  const handleEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    setEntered(true);
  };

  // YouTube embed for the audio. Visuals come from bladee.com mp4.
  // We use autoplay=1, controls=0, and a tight loop. Hidden offscreen.
  const ytSrc = entered
    ? `https://www.youtube.com/embed/${pick.youtube}?autoplay=1&controls=0&loop=1&playlist=${pick.youtube}&modestbranding=1&rel=0&playsinline=1&mute=${muted ? 1 : 0}&iv_load_policy=3`
    : "";

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: "#000" }}
    >
      {/* Background video (visual only - muted) */}
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

      {/* Hidden YouTube audio player */}
      {entered && (
        <iframe
          key={`${pick.youtube}-${muted ? "m" : "u"}`}
          title="audio"
          src={ytSrc}
          allow="autoplay; encrypted-media"
          style={{
            position: "fixed",
            width: "1px",
            height: "1px",
            top: "-9999px",
            left: "-9999px",
            border: 0,
            opacity: 0,
            pointerEvents: "none",
          }}
        />
      )}

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

      {/* Mute toggle (only shown after entered) */}
      {entered && (
        <button
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "unmute" : "mute"}
          style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            zIndex: 20,
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "9999px",
            width: "38px",
            height: "38px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(255,255,255,0.45)",
            cursor: "pointer",
            transition: "color 0.2s ease, border-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.9)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.45)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
          }}
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      )}

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
