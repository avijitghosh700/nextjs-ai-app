'use client";';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOADING_STAGES = [
  { text: "Thinking…", delay: 0 },
  { text: "Analyzing your question…", delay: 800 },
  { text: "Gathering relevant information…", delay: 1800 },
  { text: "Crafting a thoughtful reply…", delay: 3200 },
];

export const ChatLoadingIndicator = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = LOADING_STAGES.map((s, i) => setTimeout(() => setStage(i), s.delay));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex items-center gap-3 py-2 px-4">
      {/* Animated dots */}
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-zinc-400"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Stage text with smooth cross-fade */}
      <AnimatePresence mode="wait">
        <motion.span
          key={stage}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="text-sm text-zinc-500"
        >
          {LOADING_STAGES[stage].text}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
