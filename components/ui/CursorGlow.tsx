'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isImageHovering, setIsImageHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' || 
        target.closest('a') || 
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }

      if (target.tagName.toLowerCase() === 'img') {
        setIsImageHovering(true);
      } else {
        setIsImageHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isHovering || isImageHovering ? 0 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center font-mono text-[8px] font-bold tracking-widest text-accent"
        style={{ border: '1px solid var(--accent)' }}
        animate={{
          x: mousePosition.x - (isHovering || isImageHovering ? 24 : 16),
          y: mousePosition.y - (isHovering || isImageHovering ? 24 : 16),
          width: isHovering || isImageHovering ? 48 : 32,
          height: isHovering || isImageHovering ? 48 : 32,
          backgroundColor: isImageHovering ? 'rgba(8,8,8,0.5)' : 'transparent',
          backdropFilter: isImageHovering ? 'blur(4px)' : 'blur(0px)'
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.15 }}
      >
        {isImageHovering && <span className="opacity-100 mt-[1px]">VIEW</span>}
      </motion.div>
    </>
  );
}
