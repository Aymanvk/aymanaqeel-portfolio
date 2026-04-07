import SectionWrapper from "@/components/ui/SectionWrapper";
import SplitReveal from "@/components/ui/SplitReveal";

const timeline = [
  {
    year: "2023 - Present",
    title: "BCA + MCA Integrated",
    institution: "Rajagiri College of Social Sciences, Kochi",
    desc: "Focusing on core computer science fundamentals, data structures, and advanced full-stack development methodologies."
  },
  {
    year: "2021 - 2023",
    title: "Higher Secondary (Computer Science)",
    institution: "GVHSS Makkaraparamba, Malappuram",
    desc: "Secured 91%. Laid the foundation for logic building and algorithmic thinking through rigorous C++ training."
  },
  {
    year: "2021",
    title: "High School (SSLC)",
    institution: "IUHSS Parappur, Malappuram",
    desc: "Graduated with full A+ (100%). Discovered a profound interest in mathematics and early programming logics."
  }
];

export default function Education() {
  return (
    <SectionWrapper id="education" zIndex={6} className="flex-col justify-center bg-[#EDE8DE] text-[#1B2E1F]">
      <div className="w-full flex-1 flex flex-col justify-center py-20">
        
        <div className="mb-16" data-aos="fade-up">
          <h3 className="font-serif italic text-[#C8956C] text-lg tracking-wide mb-4">
            Academic Journey
          </h3>
          <SplitReveal 
            text="Education." 
            className="font-display text-[var(--text-display)] font-medium leading-tight text-[#1B2E1F]" 
          />
        </div>

        <div className="relative border-l border-[#1B2E1F]/20 ml-4 md:ml-6">
          {timeline.map((item, idx) => (
            <div 
              key={idx} 
              className="mb-12 ml-8 md:ml-12 relative"
              data-aos="fade-up"
              data-aos-delay={idx * 150}
            >
              {/* Timeline dot — warm amber, no glow */}
              <span className="absolute -left-[37px] md:-left-[53px] top-1 w-3 h-3 bg-[#C8956C] rounded-full" />
              
              <div className="flex flex-col">
                <span className="font-mono text-[#C8956C] mb-2 text-sm md:text-base">
                  {item.year}
                </span>
                <h4 className="font-display text-xl md:text-3xl font-medium text-[#1B2E1F] mb-1">
                  {item.title}
                </h4>
                <span className="font-serif italic text-[#1B2E1F]/60 text-sm md:text-base mb-4 block">
                  {item.institution}
                </span>
                <p className="font-body text-[#1B2E1F]/70 text-sm md:text-base max-w-2xl leading-[1.85]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
}
