"use client";

import { useCallback } from "react";
import { getRandomQuote, Quote } from "@/lib/quotes";
import { fetchBookOpener, BOOK_IDS } from "@/lib/gutenberg";

export function useGutenbergQuote() {
  const fetchRandomQuote = useCallback(async (): Promise<Quote> => {
    const shuffled = [...BOOK_IDS].sort(() => 0.5 - Math.random());

    for (const id of shuffled.slice(0, 3)) {
      try {
        const result = await fetchBookOpener(id);
        if (result?.text) {
          return result;
        }
      } catch (e) {
        console.warn(`Failed to fetch book ${id}`, e);
      }
    }

    return getRandomQuote();
  }, []);

  return { fetchRandomQuote };
}
