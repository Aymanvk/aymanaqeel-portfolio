'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SplitRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function SplitReveal({ text, className = "", delay = 0 }: SplitRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  // Split manually by words
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const child = {
    visible: { 
      opacity: 1, 
      y: 0, 
      rotate: 0,
      transition: { type: "spring", damping: 20, stiffness: 80, mass: 0.5 } 
    },
    hidden: { 
      opacity: 0, 
      y: 40, 
      rotate: 2,
      transition: { type: "spring", damping: 20, stiffness: 80 } 
    },
  };

  return (
    <motion.h2 
      ref={ref}
      variants={container}
      className={`flex flex-wrap ${className}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, wordIndex) => (
        <motion.span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em] pb-[0.15em] -mb-[0.15em]">
          {word.split('').map((char, charIndex) => (
            <motion.span 
              key={`${wordIndex}-${charIndex}`}
              variants={child}
              className="inline-block origin-bottom-left"
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </motion.h2>
  );
}
