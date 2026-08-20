"use client";

import { useEffect, useRef, useState } from "react";
import type { VideoPlayerProps } from "@/lib/types";

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  const hasValidYoutubeId = video.youtubeId && video.youtubeId.trim().length > 0;

  return (
    <div ref={containerRef} className="w-full">
      {/* Video Title Bar */}
      <div
        className="text-[11px] font-semibold text-[var(--color-encarta-cream)] px-2 py-1 border border-[#0a3a1e] border-b-0"
        style={{
          background: "linear-gradient(180deg, #1f7d45 0%, #0D4A28 100%)",
          boxShadow: "inset 0 1px rgba(255,255,255,0.15)",
        }}
      >
        🎬 {video.titulo}
      </div>

      {/* Video Frame */}
      <div
        className="relative w-full aspect-video border border-[#5a5a5a] bg-[#1a1a1a]"
        style={{ boxShadow: "inset 0 1px 3px rgba(0,0,0,0.5)" }}
      >
        {!hasValidYoutubeId || hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[#2a2a2a] text-[#888]">
            <p className="text-center text-[12px] px-4">Video no disponible</p>
          </div>
        ) : isVisible ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
            title={video.titulo}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            loading="lazy"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#2a2a2a] text-[#888]">
            <p className="text-center text-[12px] px-4">Cargando video...</p>
          </div>
        )}
      </div>

      {/* Video Controls Bar */}
      <div
        className="flex items-center justify-between px-2 py-1 border border-[#5a5a5a] border-t-0"
        style={{
          background: "linear-gradient(180deg, #e8e0c8 0%, #d4c9a8 100%)",
          boxShadow: "inset 0 1px rgba(255,255,255,0.4)",
        }}
      >
        <a
          href={video.urlDirecta}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-[var(--color-encarta-blue)] hover:underline font-medium"
        >
          Ver en YouTube ↗
        </a>
      </div>
    </div>
  );
}
