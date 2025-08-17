import SciFiLanding from "@/components/SciFiLanding"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Experience from "@/components/experience"
import BentoGrid from "@/components/BentoGrid"

export default function Home() {
  return (
    <main className="relative">
      {/* Sci-Fi Landing - Fixed background */}
      <div className="fixed inset-0 z-0">
        <SciFiLanding />
      </div>
      
      {/* Spacer for initial viewport */}
      <div className="h-screen"></div>
      
      {/* Portfolio sections - Overlapping content */}
      <div id="portfolio-sections" className="relative z-10 bg-[#12100f] text-[#ffffff] shadow-2xl border-t border-[rgba(255,78,66,0.3)]">
        <Hero />
        <BentoGrid />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </div>
    </main>
  )
}
