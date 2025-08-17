"use client"

import { motion } from "framer-motion"
import { Mail, Phone, Github, Linkedin, Terminal, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Contact() {
    const contactInfo = [
        {
            icon: <Mail className="h-6 w-6 text-[#ff4e42]" />,
            title: "EMAIL",
            value: "bk117134@gmail.com",
            href: "mailto:bk117134@gmail.com",
        },
        {
            icon: <Phone className="h-6 w-6 text-[#ff4e42]" />,
            title: "PHONE",
            value: "+91 7452971645",
            href: "tel:+917452971645",
        },
        {
            icon: <Github className="h-6 w-6 text-[#ff4e42]" />,
            title: "GITHUB",
            value: "Brajesh31",
            href: "https://github.com/Brajesh31",
        },
        {
            icon: <Linkedin className="h-6 w-6 text-[#ff4e42]" />,
            title: "LINKEDIN",
            value: "Brajesh Kumar",
            href: "https://www.linkedin.com/in/brajesh-kumar-9b58651a8/",
        },
        {
            icon: <Instagram className="h-6 w-6 text-[#ff4e42]" />,
            title: "INSTAGRAM",
            value: "@yourhandle",
            href: "https://www.instagram.com/yourhandle/",
        },
    ]

    return (
        <section id="contact" className="relative py-20 sm:py-24 md:py-28 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 bg-[#12100f] text-[#ffffff] overflow-hidden">
            {/* Grid Overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                 style={{
                     backgroundImage: `
               linear-gradient(to right, rgba(255, 78, 66, 0.1) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(255, 78, 66, 0.1) 1px, transparent 1px)
             `,
                     backgroundSize: '40px 40px'
                 }} />

            <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
                <h2 className="text-[#ff4e42] font-mono font-bold uppercase tracking-tight text-[clamp(1.75rem,4.2vw,2.5rem)] mb-5">
                    SIGNAL LINK
                </h2>
                <p className="text-[#c2b8b2] font-mono text-[clamp(0.8rem,1.9vw,0.95rem)] leading-relaxed">
                    &gt; Reach out for collaboration, consulting, or open-source builds<br />
                    &gt; Always exploring new problem spaces
                </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
                {contactInfo.map((method) => {
                    const isExternal = method.href.startsWith('http');
                    return (
                        <a
                            key={method.title}
                            href={method.href}
                            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            aria-label={`${method.title}: ${method.value}`}
                            title={`${method.title}: ${method.value}`}
                            className="group flex items-center gap-5 rounded-xl border border-[#312b29]/60 bg-[#141212]/60 hover:bg-[#1b1818]/80 p-5 sm:p-6 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#12100f] focus-visible:ring-[#ff4e42]/60"
                        >
                            <div className="w-12 h-12 min-w-12 rounded-lg bg-[#ff4e42]/10 flex items-center justify-center text-[#ff4e42] group-hover:bg-[#ff4e42]/15 transition-colors">
                                {method.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-[clamp(1rem,2.4vw,1.15rem)] font-semibold text-white mb-1 tracking-tight">
                                    {method.title}
                                </h3>
                                <p className="text-[clamp(0.8rem,1.75vw,0.9rem)] text-[#c2b8b2] font-mono line-clamp-2">
                                    {method.value}
                                </p>
                            </div>
                            <span className="text-[#ff4e42] opacity-0 group-hover:opacity-100 text-sm font-mono transition-opacity hidden sm:inline-block">
                {'>>'}
              </span>
                        </a>
                    )
                })}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-16 text-center"
            >
                <Button
                    size="lg"
                    className="rounded-none px-8 py-6 text-lg font-medium bg-[rgba(255,78,66,0.8)] hover:bg-[rgba(255,78,66,1)] border-2 border-[#ff4e42] text-[#ffffff] uppercase font-mono"
                    asChild
                >
                    <a href="mailto:bk117134@gmail.com">
                        INITIATE COLLABORATION
                    </a>
                </Button>
            </motion.div>

            {/* Sci-fi decorative elements */}
            <div className="absolute top-1/4 left-0 w-20 h-px bg-gradient-to-r from-[#ff4e42] to-transparent" />
            <div className="absolute bottom-1/4 right-0 w-20 h-px bg-gradient-to-l from-[#ff4e42] to-transparent" />
        </section>
    )
}
