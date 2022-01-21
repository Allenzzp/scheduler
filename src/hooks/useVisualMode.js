import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setmode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setmode(newMode);
    if (replace) {
      setHistory(prev => [...prev.slice(0, prev.length - 2), newMode]);
    }
    setHistory((prev => [...prev, newMode]));
  };

  const back = () => {
    if (history.length > 1) {
      setmode(history[history.length - 2]);
      setHistory((prev => [...prev.slice(0, prev.length - 1)]));
    } else {
      return;
    }
  };

  return {
    mode,
    transition,
    back
  };
}