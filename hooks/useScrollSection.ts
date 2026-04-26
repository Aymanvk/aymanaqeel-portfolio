'use client';
import { useState, useEffect } from 'react';

export function useScrollSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "");
  const idsString = sectionIds.join(',');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ids = idsString.split(',').filter(Boolean);
    if (ids.length === 0) return;

    const handleScroll = () => {
      let currentSection = ids[0];
      // Mid-viewport intersection check
      const scrollThreshold = window.scrollY + window.innerHeight * 0.4;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          // offsetTop calculates static DOM flow space natively ignoring sticky overlapping visual bugs
          if (el.offsetTop <= scrollThreshold) {
            currentSection = id;
          }
        }
      }

      setActiveSection((prev) => (prev !== currentSection ? currentSection : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run an initial layout calculation frame shortly after mount
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [idsString]);

  return activeSection;
}
