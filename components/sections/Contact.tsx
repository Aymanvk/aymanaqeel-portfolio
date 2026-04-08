'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '@/components/ui/SectionWrapper';

const steps = [
  { id: 'name', question: "What's your name?", placeholder: "Type your name here..." },
  { id: 'email', question: "What's your email?", placeholder: "hello@world.com" },
  { id: 'subject', question: "What are we talking about?", placeholder: "e.g. A new project, a job, or just a hello..." },
  { id: 'message', question: "Tell me more.", placeholder: "Deep dive into the details..." },
];

export default function Contact() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [direction, setDirection] = useState(1);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Autofocus on step change
  useEffect(() => {
    if (status === 'idle') {
      inputRef.current?.focus();
    }
  }, [step, status]);

  const handleNext = () => {
    const currentKey = steps[step - 1].id as keyof typeof formData;
    if (!formData[currentKey]) return;

    if (step < 4) {
      setDirection(1);
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [steps[step - 1].id]: e.target.value });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (step === 4 && steps[step - 1].id === 'message') {
        handleNext();
      } else {
        e.preventDefault();
        handleNext();
      }
    }
  };

  const resetForm = () => {
    setStep(1);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setStatus('idle');
    setDirection(1);
  };

  return (
    <SectionWrapper 
      id="contact" 
      zIndex={7} 
      fullWidth={true}
      className="bg-[#1B2E1F] overflow-hidden" 
    >
      {/* 
          FORCED SOLID BACKGROUND 
          We use a dedicated div to ensure previous sections (like Education) 
          never bleed through, as reported by verification agents.
      */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{ backgroundColor: '#1B2E1F' }} 
      />

      {/* Mesh overlay */}
      <div className="mesh-overlay opacity-30 pointer-events-none z-[1]" />

      {/* Split Layout Container */}
      <div className="flex w-full h-full relative z-10 flex-col md:flex-row">
        
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div 
              key="success-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col items-center justify-center p-6 text-center z-50 bg-[#1B2E1F]"
            >
              <div className="flex flex-col gap-2 mb-12">
                <h1 className="font-display text-7xl md:text-8xl text-cream font-medium">Got it.</h1>
                <p className="font-serif italic text-[#C8956C] text-xl">I'll get back to you soon.</p>
              </div>

              <div className="w-full max-w-2xl bg-[#162518] border border-[#2E4434] p-8 rounded-sm text-left flex flex-col gap-6">
                <SummaryItem label="NAME" value={formData.name} />
                <SummaryItem label="EMAIL" value={formData.email} />
                <SummaryItem label="SUBJECT" value={formData.subject} />
                <SummaryItem label="MESSAGE" value={formData.message} />
              </div>

              <button onClick={resetForm} className="editorial-link text-xs mt-12 tracking-widest uppercase border-none hover:text-[#C8956C]">
                SEND ANOTHER MESSAGE →
              </button>
            </motion.div>
          ) : (
            <div className="w-full h-full flex flex-col md:flex-row" key="form-layout">
              {/* ── Progress & Counter ── */}
              <div className="absolute top-10 left-0 right-0 z-20 flex flex-col items-center gap-3">
                <div className="font-mono text-[10px] text-[#8A9B8E] tracking-[0.2em] uppercase">
                  {step} / 4
                </div>
                <div className="w-48 h-[1px] bg-[#2E4434] relative">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-[#C8956C]"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(step / 4) * 100}%` }}
                    transition={{ ease: "circOut", duration: 0.6 }}
                  />
                </div>
              </div>

              {/* ── Left Panel (60%) ── */}
              <div 
                className="w-full md:w-[60%] h-full relative flex flex-col justify-center px-8 md:px-24"
                style={{ backgroundColor: '#1B2E1F' }}
              >
                
                {/* Back Arrow */}
                <AnimatePresence>
                  {step > 1 && (
                    <motion.button 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onClick={handleBack}
                      className="absolute top-1/2 left-4 md:left-12 -translate-y-1/2 text-[#8A9B8E] hover:text-cream transition-colors p-2 z-30"
                      aria-label="Back"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" />
                      </svg>
                    </motion.button>
                  )}
                </AnimatePresence>

                <div className="flex flex-col gap-12 w-full max-w-xl">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={step}
                      custom={direction}
                      variants={{
                        initial: (d: number) => ({ y: d > 0 ? 100 : -100, opacity: 0 }),
                        animate: { y: 0, opacity: 1 },
                        exit: (d: number) => ({ y: d > 0 ? -100 : 100, opacity: 0 })
                      }}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ type: "spring", damping: 25, stiffness: 200 }}
                      className="flex flex-col gap-6"
                    >
                      <h2 className="font-display text-4xl md:text-6xl text-cream font-medium leading-tight">
                        {steps[step - 1].question}
                      </h2>

                      <div className="relative group">
                        {step === 4 ? (
                          <textarea
                            ref={inputRef as any}
                            value={formData.message}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            placeholder={steps[step - 1].placeholder}
                            className="w-full bg-transparent border-b border-[#2E4434] group-hover:border-[#8A9B8E] focus:border-[#C8956C] outline-none py-4 text-xl md:text-2xl text-cream font-body transition-colors resize-none placeholder:text-[#8A9B8E]/20"
                            rows={1}
                            autoFocus
                          />
                        ) : (
                          <input
                            ref={inputRef as any}
                            type={step === 2 ? "email" : "text"}
                            value={(formData as any)[steps[step - 1].id]}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            placeholder={steps[step - 1].placeholder}
                            className="w-full bg-transparent border-b border-[#2E4434] group-hover:border-[#8A9B8E] focus:border-[#C8956C] outline-none py-4 text-xl md:text-2xl text-cream font-body transition-colors placeholder:text-[#8A9B8E]/20"
                            autoFocus
                          />
                        )}
                        
                        <button 
                          onClick={handleNext}
                          disabled={!(formData as any)[steps[step - 1].id] || status === 'loading'}
                          className="absolute right-0 bottom-4 text-[#C8956C] disabled:text-[#8A9B8E]/30 transition-all hover:translate-x-1"
                        >
                          {status === 'loading' ? (
                            <div className="w-6 h-6 border-2 border-[#C8956C] border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                            </svg>
                          )}
                        </button>
                      </div>

                      {status === 'error' && (
                        <p className="font-mono text-xs text-red-500 mt-2">
                          Something went wrong. Try <a href="mailto:aymanaqeelvk@gmail.com" className="underline">emailing me directly</a>.
                        </p>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* ── Social Links ── */}
                <div className="absolute bottom-10 flex gap-10">
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="editorial-link text-[10px] opacity-40 hover:opacity-100 italic font-mono uppercase tracking-widest border-none">GITHUB</a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="editorial-link text-[10px] opacity-40 hover:opacity-100 italic font-mono uppercase tracking-widest border-none">LINKEDIN</a>
                </div>
              </div>

              {/* ── Right Panel (40%) ── */}
              <div 
                className="hidden md:flex w-[40%] h-full bg-[#162518] relative flex-col justify-center px-12 border-l border-[#2E4434]/30"
                style={{ backgroundColor: '#162518' }}
              >
                <div className="flex flex-col gap-10 overflow-y-auto py-20 max-h-full no-scrollbar">
                  <AnimatePresence>
                    {formData.name && <SummaryItem key="sum-name" label="NAME" value={formData.name} delay={0.1} />}
                    {formData.email && <SummaryItem key="sum-email" label="EMAIL" value={formData.email} delay={0.1} />}
                    {formData.subject && <SummaryItem key="sum-subject" label="SUBJECT" value={formData.subject} delay={0.1} />}
                    {formData.message && <SummaryItem key="sum-message" label="MESSAGE" value={formData.message} delay={0.1} />}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </SectionWrapper>
  );
}

function SummaryItem({ label, value, delay = 0 }: { label: string, value: string, delay?: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col gap-2"
    >
      <span className="font-mono text-[10px] text-[#C8956C] tracking-[0.2em] uppercase">{label}</span>
      <span className="font-display text-2xl text-cream leading-tight break-words">{value}</span>
    </motion.div>
  );
}
