import SectionWrapper from "@/components/ui/SectionWrapper";
import Image from "next/image";
import Marquee from "@/components/ui/Marquee";
import SplitReveal from "@/components/ui/SplitReveal";

const chips = [
  "Night owl", 
  "Builds at 2am", 
  "Coffee-powered", 
  "MERN enthusiast", 
  "Overthinks UX", 
  "Ships anyway"
];

export default function About() {
  return (
    <SectionWrapper id="about" zIndex={2} className="flex-col justify-center bg-[#F5F0E6] text-[#1B2E1F]">
      <div className="w-full flex-1 flex flex-col items-center justify-center pt-24 pb-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-5 relative w-full aspect-square md:aspect-[4/5] flex items-center justify-center">
            {/* The Polygon Image Wrapper */}
            <div 
              className="relative w-[80%] h-[80%] max-w-[320px] md:max-w-[400px] overflow-hidden -rotate-2 bg-[#EDE8DE] border border-[#1B2E1F]/10"
              style={{ clipPath: 'polygon(10% 0, 100% 5%, 90% 100%, 0 95%)' }}
            >
              <div className="absolute inset-0 bg-[#1B2E1F]/5 animate-pulse" />
              {/* User will add their `<Image src="/me.jpg" ... />` here later */}
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute top-[10%] left-[5%] font-mono text-[#C8956C] text-xl rotate-[15deg] opacity-40">
              {'{  }'}
            </div>
            <div className="absolute bottom-[20%] right-[10%] font-mono text-[#1B2E1F]/30 text-xl">
              {'>_'}
            </div>
            <div className="absolute top-[30%] right-[5%] w-3 h-3 border border-[#1B2E1F]/20 rotate-45" />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 flex flex-col" data-aos="fade-left">
            <h3 className="font-serif italic text-[#C8956C] text-lg tracking-wide mb-4">
              About
            </h3>
            <SplitReveal 
              text="I build things that don't bore me." 
              className="font-display text-[var(--text-display)] font-medium leading-tight mb-2 text-[#1B2E1F]" 
            />
            
            <p className="font-body text-base text-[#1B2E1F]/80 mt-6 mb-8 max-w-xl leading-[1.85]">
              Full-Stack Developer based in Kerala, India. I live at the intersection of 
              clean code and bold design — building products that feel as good as they work. 
              Currently studying BCA+MCA Integrated at Rajagiri College of Social Sciences.
            </p>

            <div className="flex flex-wrap items-center gap-0 font-mono text-[13px] text-[#1B2E1F]/50">
              {chips.map((chip, idx) => (
                <span key={chip}>
                  {chip}
                  {idx < chips.length - 1 && <span className="mx-2">·</span>}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
      
      {/* Absolute Bottom Marquee */}
      <div className="w-full absolute bottom-8 left-0 hidden md:block">
        <Marquee text="FULL-STACK DEV  ·  NEXT.JS  ·  REACT  ·  NODE.JS  ·  SUPABASE  ·  OPEN TO WORK  ·  MERN STACK  ·  CREATIVE  ·  MALAPPURAM, KERALA  · " />
      </div>
    </SectionWrapper>
  );
}
