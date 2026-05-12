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
import { GhostIcon } from "lucide-react";

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
     pausing: "resting",
     haunted: "haunted",
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
              "radial-gradient(ellipse at center, rgba(100,50,150,0.4) 0%, transparent 90%)",
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
              className={cn(
                "relative mb-6 rounded-sm overflow-hidden",
                state.isHaunted && "animate-haunted-paper",
              )}
              style={{
                background: "linear-gradient(180deg, #f5e8c8 0%, #ede0b0 100%)",
                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.4), inset 0 0 40px rgba(0,0,0,0.06)",
              }}
            >
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full border-b border-black/5"
                    style={{ top: `${(i + 1) * 20}px` }}
                  />
                ))}
                <div className="absolute top-0 bottom-0 left-10 border-l border-red-400/20" />
              </div>
              <div className="relative p-5">
                <p className="font-special-elite text-sm md:text-base leading-relaxed min-h-30 wrap-break-word text-[#1a1208] ml-8">
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
                    <GhostIcon className="w-3 h-3 mr-1 text-purple-700/80 animate-pulse" />
                  )}
                  {phaseLabel[state.phase] ?? state.phase}
                </Badge>
              </div>
            </div>

            <div className="mb-5 flex items-center justify-between">
              <p className="font-special-elite text-sm italic text-[#f5e8c8] opacity-35">
                <span className="text-[#f5e8c8] opacity-85">
                  {state.quote.source}
                </span>
                {" · "}
                {state.quote.author}{" "}
                <span className="text-[#f5e8c8] opacity-80">
                  ({state.quote.year})
                </span>
              </p>

              <div className="flex items-center gap-2">
                <div className="w-24 h-4 rounded-full overflow-hidden bg-[#f5e8c8] opacity-20">
                  <div
                    className="h-full transition-all duration-100 bg-[#b48c3c] opacity-50"
                    style={{ width: `${state.progress}%` }}
                  />
                </div>
                <span className="font-special-elite text-sm text-[#f5e8c8] opacity-20 w-8">
                  {state.progress}%
                </span>
              </div>
            </div>
            {/* keyboard */}
          </div>
          <div
            className="h-px w-full mt-1"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(180,140,60,0.4), transparent)",
            }}
          />
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
