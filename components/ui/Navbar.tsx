'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Education', href: '/#education' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  // Hide navbar when hero section is in view, re-evaluate on route change
  useEffect(() => {
    let obs: IntersectionObserver | null = null;
    
    const setupObserver = () => {
      const hero = document.getElementById('hero');
      if (hero) {
        obs = new IntersectionObserver(
          ([entry]) => setHeroVisible(entry.isIntersecting),
          { threshold: 0.15 }
        );
        obs.observe(hero);
      } else {
        setHeroVisible(false);
      }
    };

    const timer = setTimeout(setupObserver, 100);

    return () => {
      clearTimeout(timer);
      if (obs) obs.disconnect();
    };
  }, [pathname]);

  // Monitor scroll for dynamic expansion
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-[100] w-full flex justify-center mt-6 px-4 pointer-events-none transition-all duration-500"
        style={{
          opacity: heroVisible ? 0 : 1,
          transform: heroVisible ? 'translateY(-12px)' : 'translateY(0)',
          pointerEvents: heroVisible ? 'none' : 'auto',
        }}
      >

        {/* Floating Pill Navbar — deep forest with blur */}
        <motion.nav
          layout
          initial={{ y: -50, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            maxWidth: scrolled ? '1200px' : '750px'
          }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="pointer-events-auto w-full bg-[#1B2E1F]/85 backdrop-blur-[20px] border border-[#2E4434]/50 rounded-full px-4 md:px-6 py-3 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
        >
          {/* Desktop Left: Sections */}
          <div className="hidden md:flex flex-1 items-center justify-start min-h-[36px]">
            <AnimatePresence mode="wait">
              {scrolled ? (
                // Expanded View (All Links)
                <motion.div
                  key="expanded-links"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10, transition: { duration: 0.1 } }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-1"
                >
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-[#8A9B8E] hover:text-[#F5F0E6] font-body text-[13px] tracking-wide px-3 py-2 rounded-lg transition-colors hover:bg-[#2E4434]/50 whitespace-nowrap"
                    >
                      {link.name}
                    </Link>
                  ))}

                  {/* Highlighted Blog — warm amber */}
                  <Link
                    href="/blog"
                    className="text-[#C8956C] font-body text-[13px] tracking-wide px-4 py-2 rounded-lg bg-[#C8956C]/10 border border-[#C8956C]/20 transition-colors shadow-sm ml-1 hover:bg-[#C8956C]/20 whitespace-nowrap"
                  >
                    Blog
                  </Link>
                </motion.div>
              ) : (
                // Shrunk View ("Sections" Dropdown)
                <motion.div
                  key="shrunk-dropdown"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10, transition: { duration: 0.1 } }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="text-[#8A9B8E] hover:text-[#F5F0E6] font-body text-[13px] tracking-wide px-4 py-2 rounded-full transition-colors hover:bg-[#2E4434]/50 flex items-center gap-2 whitespace-nowrap">
                    Sections
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}>
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-3 w-52 bg-[#1B2E1F]/95 backdrop-blur-xl border border-[#2E4434]/50 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col p-2"
                      >
                        {navLinks.map((link) => (
                          <Link
                            key={link.name}
                            href={link.href}
                            className="text-[#8A9B8E] hover:text-[#F5F0E6] font-body text-[13px] tracking-wide px-4 py-2.5 rounded-xl transition-colors hover:bg-[#2E4434]/50"
                            onClick={() => setDropdownOpen(false)}
                          >
                            {link.name}
                          </Link>
                        ))}
                        <div className="h-[1px] w-full bg-[#2E4434]/50 my-1" />
                        <Link
                          href="/blog"
                          className="text-[#C8956C] hover:text-[#D4A87C] font-body text-[13px] tracking-wide px-4 py-2.5 rounded-xl transition-colors bg-[#C8956C]/10 hover:bg-[#C8956C]/15 ml-1 mr-1 mt-1 flex justify-between items-center group"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Blog
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100 transition-opacity translate-x-0 group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile spacer to balance absolute center */}
          <div className="md:hidden flex-1" />

          {/* Center: Name */}
          <div className="flex shrink-0 justify-center border-l-0 md:border-l border-[#2E4434]/50 md:px-6">
            <Link
              href="/#hero"
              className="font-display text-[17px] font-medium tracking-tight text-[#F5F0E6] flex items-center gap-2 hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#C8956C]">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              Ayman Aqeel
            </Link>
          </div>

          {/* Desktop Right: editorial text links */}
          <div className="hidden md:flex flex-1 justify-end items-center gap-5">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8A9B8E] hover:text-[#C8956C] font-mono text-[12px] tracking-wide transition-colors whitespace-nowrap border-b border-transparent hover:border-[#C8956C] pb-0.5"
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8A9B8E] hover:text-[#C8956C] font-mono text-[12px] tracking-wide transition-colors whitespace-nowrap border-b border-transparent hover:border-[#C8956C] pb-0.5"
            >
              LinkedIn ↗
            </a>
            <a
              href="/Ayman_Aqeel_CV.pdf"
              download
              className="text-[#F5F0E6] hover:text-[#C8956C] font-mono text-[12px] tracking-wide transition-colors whitespace-nowrap border-b border-[#8A9B8E]/40 hover:border-[#C8956C] pb-0.5"
            >
              Download CV ↓
            </a>
          </div>

          {/* Mobile Right: Hamburger Toggle */}
          <div className="md:hidden flex-1 flex justify-end">
            <button
              className="flex flex-col justify-center items-center w-10 h-10 z-[110] relative focus:outline-none bg-[#2E4434]/30 rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              <span
                className={`w-4 h-[1.5px] bg-[#F5F0E6] block transition-all duration-300 ease-out ${mobileMenuOpen ? 'rotate-45 translate-y-[3px]' : '-translate-y-1'
                  }`}
              />
              <span
                className={`w-4 h-[1.5px] bg-[#F5F0E6] block transition-all duration-300 ease-out ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
              />
              <span
                className={`w-4 h-[1.5px] bg-[#F5F0E6] block transition-all duration-300 ease-out ${mobileMenuOpen ? '-rotate-45 -translate-y-[3px]' : 'translate-y-1'
                  }`}
              />
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-[105] bg-[#1B2E1F] flex flex-col items-center justify-center p-6"
          >
            <div className="flex flex-col items-center space-y-6 mt-12 mb-12">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-4xl font-medium text-[#F5F0E6]/70 hover:text-[#F5F0E6] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-4xl font-medium text-[#C8956C] hover:text-[#D4A87C] transition-colors"
              >
                Blog
              </Link>
            </div>

            <div className="flex flex-col items-center gap-4 w-full px-8 max-w-[300px]">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link text-[#F5F0E6] justify-center w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link text-[#F5F0E6] justify-center w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                LinkedIn ↗
              </a>
              <a
                href="/Ayman_Aqeel_CV.pdf"
                download
                className="editorial-link text-[#C8956C] justify-center w-full mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Download CV ↓
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
