import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setmode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setmode(newMode);
    if (replace) {
      setHistory([...history.slice(0, history.length - 1), newMode]);
    } else {
      setHistory(([...history, newMode]));
    }
  };

  const back = () => {
    if (history.length > 1) {
      setmode(history[history.length - 2]);
      setHistory(([...history.slice(0, history.length - 1)]));
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