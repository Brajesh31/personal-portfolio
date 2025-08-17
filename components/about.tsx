"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { User, Code, Database, Globe, Cpu, Rocket, TrendingUp, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function About() {

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
      <section
          id="about"
          className="relative py-20 sm:py-24 md:py-28 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 bg-[#12100f] text-[#ffffff] overflow-hidden"
          aria-labelledby="about-heading"
      >
        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-5"
             style={{
               backgroundImage: `
               linear-gradient(to right, rgba(255, 78, 66, 0.1) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(255, 78, 66, 0.1) 1px, transparent 1px)
             `,
               backgroundSize: '40px 40px'
             }} />

        <div className="container relative z-10">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center mb-16"
          >
            {/* Terminal-style header */}
            <div className="bg-[rgba(0,0,0,0.3)] border border-[rgba(255,78,66,0.35)] p-4 rounded-none mb-8 font-mono text-left max-w-xl mx-auto backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff4e42] to-transparent opacity-60" />
              <div className="flex items-center mb-3">
                <User className="h-4 w-4 text-[#ff4e42] mr-2" />
                <span className="text-[#ff4e42] tracking-widest text-xs">ABOUT.EXE</span>
              </div>
              <div className="text-[#c2b8b2] text-xs sm:text-sm leading-relaxed">
                <span className="text-[#ff4e42]">$</span> cat profile.json<br />
                {'{'}<br />
                &nbsp;&nbsp;"name": "Brajesh Kumar",<br />
                &nbsp;&nbsp;"role": "Full Stack / MERN Stack Developer",<br />
                &nbsp;&nbsp;"focus": ["Modern Web Apps", "AI Integrations", "Scalable Backends"],<br />
                &nbsp;&nbsp;"status": "AVAILABLE"<br />
                {'}'}
              </div>
            </div>

            <h2 id="about-heading" className="text-[#ff4e42] font-mono font-bold uppercase tracking-tight text-[clamp(1.75rem,4vw,2.5rem)] mb-6">
              SYSTEM PROFILE
            </h2>
            <div className="h-px w-24 bg-gradient-to-r from-[#ff4e42] via-[#ffa094] to-[#ff4e42] mx-auto mb-10" />
            <p className="text-[#c2b8b2] font-mono text-[clamp(0.75rem,1.6vw,0.9rem)] tracking-wide uppercase">Engineering robust, scalable full-stack solutions for real-world impact</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55 }}
              >
                <p className="text-[clamp(0.95rem,1.9vw,1.05rem)] leading-relaxed text-[#c2b8b2] mb-5">
                  I architect and build performant, scalable web apps with a focus on user-centric design, seamless integrations, and reliability.
                </p>
                <p className="text-[clamp(0.95rem,1.85vw,1.05rem)] leading-relaxed text-[#c2b8b2] mb-5">
                  My work spans cloud architectures, AI-powered features, modern UI & frontend frameworks, and advanced backend optimizations for real-world products.
                </p>
                <p className="text-[clamp(0.95rem,1.75vw,1.05rem)] leading-relaxed text-[#c2b8b2] mb-8">
                  Current Focus: Full Stack & MERN Stack development, AI/ML integrations, and building future-ready platforms.
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                  {/* Example metrics: update as you wish */}
                  <div className="flex flex-col items-center">
                    <Rocket className="h-4 w-4 text-[#ff4e42]" />
                    <span className="font-mono text-xs text-[#c2b8b2] mt-1">Projects</span>
                    <span className="font-mono text-sm text-[#ff4e42] font-bold">130+</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Code className="h-4 w-4 text-[#ff4e42]" />
                    <span className="font-mono text-xs text-[#c2b8b2] mt-1">Tech Stack</span>
                    <span className="font-mono text-sm text-[#ff4e42] font-bold">20+</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <TrendingUp className="h-4 w-4 text-[#ff4e42]" />
                    <span className="font-mono text-xs text-[#c2b8b2] mt-1">Commits</span>
                    <span className="font-mono text-sm text-[#ff4e42] font-bold">1k+</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Layers className="h-4 w-4 text-[#ff4e42]" />
                    <span className="font-mono text-xs text-[#c2b8b2] mt-1">Domains</span>
                    <span className="font-mono text-sm text-[#ff4e42] font-bold">Multi</span>
                  </div>
                </div>

                {/* Core Stack */}
                <div className="mb-8">
                  <h3 className="text-sm font-mono tracking-widest text-[#ff4e42] mb-3">CORE STACK</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'React.js', 'Node.js', 'MongoDB', 'Express.js', 'Next.js', 'TypeScript', 'PostgreSQL',
                      'Python', 'Docker', 'Jira', 'Framer Motion'
                    ].map(t => (
                        <Badge key={t} variant="secondary" className="bg-[#1c1817] border border-[#332b29] text-[#cfc6c1] hover:bg-[#221e1d] rounded-none font-mono text-[11px] tracking-wide">
                          {t}
                        </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="rounded-none bg-[rgba(255,78,66,0.85)] hover:bg-[rgba(255,78,66,1)] border border-[#ff4e42] text-[#ffffff] uppercase font-mono tracking-wide">
                    <a href="#projects">View Work</a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-none border-[#ff4e42] text-[#ff4e42] hover:bg-[rgba(255,78,66,0.1)] uppercase font-mono tracking-wide">
                    <a href="#contact">Connect</a>
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Right Image / Visual */}
            <div className="relative max-w-md w-full mx-auto order-1 lg:order-2 lg:max-w-lg xl:max-w-xl">
              <div className="aspect-square rounded-2xl overflow-hidden border border-[#312b29]/60 bg-[#141212] shadow-[0_0_0_1px_rgba(255,78,66,0.15),0_12px_40px_-8px_rgba(0,0,0,0.6)]">
                <Image
                    src="/profile-brajesh.jpg"
                    alt="Brajesh Kumar"
                    fill
                    priority={false}
                    sizes="(max-width:480px) 90vw, (max-width:768px) 70vw, (max-width:1024px) 50vw, (max-width:1400px) 560px, 640px"
                    className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(.4,.25,.3,1)] hover:scale-[1.06] will-change-transform"/>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,78,66,0.18),transparent_65%)]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[#ff4e42]/10 mix-blend-overlay" />
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}
