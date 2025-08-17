"use client"

import { motion } from "framer-motion"
import ProjectCard from "@/components/project-card"
import { Folder } from "lucide-react"

export default function Projects() {
  const projects = [
    {
      id: 0,
      title: "Emma – AI Productivity Assistant",
      description:
          "Python-based daily automation assistant, manages scheduling, reminders, and task suggestions.",
      image: "/emma.jpg",
      tags: ["Python", "AI", "Automation"],
      demoUrl: "",
      githubUrl: "https://github.com/Brajesh31/emma-ai-assistant"
    },
    {
      id: 1,
      title: "Thea – AI Therapist",
      description:
          "Empathetic AI therapist for mental health support and human-like conversations.",
      image: "/thea.jpg",
      tags: ["Python", "AI", "NLP"],
      demoUrl: "",
      githubUrl: "https://github.com/Brajesh31/thea-ai-therapist"
    },
    {
      id: 2,
      title: "Ella (AI Companion) Mobile App",
      description:
          "React Native mobile app companion using ML for emotional support and productivity tools.",
      image: "/ella.jpg",
      tags: ["React Native", "ML", "Expo"],
      demoUrl: "",
      githubUrl: "https://github.com/Brajesh31/ella-ai-companion"
    }
    // Add all your other projects here in the same format...
  ]

  return (
      <section id="projects" className="py-20 md:py-32 bg-[#12100f] text-[#ffffff] relative overflow-hidden">
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
              className="max-w-3xl mx-auto text-center mb-14 sm:mb-16"
          >
            {/* Terminal-style header */}
            <div className="bg-[rgba(0,0,0,0.3)] border border-[rgba(255,78,66,0.3)] p-4 rounded-none mb-8 font-mono text-left max-w-md mx-auto backdrop-blur-sm">
              <div className="flex items-center mb-2">
                <Folder className="h-4 w-4 text-[#ff4e42] mr-2" />
                <span className="text-[#ff4e42]">PROJECTS.DIR</span>
              </div>
              <div className="text-[#c2b8b2] text-sm">
                <span className="text-[#ff4e42]">$</span> ls -la projects/<br />
                <span className="text-[#ffffff]">SCANNING...</span>
              </div>
            </div>

            <h2 className="uppercase font-mono text-[#ff4e42] font-bold mb-4 tracking-tight text-[clamp(1.75rem,4.2vw,2.5rem)]">
              PROJECT ARCHIVE
            </h2>
            <div className="h-px w-20 bg-[#ff4e42] mx-auto mb-6"></div>
            <p className="text-[#c2b8b2] font-mono text-[clamp(0.75rem,1.9vw,0.875rem)] leading-relaxed">
              &gt; Recent deployments and builds<br />
              &gt; Focus: Real problem solving + clean code<br />
              &gt; Stack: AI tools + delightful UX
            </p>
          </motion.div>

          <div className="grid gap-6 sm:gap-7 md:gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
            ))}
          </div>
        </div>

        {/* Sci-fi decorative elements */}
        <div className="absolute top-1/3 left-0 w-20 h-px bg-gradient-to-r from-[#ff4e42] to-transparent" />
        <div className="absolute bottom-1/3 right-0 w-20 h-px bg-gradient-to-l from-[#ff4e42] to-transparent" />
      </section>
  )
}
