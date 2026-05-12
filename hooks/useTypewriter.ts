"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getRandomQuote, Quote } from "@/quotes";

type Phase = "typing" | "pausing" | "haunted" | "erasing" | "complete";

export interface TypewriterState {
  displayText: string;
  phase: Phase;
  quote: string;
  progress: number;
  isHaunted: boolean;
}

interface Options {
  typeSpeed?: number;
  eraseSpeed?: number;
  pauseDuration?: number;
  hauntedDuration?: number;
  onKeystroke?: (char: string) => void;
}

export function useTypewriter(options: Options = {}) {
  const {
    typeSpeed = options.typeSpeed ?? 80,
    eraseSpeed = options.eraseSpeed ?? 45,
    pauseDuration = options.pauseDuration ?? 2500,
    hauntedDuration = options.hauntedDuration ?? 1800,
    onKeystroke = options.onKeystroke,
  } = options;

  const [quote, setQuote] = useState<Quote>(getRandomQuote());
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  // typing effect
  useEffect(() => {
    if (phase !== "typing" && phase !== "erasing") return;

    if (displayText.length >= quote.text.length) {
      timerRef.current = setTimeout(() => setPhase("pausing"), 100);
      return clearTimer;
    }

    const nextChar = quote.text[displayText.length];

    onKeystroke?.(nextChar);

    const punctuationDelay =
      nextChar === "." || nextChar === "!" || nextChar === "?"
        ? 200
        : nextChar === "," || nextChar === ";"
          ? 120
          : 0;

    const jitter = Math.random() * 40 - 20; // random jitter between -20 and +20 ms

    timerRef.current = setTimeout(
      () => {
        setDisplayText(quote.text.slice(0, displayText.length + 1));
      },
      typeSpeed + punctuationDelay + jitter,
    );

    return clearTimer;
  }, [displayText, quote.text, phase, typeSpeed, onKeystroke, clearTimer]);

  // pausing effect
  useEffect(() => {
    if (phase !== "pausing") return;

    timerRef.current = setTimeout(() => setPhase("haunted"), pauseDuration);

    return clearTimer;
  }, [phase, pauseDuration, clearTimer]);

  // haunted effect
  useEffect(() => {
    if (phase !== "haunted") return;

    timerRef.current = setTimeout(() => setPhase("erasing"), hauntedDuration);

    return clearTimer;
  }, [phase, hauntedDuration, clearTimer]);

  // erasing effect
  useEffect(() => {
    if (phase !== "erasing") return;

    if (displayText.length === 0) {
      timerRef.current = setTimeout(() => setPhase("complete"), 100);
      return clearTimer;
    }

    const jitter = Math.random() * 20 - 10; // random jitter bw -10 and +10

    timerRef.current = setTimeout(() => {
      setDisplayText(displayText.slice(0, -1));
    }, eraseSpeed + jitter);

    return clearTimer;
  }, [displayText, phase, eraseSpeed, clearTimer]);

  // complete
  useEffect(() => {
    if (phase === "complete") return;

    timerRef.current = setTimeout(() => {
      setQuote(getRandomQuote());
      setDisplayText("");
      setPhase("typing");
    }, 1000);

    return clearTimer;
  }, [phase, clearTimer]);

  const progress =
    quote.text.length === 0
      ? 0
      : Math.round((displayText.length / quote.text.length) * 100);

  const isHaunted = phase === "pausing" || phase === "haunted";

  const restart = useCallback(() => {
    clearTimer();
    setQuote(getRandomQuote());
    setDisplayText("");
    setPhase("typing");
  }, [clearTimer]);

  const skip = useCallback(() => {
    if (phase === "typing") {
      clearTimer();
      setDisplayText(quote.text);
      setPhase("pausing");
    }
  }, [clearTimer, phase, quote.text]);

  return {
    state: { displayText, phase, quote, progress, isHaunted },
    restart,
    skip,
  };
}
