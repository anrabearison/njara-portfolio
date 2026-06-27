import { useState, useEffect } from "react";

export function useTypewriter(words: string[]) {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState("");
  const [del, setDel] = useState(false);

  // Reset when words list changes (e.g. language switch)
  useEffect(() => {
    setIdx(0);
    setSub("");
    setDel(false);
  }, [words]);

  useEffect(() => {
    const word = words[idx] ?? "";
    if (!del && sub === word) {
      const t = setTimeout(() => setDel(true), 1600);
      return () => clearTimeout(t);
    }
    if (del && sub === "") {
      setDel(false);
      setIdx((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(
      () => {
        setSub((s) => (del ? word.slice(0, s.length - 1) : word.slice(0, s.length + 1)));
      },
      del ? 40 : 80,
    );
    return () => clearTimeout(t);
  }, [sub, del, idx, words]);

  return sub;
}
