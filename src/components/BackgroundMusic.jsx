import { useEffect, useRef, useState } from "react";

const audioSrc = `${import.meta.env.BASE_URL}alex-warren-ordinary.mp3`;

function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.25;
      audioRef.current.muted = false;

      const startPlayback = async () => {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.warn("La reproducción automática fue bloqueada por el navegador:", error);
          setIsPlaying(false);
        }
      };

      startPlayback();
    }
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) {
      return;
    }

    const audio = audioRef.current;

    if (audio.muted) {
      audio.muted = false;
      setIsMuted(false);

      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.warn("No se pudo reanudar la música:", error);
        setIsPlaying(false);
      }
      return;
    }

    audio.muted = true;
    setIsMuted(true);
    audio.pause();
    setIsPlaying(false);
  };

  const handleAudioError = () => {
    if (audioRef.current && audioRef.current.currentSrc !== audioSrc) {
      audioRef.current.src = audioSrc;
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={audioSrc}
        autoPlay
        loop
        onError={handleAudioError}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button className="music-toggle" onClick={toggleMusic} type="button" aria-label="Control de música">
        {isMuted || !isPlaying ? "🔇" : "🎵"}
      </button>
    </>
  );
}

export default BackgroundMusic;
