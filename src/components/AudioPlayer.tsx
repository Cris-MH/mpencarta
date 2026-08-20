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

  if (hasError) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <p className="text-sm font-medium text-gray-700">{audio.titulo}</p>
        <p className="mt-2 text-sm text-error">Audio no disponible</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <p className="mb-3 text-sm font-medium text-gray-700">{audio.titulo}</p>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={isPlaying ? handlePause : handlePlay}
          className="flex min-h-touch min-w-touch items-center justify-center rounded-full bg-primary-500 text-white transition-colors hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          aria-label={isPlaying ? "Pausar audio" : "Reproducir audio"}
        >
          <span className="text-lg">{isPlaying ? "⏸" : "▶"}</span>
        </button>

        <span className="text-sm text-gray-600">
          {formatTime(currentTime)} / {formatTime(duration)}
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
