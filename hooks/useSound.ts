"use client";

import { useRef, useCallback, useEffect } from "react";

interface Options {
  volume?: number;
  enabled?: boolean;
}

export function useSound({
  enabled = true,
  volume = 0.5,
}: Options = {}) {
  const ctx = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctx.current) {
      ctx.current = new AudioContext();
    }

    return ctx.current;
  }, []);

  const playKeystrokeSound = useCallback(
    (char?: string) => {
      if (!enabled) return;

      try {
        const context = getCtx();
        const now = context.currentTime;

        const bufferSize = 0.04 * context.sampleRate;
        const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
        }

        const source = context.createBufferSource();
        source.buffer = buffer;

        const filter = context.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = char === " " ? 400 : 700;
        filter.Q.value = 2;

        const gain = context.createGain();
        gain.gain.setValueAtTime(volume, now);
        gain.gain.exponentialRampToValueAtTime(0.6 * volume, now + 0.002);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(context.destination);
        source.start(now);
        source.stop(now + 0.04);
      } catch (error) {
        console.error("Error playing key hitting paper sound:", error);
      }
    },
    [enabled, volume, getCtx],
  );

  const playBellSound = useCallback(
    (char?: string) => {
      if (!enabled) return;

      try {
        const context = getCtx();
        const now = context.currentTime;

        const osc = context.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(2200, now);
        osc.frequency.exponentialRampToValueAtTime(1800, now + 0.3);

        const gain = context.createGain();
        gain.gain.setValueAtTime(volume * 0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);


        osc.connect(gain);
        gain.connect(context.destination);
        osc.start(now);
        osc.stop(now + 0.4);
      } catch (error) {
        console.error("Error playing key hitting paper sound:", error);
      }
    },
    [enabled, volume, getCtx],
  );

  useEffect(() => {
    return () => {
      ctx.current?.close();
    };
  }, []);

  return { playKeystrokeSound, playBellSound };
}
