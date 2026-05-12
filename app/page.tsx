"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const FULL_TEXT = "It was a dark and stormy night.";

export default function Home() {
  const [pressedLeys, setPressedKeys] = useState<Set<string>>(new Set());
  const hasInteracted = useRef(false);

  const handleKeystroke = useCallback((char: string) => {
    if (!hasInteracted.current) return;

    const key = char.toUpperCase();
    setPressedKeys((prev) => {
      const next = new Set(prev);
      next.add(key);

      setTimeout(() => {
        setPressedKeys((prev) => {
          const n = new Set(prev);
          n.delete(key);
          return n;
        });
      }, 150)
      return next;
    })
  }, [])

  const handleFirstClick = () => {
    hasInteracted.current = true;
    // setSoundEnabled(true);
  }
 
  const { state, restart, skip } = useTypewriter({
    typeSpeed: 75,
    eraseSpeed: 40,
    pauseDuration: 2800,
    hauntedDuration: 2000,
    onKeystroke: handleKeystroke,
  })

   const phaseLabel: Record<string, string> = {
     idle: "● waiting",
     typing: "● typing",
     pausing: "● resting",
     haunted: "✦ haunted",
     erasing: "✦ erasing",
     complete: "↺ rewinding",
   };

  const phaseColors: Record<string, string> = {
    idle: "bg-stone-800 text-stone-400 border-stone-700",
    typing: "bg-amber-100 text-amber-800 border-amber-300",
    pausing: "bg-blue-100 text-blue-800 border-blue-300",
    haunted: "bg-purple-100 text-purple-800 border-purple-300",
    erasing: "bg-red-100 text-red-800 border-red-300",
    complete: "bg-green-100 text-green-800 border-green-300",
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#191816] md:p-8"
      onClick={handleFirstClick}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {state.isHaunted && (
        <div
          className="absolute inset-0 pointer-events-none animate-pulse"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(100,50,150,0.07) 0%, transparent 60%)",
          }}
        />
      )}

      <div className="relative z-10 text-center mb-8">
        <h1 className="font-special-elite text-sm tracking-[0.4em] mb-1 text-[#f5e8c8]">
          Haunted Typewriter
        </h1>
        <p className="font-special-elite text-xs italic text-[#f5e8c8] opacity-20">
          voices from the pages
        </p>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <div
          className="rounded-sm p-1"
          style={{
            background: "linear-gradient(145deg, #1c1508, #0d0902)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,200,80,0.06)",
          }}
        >
          <div
            className="h-px w-full mb-1"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(180,140,60,0.4), transparent)",
            }}
          />
          <div className="p-5 md:p-7">
            <div
              className="relative mb-6 rounded-sm overflow-hidden min-h-45"
              style={{
                background: "linear-gradient(180deg, #f5e8c8 0%, #ede0b0 100%)",
                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.4), inset 0 0 40px rgba(0,0,0,0.06)",
              }}
            >
              <div className="relative p-5">
                <p className="font-special-elite text-sm md:text-base leading-relaxed min-h-30 wrap-break-word text-[#1a1208]">
                  {state.displayText}
                  <span
                    className={cn(
                      "inline-block w-0.5 h-[1.1em] ml-0.5 align-text-bottom",
                      state.isHaunted
                        ? "bg-red-700/60 animate-flicker"
                        : "bg-[#1a1208]/70 animate-cursor-blink",
                    )}
                  />
                </p>
              </div>

              <div className="absolute bottom-2 right-3">
                <Badge
                  className={cn(
                    "text-[10px] px-2 py-0 h-5 font-special-elite border transition-all duration-500",
                    phaseColors[state.phase] ?? phaseColors["idle"],
                  )}
                >
                  {state.isHaunted && (
                    <span className="text-[8px] mr-1 animate-pulse">👻</span>
                  )}
                  {phaseLabel[state.phase] ?? state.phase}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-6">
        <p className="font-special-elite text-[10px] tracking-widest uppercase text-[#f5e8c8] opacity-10">
          {!hasInteracted.current
            ? "click anywhere to enable sound"
            : "the machine remembers everything"}
        </p>
      </div>
    </div>
  );
}
