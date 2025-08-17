"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Terminal } from "lucide-react"
import { SocialLinks } from "./SocialLinks"

export default function Hero() {
  return (
      <section id="home" className="relative pt-20 sm:pt-24 md:pt-32 pb-14 md:pb-20 overflow-hidden bg-[#12100f] text-[#ffffff]">
        {/* Space Background */}
        <div className="absolute inset-0 bg-[#12100f] opacity-90" />

        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-10"
             style={{
               backgroundImage: `
               linear-gradient(to right, rgba(255, 78, 66, 0.1) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(255, 78, 66, 0.1) 1px, transparent 1px)
             `,
               backgroundSize: '40px 40px'
             }} />

        <div className="container grid md:grid-cols-2 gap-10 md:gap-8 items-center relative z-10">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left order-2 md:order-1"
          >
            {/* Terminal-style intro */}
            <div className="bg-[rgba(0,0,0,0.35)] border border-[rgba(255,78,66,0.35)] p-3 sm:p-4 rounded-lg mb-6 font-mono text-xs sm:text-sm backdrop-blur-sm">
              <div className="flex items-center mb-2">
                <Terminal className="h-4 w-4 text-[#ff4e42] mr-2" />
                <span className="text-[#ff4e42]">SYSTEM.INIT</span>
              </div>
              <div className="text-[#c2b8b2]">
                <span className="text-[#ff4e42]">$</span> whoami<br />
                <span className="text-[#ffffff]">BRAJESH.KUMAR</span><br />
                <span className="text-[#ff4e42]">$</span> occupation<br />
                <span className="text-[#ffffff]">FULL_STACK_DEVELOPER & MERN_STACK_SPECIALIST</span>
              </div>
            </div>

            <h1 className="font-bold tracking-tight mb-5 md:mb-6 uppercase font-mono leading-[1.05] text-[clamp(1.65rem,4.2vw,3.5rem)]">
              <span className="text-[#ff4e42]">BRAJESH KUMAR</span>
              <br />
              <span className="text-[#ffffff]">FULL STACK</span>
              <br />
              <span className="text-[#c2b8b2]">WEB DEVELOPER</span>
            </h1>

            <p className="text-[#c2b8b2] mb-7 md:mb-8 max-w-2xl mx-auto md:mx-0 font-mono leading-relaxed text-[clamp(0.9rem,1.85vw,1.15rem)]">
              &gt; Building robust, scalable & innovative apps<br />
              &gt; Specializing in MERN stack, Next.js, and AI/Cloud integrations<br />
              &gt; Status: <span className="text-[#ff4e42]">AVAILABLE FOR HIRE</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-3 md:gap-4 mb-9 md:mb-12 w-full">
              <Button asChild size="lg" className="rounded-none bg-[rgba(255,78,66,0.85)] hover:bg-[rgba(255,78,66,1)] border border-[#ff4e42] text-[#ffffff] uppercase font-mono w-full sm:w-auto min-h-[48px] px-6 text-sm tracking-wide">
                <Link href="#projects">
                  VIEW PROJECTS <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none border-[#ff4e42] text-[#ff4e42] hover:bg-[rgba(255,78,66,0.1)] uppercase font-mono w-full sm:w-auto min-h-[48px] px-6 text-sm tracking-wide">
                <Link href="#contact">CONTACT ME</Link>
              </Button>
            </div>
            <SocialLinks />
          </motion.div>

          <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="order-1 md:order-last mb-6 md:mb-0"
          >
            <div className="bg-[rgba(0,0,0,0.35)] border-2 border-[rgba(255,78,66,0.55)] rounded-none p-4 backdrop-blur-sm shadow-lg shadow-[rgba(255,78,66,0.18)]">
              <div className="w-full aspect-square max-w-[380px] sm:max-w-[420px] mx-auto flex items-center justify-center">
                <Image
                    src="/profile-brajesh.jpg"
                    alt="Brajesh Kumar Portrait"
                    width={420}
                    height={420}
                    className="object-contain w-full h-full filter brightness-110 contrast-110"
                    priority
                    sizes="(max-width:640px) 280px, (max-width:768px) 320px, (max-width:1024px) 380px, 420px"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sci-fi decorative elements */}
        <div className="absolute -bottom-24 -left-24 w-48 sm:w-72 h-48 sm:h-72 bg-[rgba(255,78,66,0.1)] rounded-full blur-3xl" />
        <div className="absolute -top-24 -right-24 w-48 sm:w-72 h-48 sm:h-72 bg-[rgba(255,78,66,0.1)] rounded-full blur-3xl" />

        {/* Scanner lines */}
        <div className="absolute left-0 top-1/2 w-20 h-px bg-gradient-to-r from-[#ff4e42] to-transparent" />
        <div className="absolute right-0 top-1/2 w-20 h-px bg-gradient-to-l from-[#ff4e42] to-transparent" />
      </section>
  )
}
