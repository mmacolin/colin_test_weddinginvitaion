import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface AudioPlayerProps {
  autoStart?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoStart = false }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthIntervalRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Gentle acoustic procedural chime chord fallback if external MP3 has issues or blocked
  const playGentleHarmonicChord = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Auspicious pentatonic wedding chime notes: C, D, E, G, A
      const frequencies = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
      const root = frequencies[Math.floor(Math.random() * frequencies.length)];
      const fifth = root * 1.5;

      [root, fifth].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.1 + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + 2.6);
      });
    } catch {
      // Audio context might be restricted before user interaction
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (synthIntervalRef.current) {
        window.clearInterval(synthIntervalRef.current);
        synthIntervalRef.current = null;
      }
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // If browser prevents audio file play, trigger gentle acoustic synthesizer loop
          playGentleHarmonicChord();
          synthIntervalRef.current = window.setInterval(playGentleHarmonicChord, 3800);
          setIsPlaying(true);
        });
      } else {
        playGentleHarmonicChord();
        synthIntervalRef.current = window.setInterval(playGentleHarmonicChord, 3800);
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    if (autoStart) {
      const timer = setTimeout(() => {
        if (!isPlaying) {
          toggleMusic();
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoStart]);

  useEffect(() => {
    return () => {
      if (synthIntervalRef.current) {
        window.clearInterval(synthIntervalRef.current);
      }
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="https://ik.imagekit.io/lqaxbrxnh/music_vinaya.mp3?updatedAt=1740404062674"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          id="music-toggle-btn"
          onClick={toggleMusic}
          className={`flex items-center gap-2 px-3 py-2 rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 ${
            isPlaying
              ? 'bg-[#c5a059]/90 border-[#e8d5a7] text-stone-900 shadow-[#c5a059]/20'
              : 'bg-stone-900/80 border-stone-700 text-stone-300 hover:text-white'
          }`}
          title={isPlaying ? "Mute Background Wedding Music" : "Play Background Wedding Music"}
          aria-label="Toggle wedding music"
        >
          {isPlaying ? (
            <>
              <div className="flex items-end gap-0.5 h-3.5 w-3.5">
                <span className="w-1 bg-stone-900 rounded-full animate-bounce [animation-delay:-0.3s] h-3"></span>
                <span className="w-1 bg-stone-900 rounded-full animate-bounce [animation-delay:-0.15s] h-2"></span>
                <span className="w-1 bg-stone-900 rounded-full animate-bounce h-3.5"></span>
              </div>
              <Volume2 className="w-4 h-4" />
              <span className="text-xs font-semibold tracking-wide hidden sm:inline">Music ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-stone-400" />
              <Music className="w-3.5 h-3.5 text-stone-500" />
              <span className="text-xs tracking-wide hidden sm:inline">Play Song</span>
            </>
          )}
        </button>
      </div>
    </>
  );
};
