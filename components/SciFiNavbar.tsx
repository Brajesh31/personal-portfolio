'use client';

import React, { useEffect, useState, useCallback } from 'react';

interface SciFiNavbarProps {
  timestamp: string;
}

export function SciFiNavbar({ timestamp }: SciFiNavbarProps) {
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Scrollspy logic
  const handleScroll = useCallback(() => {
    const scrollPos = window.scrollY + window.innerHeight * 0.3; // bias toward upcoming section
    let current = 'home';
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) {
        const top = el.offsetTop;
        if (scrollPos >= top) current = s.id;
      }
    }
    setActive(current);
    setScrolled(window.scrollY > 12);
  }, [sections]);

  useEffect(() => {
    setMounted(true);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  const scrollTo = (id: string) => {
    if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
      <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-2 sm:px-4 ${
              scrolled ? 'backdrop-blur-xl bg-[#0f0d0c]/70 border-b border-[#ff4e42]/20 shadow-[0_4px_20px_-4px_rgba(255,78,66,0.25)]' : 'bg-transparent'
          }`}
          role="navigation"
          aria-label="Primary"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full flex justify-center overflow-hidden">
          <div className={`w-[680px] h-[680px] rounded-full bg-radial from-[#ff4e42]/7 via-transparent to-transparent blur-3xl translate-y-[-60%] transition-opacity duration-700 ${
              scrolled ? 'opacity-40' : 'opacity-0'
          } pointer-events-none`} />
        </div>
        <div className="max-w-7xl mx-auto flex items-center gap-3 sm:gap-4 py-2 sm:py-3 relative">
          {/* Brand */}
          <button
              onClick={() => scrollTo('home')}
              className="group flex items-center gap-2 pr-2 sm:pr-4 border-r border-white/10"
              aria-label="Scroll to top"
          >
            <div className="relative">
              <div className="w-8 h-8 sm:w-9 sm:h-9 border border-[#ff4e42]/50 rounded-lg flex items-center justify-center overflow-hidden shadow-inner shadow-black/40 group-hover:border-[#ff4e42] transition-colors">
                <span className="text-[#ff4e42] font-bold text-sm">BK</span>
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff4e42] to-transparent opacity-60 animate-pulse" />
              </div>
            </div>
            <div className="hidden xs:flex flex-col leading-none text-left">
              <span className="text-white font-semibold text-[11px] sm:text-xs tracking-wide">Brajesh Kumar</span>
              <span className="text-gray-400 text-[9px] sm:text-[10px] font-mono">Full Stack Dev</span>
            </div>
          </button>

          {/* Nav items container */}
          <div className="flex-1 min-w-0">
            <div className="relative">
              <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-[#ff4e42]/30 scrollbar-track-transparent gap-1 sm:gap-2 px-1 py-1 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                {sections.map(s => {
                  const isActive = s.id === active;
                  return (
                      <button
                          key={s.id}
                          onClick={() => scrollTo(s.id)}
                          className={`relative px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-medium rounded-md transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#ff4e42]/60 min-h-[36px] tracking-wide ${
                              isActive
                                  ? 'text-white bg-[#ff4e42] shadow shadow-[#ff4e42]/30'
                                  : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                          aria-current={isActive ? 'page' : undefined}
                      >
                    <span className="relative z-10 flex items-center gap-1">
                      {isActive && (
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white shadow shadow-white/60 animate-pulse" />
                      )}
                      {s.label}
                    </span>
                        {!isActive && (
                            <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-[#ff4e42]/0 via-[#ff4e42]/10 to-[#ff4e42]/0" />
                        )}
                      </button>
                  );
                })}
              </div>
              {/* Animated underline bar */}
              {mounted && (
                  <div
                      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#ff4e42] via-[#ff947f] to-[#ff4e42] rounded-full transition-all duration-500"
                      style={{
                        width: `${100 / sections.length}%`,
                        transform: `translateX(${sections.findIndex(s => s.id === active) * 100}%)`
                      }}
                  />
              )}
            </div>
          </div>

          {/* Right status cluster */}
          <div className="flex items-center gap-3 pl-2 sm:pl-4">
            <div className="hidden md:flex flex-col text-right leading-tight pr-2">
              <span className="text-[10px] text-gray-400 font-mono tracking-widest">STATUS</span>
              <span className="text-[11px] text-[#ff4e42] font-mono">ONLINE</span>
            </div>
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff4e42] shadow-[0_0_8px_2px_rgba(255,78,66,0.55)] animate-pulse" />
              <div className="absolute inset-0 rounded-full animate-ping bg-[#ff4e42]/30" />
            </div>
          </div>
        </div>
      </nav>
  );
}
