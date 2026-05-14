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
import { GhostIcon, RotateCcw, SkipForward, Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/hooks/useSound";

const keyRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export default function Home() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  const hasInteracted = useRef(false);

  const { playKeystrokeSound, playBellSound, playEraseSound, playPaperLoadSound } = useSound({
    enabled: soundEnabled,
    volume,
  });

  const handleKeystroke = useCallback(
    (char: string) => {
      if (hasInteracted.current) {
        playKeystrokeSound(char);
      }
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
        }, 150);
        return next;
      });
    },
    [playKeystrokeSound],
  );

  const handleFirstClick = () => {
    hasInteracted.current = true;
    setSoundEnabled(true);
  };

  const { state, restart, skip } = useTypewriter({
    typeSpeed: 75,
    eraseSpeed: 40,
    pauseDuration: 2800,
    hauntedDuration: 2000,
    onKeystroke: handleKeystroke,
  });

  useEffect(() => {
    if (state.phase === "pausing" && hasInteracted.current) {
      playBellSound();
    }
  }, [state.phase, playBellSound]);

useEffect(() => {
  if (state.phase === "erasing" && hasInteracted.current) {
    playEraseSound();
  }
}, [state.displayText.length, playEraseSound]);

  useEffect(() => {
    if (state.phase === "typing" && state.displayText === "" && hasInteracted.current) {
      playPaperLoadSound();
    }
  }, [state.phase, playPaperLoadSound, state.displayText]);

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
  };

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
        <h1 className="font-special-elite text-2xl tracking-[0.2em] mb-1 text-[#f5e8c8]">
          Typewriter Ghost
        </h1>
        <p className="font-special-elite text-sm italic text-[#f5e8c8] opacity-20">
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
              <p className="font-special-elite text-sm italic text-[#f5e8c8] opacity-30">
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

            <div className="flex flex-col items-center gap-1.5 mb-5">
              {keyRows.map((row, i) => (
                <div key={i} className="flex gap-1">
                  {row.map((key) => {
                    const active = pressedKeys.has(key);
                    return (
                      <div
                        key={key}
                        className="w-10 h-10 rounded-sm flex items-center justify-center text-[14px] select-none transition-all duration-75 font-special-elite"
                        style={{
                          background: active
                            ? "linear-gradient(180deg, #2a1e0a, #1a1208)"
                            : "linear-gradient(180deg, #2c2010, #1a1208)",
                          boxShadow: active
                            ? "0 1px 0 #0d0902"
                            : "0 3px 0 #0d0902, 0 5px 6px rgba(0,0,0,0.5)",
                          color: active
                            ? "rgba(230,190,100,0.9)"
                            : "rgba(180,140,60,0.5)",
                          border: "1px solid rgba(100,80,30,0.3)",
                          transform: active
                            ? "translateY(2px)"
                            : "translateY(0)",
                        }}
                      >
                        {key}
                      </div>
                    );
                  })}
                </div>
              ))}

              <div className="inline-flex gap-1 mt-1">
                <div
                  className="mt-0.5 h-8 rounded-sm transition-all duration-75"
                  style={{
                    width: "300px",
                    background: pressedKeys.has(" ")
                      ? "linear-gradient(180deg, #2a1e0a, #1a1208)"
                      : "linear-gradient(180deg, #2c2010, #1a1208)",
                    boxShadow: pressedKeys.has(" ")
                      ? "0 1px 0 #0d0902"
                      : "0 3px 0 #0d0902, 0 5px 6px rgba(0,0,0,0.5)",
                    border: "1px solid rgba(100,80,30,0.3)",
                    transform: pressedKeys.has(" ")
                      ? "translateY(2px)"
                      : "translateY(0)",
                  }}
                />
                <div className="flex gap-1">
                  {(() => {
                    const active = state.phase === "erasing";
                    return (
                      <div
                        className={cn(
                          "flex h-8 mt-0.5 min-w-12 select-none items-center justify-center rounded-sm border px-3 font-special-elite text-[11px] transition-all duration-75",
                          active
                            ? [
                                "translate-y-0.5",
                                "border-[rgba(100,60,60,0.4)]",
                                "text-[rgba(230,100,100,0.9)]",
                              ]
                            : [
                                "translate-y-0",
                                "border-[rgba(100,80,30,0.3)]",
                                "text-[rgba(180,140,60,0.5)]",
                              ],
                        )}
                        style={{
                          background: active
                            ? "linear-gradient(180deg, #2a1e0a, #1a1208)"
                            : "linear-gradient(180deg, #2c2010, #1a1208)",
                          boxShadow: active
                            ? "0 1px 0 #0d0902"
                            : "0 3px 0 #0d0902, 0 5px 6px rgba(0,0,0,0.5)",
                        }}
                      >
                        <BackspaceIcon className="w-4 h-4" />
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>

            <Separator className="mb-4 bg-[#f5e8c8] opacity-10" />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        restart();
                      }}
                      className="h-8 px-3 font-special-elite text-xs transition-opacity border border-[#f5e8c8] opacity-50 text-[#f5e8c8]"
                    >
                      <RotateCcw className="w-3 h-3 mr-1.5" />
                      new page
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Load a new quote</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        skip();
                      }}
                      className="h-8 px-3 font-special-elite text-xs transition-opacity border border-[#f5e8c8] opacity-50 text-[#f5e8c8]"
                    >
                      <SkipForward className="w-3 h-3 mr-1.5" />
                      finish
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Skip to the end</TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-center gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFirstClick();
                        setSoundEnabled(!soundEnabled);
                      }}
                      className="hover:opacity-70 transition-opacity text-[#f5e8c8] opacity-40"
                      size="sm"
                    >
                      {soundEnabled ? (
                        <Volume2 className="w-3.5 h-3.5" />
                      ) : (
                        <VolumeX className="w-3.5 h-3.5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Toggle sound</TooltipContent>
                </Tooltip>
              </div>
            </div>
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
        <p className="font-special-elite text-xs tracking-widest uppercase text-[#f5e8c8] opacity-30">
          {!hasInteracted.current
            ? "click anywhere to enable sound"
            : "the machine remembers everything"}
        </p>
      </div>
    </div>
  );
}

const BackspaceIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M20 5H9C7.89543 5 7 5.89543 7 7L4 12L7 17C7 18.1046 7.89543 19 9 19H20C21.1046 19 22 18.1046 22 17V7C22 5.89543 21.1046 5 20 5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 9L12 15M12 9L16 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);