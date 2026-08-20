"use client";

import { useRef, useState } from "react";
import type { AudioPlayerProps } from "@/lib/types";

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function AudioPlayer({ audio }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(audio.duracionSegundos);
  const [hasError, setHasError] = useState(false);

  const handlePlay = () => {
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleError = () => {
    setHasError(true);
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (hasError) {
    return (
      <div className="border border-[#8b7d5e] bg-[#f8f4e8] p-2">
        <p className="text-[12px] font-medium text-[var(--color-encarta-dark-text)]">{audio.titulo}</p>
        <p className="mt-1 text-[11px] text-[var(--color-encarta-red)]">⚠ Audio no disponible</p>
      </div>
    );
  }

  return (
    <div
      className="border border-[#8b7d5e] bg-gradient-to-b from-[#f8f4e8] to-[#e8e0c8] p-2"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.1), inset 0 1px rgba(255,255,255,0.5)" }}
    >
      <p className="text-[11px] font-semibold text-[var(--color-encarta-dark-text)] mb-2">{audio.titulo}</p>

      <div className="flex items-center gap-2">
        {/* Play/Pause Button - Beveled */}
        <button
          type="button"
          onClick={isPlaying ? handlePause : handlePlay}
          className="w-7 h-7 flex items-center justify-center rounded-sm border border-[#0a3a1e] text-white text-[11px] shrink-0 transition-all duration-120"
          style={{
            background: isPlaying
              ? "linear-gradient(180deg, #0D4A28 0%, #176B3A 100%)"
              : "linear-gradient(180deg, #2d8f52 0%, #176B3A 100%)",
            boxShadow: isPlaying
              ? "inset 0 2px 3px rgba(0,0,0,0.3)"
              : "0 1px 2px rgba(0,0,0,0.3), inset 0 1px rgba(255,255,255,0.2)",
          }}
          aria-label={isPlaying ? "Pausar audio" : "Reproducir audio"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        {/* Progress Bar - Groove style */}
        <div className="flex-1 flex flex-col gap-0.5">
          <div
            className="h-3 w-full bg-[#d4c9a8] rounded-sm overflow-hidden"
            style={{
              border: "1px groove #a0a0a0",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-[#176B3A] to-[#3D9A5B] transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Time Display - Monospace */}
        <span className="text-[10px] font-mono text-[#4a4030] shrink-0 tabular-nums">
          {formatTime(currentTime)}/{formatTime(duration)}
        </span>
      </div>

      <audio
        ref={audioRef}
        src={audio.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onError={handleError}
        onEnded={handleEnded}
        preload="metadata"
      />
    </div>
  );
}
