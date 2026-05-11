"use client";
import { useState, useEffect } from "react";

const FULL_TEXT = "It was a dark and stormy night.";

export default function Home() {
  const [displayed, setDisplayed] = useState("");
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    if (!isErasing) {
      if (displayed.length >= FULL_TEXT.length) {
        const pause = setTimeout(() => setIsErasing(true), 2000);
        return () => clearTimeout(pause);
      }
      const timer = setTimeout(() => {
        setDisplayed(FULL_TEXT.slice(0, displayed.length + 1));
      }, 100);
      return () => clearTimeout(timer);
    } else {
      if (displayed.length === 0) {
        setIsErasing(false);
        return;
      }
      const timer = setTimeout(() => {
        setDisplayed(displayed.slice(0, -1));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [displayed, isErasing]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-foreground/90">
      <p className="font-typewriter text-[#f5e8c8] text-lg">
        {displayed}
        <span className="animate-cursor-blink inline-block w-0.5 h-5 bg-[#f5e8c8] ml-0.5 align-middle" />
      </p>
    </main>
  );
}
