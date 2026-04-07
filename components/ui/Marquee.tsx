'use client';
import { useRef } from "react";
import { motion, useScroll, useVelocity, useTransform, useSpring, useAnimationFrame } from "framer-motion";

export default function Marquee({ text }: { text: string }) {
  const content = `${text} \u00A0\u00A0 `.repeat(4);
  const baseX = useRef(0);
  
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 8], { clamp: false });
  
  useAnimationFrame((t, delta) => {
    let moveBy = -0.04 * (delta / 16); 
    
    const velocityAdded = velocityFactor.get();
    
    if (velocityAdded < 0) {
       moveBy += velocityAdded * (delta / 16);
    } else if (velocityAdded > 0) {
       moveBy -= velocityAdded * (delta / 16);
    }
    
    baseX.current += moveBy;
    
    if (baseX.current <= -50) {
      baseX.current = 0;
    } else if (baseX.current > 0) {
      baseX.current = -50;
    }
  });

  return (
    <div className="w-full overflow-hidden whitespace-nowrap py-6 border-y border-[#1B2E1F]/8 mt-12 bg-transparent pointer-events-none">
      <motion.div
        className="inline-block font-display text-2xl md:text-4xl font-medium tracking-widest text-[#1B2E1F] opacity-[0.10] uppercase"
        style={{ x: useTransform(() => `${baseX.current}%`) }}
      >
        <span>{content}</span>
      </motion.div>
    </div>
  );
}
