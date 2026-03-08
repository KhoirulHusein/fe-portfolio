import { useState, useRef, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";

/**
 * Returns scrambled text that resolves character-by-character to the original.
 * Call `scramble()` on hover-in, `reset()` on hover-out.
 */
export function useScramble(original: string) {
  const [text, setText] = useState(original);
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const iterRef = useRef(0);

  const scramble = useCallback(() => {
    if (frameRef.current) clearInterval(frameRef.current);
    iterRef.current = 0;

    frameRef.current = setInterval(() => {
      setText(
        original
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iterRef.current) return original[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iterRef.current += 0.6;

      if (iterRef.current >= original.length) {
        clearInterval(frameRef.current!);
        setText(original);
      }
    }, 28);
  }, [original]);

  const reset = useCallback(() => {
    if (frameRef.current) clearInterval(frameRef.current);
    setText(original);
  }, [original]);

  return { text, scramble, reset };
}
