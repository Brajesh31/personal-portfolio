import Link from "next/link"
import { Mail, Terminal } from "lucide-react"
import { SocialLinks } from "./SocialLinks"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="py-8 sm:py-12 border-t border-[rgba(255,78,66,0.3)] bg-[#12100f] text-[#ffffff] relative overflow-hidden">
            {/* Grid Overlay */}
            <div className="absolute inset-0 opacity-5"
                 style={{
                     backgroundImage: `
               linear-gradient(to right, rgba(255, 78, 66, 0.1) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(255, 78, 66, 0.1) 1px, transparent 1px)
             `,
                     backgroundSize: '40px 40px'
                 }} />

            <div className="container px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <Link href="/" className="text-xl font-bold font-mono uppercase">
                            BRAJESH<span className="text-[#ff4e42]">.</span>DEV
                        </Link>
                        <p className="text-xs sm:text-sm text-[#c2b8b2] mt-2 font-mono">
                            &gt; Building clean code & delightful digital experiences
                        </p>
                    </div>

                    <div className="flex items-center space-x-4 sm:space-x-6">
                        <SocialLinks />
                        <Link
                            href="mailto:bk117134@gmail.com"
                            aria-label="Email"
                            className="text-[#c2b8b2] hover:text-[#ff4e42] transition-colors"
                        >
                            <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>
                    </div>
                </div>

                <div className="text-center text-xs sm:text-sm text-[#c2b8b2] mt-6 font-mono">
                    <div className="bg-[rgba(0,0,0,0.3)] border border-[rgba(255,78,66,0.3)] p-2 rounded-none inline-block backdrop-blur-sm">
                        <Terminal className="h-3 w-3 inline mr-2 text-[#ff4e42]" />
                        © {currentYear} BRAJESH KUMAR | ALL RIGHTS RESERVED | STATUS: ONLINE
                    </div>
                </div>
            </div>

            {/* Sci-fi decorative elements */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff4e42] to-transparent" />
        </footer>
    )
}
