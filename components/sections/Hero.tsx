'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Geometric AA Logo ──────────────────────────────────── */
function AALogo({ size = 44 }: { size?: number }) {
  const h = size * 0.85;
  return (
    <svg width={size} height={h} viewBox="0 0 52 44" fill="none" aria-hidden="true">
      {/* First A — cream */}
      <path d="M6 40 L20 6 L34 40" stroke="#F5F0E6" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="10" y1="28" x2="30" y2="28" stroke="#F5F0E6" strokeWidth="2.8" strokeLinecap="round" />
      {/* Second A — amber, offset right */}
      <path d="M18 40 L32 6 L46 40" stroke="#C8956C" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="22" y1="28" x2="42" y2="28" stroke="#C8956C" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Live IST Clock ─────────────────────────────────────── */
function LiveClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date())
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <>{time || '--:--:--'} IST</>;
}

/* ─── Hero ───────────────────────────────────────────────── */
export default function Hero() {
  const heroRef   = useRef<HTMLElement>(null);
  const topRef    = useRef<HTMLDivElement>(null);
  const clockRef  = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const pillRef   = useRef<HTMLDivElement>(null);

  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const words = [
    'web apps.',
    'REST APIs.',
    'full-stack products.',
    'clean interfaces.',
    'things that ship.'
  ];

  /* Typewriter Effect */
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    const currentWord = words[wordIndex];

    if (isDeleting) {
      if (text === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      } else {
        timeout = setTimeout(() => {
          setText(currentWord.substring(0, text.length - 1));
        }, 30);
      }
    } else {
      if (text === currentWord) {
        setIsPaused(true);
      } else {
        timeout = setTimeout(() => {
          setText(currentWord.substring(0, text.length + 1));
        }, 60);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, isPaused, wordIndex]);

  /* GSAP entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([topRef.current, clockRef.current, centerRef.current, pillRef.current], {
        opacity: 0,
      });

      const tl = gsap.timeline({ delay: 0.1, defaults: { ease: 'power3.out' } });

      tl.to([topRef.current, clockRef.current], {
        opacity: 1, y: 0, duration: 0.9, stagger: 0.06,
        from: { y: -18 },
      })
      .to(centerRef.current, {
        opacity: 1, y: 0, duration: 1, from: { y: 52 },
      }, '-=0.5')
      .to(pillRef.current, {
        opacity: 1, y: 0, duration: 0.7, from: { y: 20 },
      }, '-=0.4');

    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      data-section="hero"
      className="stack-section relative w-full flex flex-col overflow-hidden"
      style={{ backgroundColor: '#1B2E1F', zIndex: 1 }}
    >
      {/* Dual radial mesh overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 15% 55%, rgba(200,149,108,0.09) 0%, transparent 68%),
            radial-gradient(ellipse 55% 65% at 82% 25%, rgba(245,240,230,0.05) 0%, transparent 70%)
          `,
          zIndex: 0,
        }}
      />

      {/* ── Top bar ── */}
      <div className="relative z-10 flex items-center justify-between px-8 md:px-12 pt-8 md:pt-10">

        {/* Logo + Name block */}
        <div ref={topRef} className="flex items-center gap-3.5" style={{ opacity: 0, transform: 'translateY(-18px)' }}>
          <AALogo size={42} />
          <div className="flex flex-col gap-0.5">
            <span
              className="text-[#F5F0E6] uppercase leading-none tracking-[0.12em]"
              style={{ fontFamily: 'Tanker, sans-serif', fontSize: 'clamp(1rem, 1.6vw, 1.35rem)' }}
            >
              Ayman Aqeel
            </span>
            <span
              className="text-[#C8956C] uppercase tracking-[0.22em] leading-none"
              style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.62rem' }}
            >
              Full-Stack Developer
            </span>
          </div>
        </div>

        {/* Live clock */}
        <div ref={clockRef} className="text-right flex flex-col gap-1.5" style={{ opacity: 0, transform: 'translateY(-18px)' }}>
          <div
            className="text-[#F5F0E6]/35 uppercase tracking-widest leading-none"
            style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem' }}
          >
            Malappuram, Kerala
          </div>
          <div
            className="text-[#C8956C] tabular-nums leading-none"
            style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.9rem' }}
          >
            <LiveClock />
          </div>
        </div>
      </div>

      {/* ── Center headline ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div
          ref={centerRef}
          className="flex flex-row items-center justify-center flex-wrap"
          style={{
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontWeight: 500,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            opacity: 0,
            transform: 'translateY(52px)',
            lineHeight: 1.1,
          }}
        >
          <span className="text-[#F5F0E6] whitespace-pre">I build </span>
          <span className="text-[#C8956C] whitespace-pre">
            {text}
            <span
              className="text-[#C8956C] opacity-100 font-light"
              style={{
                animation: 'pulse-cursor 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            >
              |
            </span>
          </span>
          <style>{`
            @keyframes pulse-cursor {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
          `}</style>
        </div>
      </div>

      {/* ── Bottom floating navbar ── */}
      <div
        ref={pillRef}
        className="relative z-10 flex justify-center pb-10 md:pb-12"
        style={{ opacity: 0, transform: 'translateY(20px)' }}
      >
        <nav
          className="flex items-center gap-1 px-3 py-2"
          style={{
            backgroundColor: 'rgba(245,240,230,0.1)',
            border: '1px solid rgba(245,240,230,0.28)',
            borderRadius: '8px',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
          }}
        >
          {/* Small AA logo */}
          <div className="px-1.5">
            <AALogo size={22} />
          </div>

          {/* Divider */}
          <div className="w-px h-5 mx-1" style={{ backgroundColor: 'rgba(245,240,230,0.2)' }} />

          {/* Nav links */}
          {[
            { label: 'About',    href: '/#about' },
            { label: 'Projects', href: '/#projects' },
            { label: 'Contact',  href: '/#contact' },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 uppercase transition-opacity hover:opacity-80"
              style={{
                color: '#F5F0E6',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.82rem',
                letterSpacing: '0.12em',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                textDecorationColor: 'rgba(245,240,230,0.3)',
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* CV Link */}
          <a
            href="/Ayman_Aqeel_CV.pdf"
            download
            className="px-3 py-1.5 uppercase transition-opacity hover:opacity-80"
            style={{
              color: '#C8956C',
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.82rem',
              letterSpacing: '0.1em',
              textDecoration: 'none',
            }}
          >
            CV
          </a>

          {/* Divider */}
          <div className="w-px h-5 mx-1" style={{ backgroundColor: 'rgba(245,240,230,0.2)' }} />

          {/* Blog amber badge */}
          <Link
            href="/blog"
            className="px-4 py-1.5 font-medium transition-opacity hover:opacity-85"
            style={{
              backgroundColor: '#C8956C',
              color: '#1B2E1F',
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '0.82rem',
              borderRadius: '4px',
            }}
          >
            Blog
          </Link>
        </nav>
      </div>
    </section>
  );
}
