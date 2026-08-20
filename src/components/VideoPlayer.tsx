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
    <div ref={containerRef} className="w-full min-w-[280px]">
      <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
        {!hasValidYoutubeId || hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-600">
            <p className="text-center px-4">Video no disponible</p>
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
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
            <p className="text-center px-4">Cargando video...</p>
          </div>
        )}
      </div>

      <a
        href={video.urlDirecta}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 mt-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
      >
        Ver en YouTube ↗
      </a>
    </div>
  );
}
