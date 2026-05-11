"use client";

import { useEffect, useRef } from "react";

import { saveWatchProgress } from "@/app/actions/watch-progress";

interface Props {
  episodeId: string;
  videoUrl: string;
  startTime?: number;
}

export default function VideoPlayer({
  episodeId,
  videoUrl,
  startTime = 0,
}: Props) {

  const videoRef =
    useRef<HTMLVideoElement>(null);

  // VOLTAR DO TEMPO SALVO

  useEffect(() => {

    const video = videoRef.current;

    if (!video) return;

    const handleLoadedMetadata = () => {

      if (startTime > 0) {
        video.currentTime = startTime;
      }

    };

    video.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata
    );

    return () => {

      video.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );

    };

  }, [startTime]);

  // SALVAR PROGRESSO

  useEffect(() => {

    const interval = setInterval(async () => {

      const video = videoRef.current;

      if (!video) return;

      // evita salvar antes do vídeo carregar

      if (
        video.duration <= 0 ||
        isNaN(video.duration)
      ) {
        return;
      }

      // evita salvar enquanto pausado

      if (video.paused) {
        return;
      }

      console.log({
        currentTime: video.currentTime,
        duration: video.duration,
      });

      await saveWatchProgress({

        episodeId,

        currentTime:
          video.currentTime,

        duration:
          video.duration,

      });

    }, 10000);

    return () => clearInterval(interval);

  }, [episodeId]);

  return (

    <video
      ref={videoRef}
      controls
      autoPlay
      className="w-full h-full rounded-3xl"
    >

      <source
        src={videoUrl}
        type="video/mp4"
      />

    </video>

  );

}