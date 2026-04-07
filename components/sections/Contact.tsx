'use client';
import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SplitReveal from "@/components/ui/SplitReveal";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <SectionWrapper id="contact" zIndex={7} className="flex-col justify-center bg-[#1B2E1F] relative">
      {/* Mesh overlay */}
      <div className="mesh-overlay" />

      <div className="w-full flex-1 flex flex-col md:flex-row items-center justify-between gap-16 py-20 relative z-10">
        
        {/* Left Typography */}
        <div className="w-full md:w-1/2 flex flex-col" data-aos="fade-right">
          <h3 className="font-serif italic text-[#C8956C] text-lg tracking-wide mb-4">
            Get in Touch
          </h3>
          <SplitReveal 
            text="LET'S BUILD IT." 
            className="font-display text-[var(--text-display)] font-medium leading-[0.9] mb-6" 
          />
          <p className="font-body text-[#8A9B8E] text-lg max-w-md leading-[1.85]">
            Whether it's an ambitious startup idea, a complex problem, or just a ping to say hi — my inbox is always open.
          </p>
          <a href="mailto:ayman@example.com" className="editorial-link mt-8 w-max">
            ayman@example.com <span className="text-base leading-none">→</span>
          </a>
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 max-w-lg" data-aos="fade-left">
          {status === "success" ? (
            <div className="bg-[#243328] p-10 border border-[#2E4434] flex flex-col items-center justify-center text-center gap-4 h-[400px]">
               <div className="w-16 h-16 rounded-full bg-[#C8956C]/10 flex items-center justify-center text-[#C8956C] text-3xl mb-2">✓</div>
               <h4 className="font-display text-2xl font-medium text-[#F5F0E6]">Message Received.</h4>
               <p className="text-[#8A9B8E] font-body text-sm">I'll get back to you within 24 hours.</p>
               <button onClick={() => setStatus("idle")} className="mt-4 editorial-link text-[11px]">Send another →</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[11px] text-[#8A9B8E] uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required 
                  className="w-full bg-transparent border-b border-[#2E4434] focus:border-[#C8956C] outline-none py-3 text-[#F5F0E6] font-body text-base transition-colors"
                  placeholder="hello@world.com"
                />
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <label className="font-mono text-[11px] text-[#8A9B8E] uppercase tracking-widest">The Project / Message</label>
                <textarea 
                  name="message"
                  required 
                  rows={4}
                  className="w-full bg-transparent border-b border-[#2E4434] focus:border-[#C8956C] outline-none py-3 text-[#F5F0E6] font-body text-base transition-colors resize-none"
                  placeholder="Tell me what you're thinking..."
                />
              </div>

              <button 
                type="submit" 
                disabled={status === "loading"}
                className="mt-8 editorial-link w-max disabled:opacity-50"
              >
                {status === "loading" ? "SENDING..." : "PULL THE TRIGGER →"}
              </button>

              {status === "error" && (
                <p className="text-red-400 font-mono text-xs mt-2">Error sending message. Please try again.</p>
              )}
            </form>
          )}
        </div>

      </div>
      
      {/* Background massive ambient text */}
      <h1 className="absolute bottom-[-5%] right-[-5%] font-display font-medium text-[25vw] text-[#F5F0E6] opacity-[0.02] pointer-events-none select-none overflow-hidden leading-none z-0">
        AYMAN
      </h1>
    </SectionWrapper>
  );
}
