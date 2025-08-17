'use client';

import React, { useEffect, useRef, useState } from 'react';

export function TerminalPanel() {
  const [messages, setMessages] = useState<Array<{ text: string; isCommand: boolean }>>([
    { text: 'BRAJESH.DEV v3.7.2 INITIALIZED. SECURE CONNECTION ESTABLISHED.', isCommand: false },
    { text: 'next.js.init({typescript: true, tailwindcss: true, performance: \'optimal\'});', isCommand: true },
    { text: 'mern.stack.deploy({mongodb: true, express: true, react: true, node: true});', isCommand: false },
    { text: 'portfolio.showcase({projects: \'AI_VOICE_ASSISTANT\', status: \'deployed\'});', isCommand: true }
  ]);

  const [currentTyping, setCurrentTyping] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const messageQueue = useRef<string[]>([
    'SYSTEM INITIALIZED. PORTFOLIO ANALYSIS READY.',
    'SCANNING FOR EXCEPTIONAL DEVELOPERS IN CODE SPECTRUM.',
    'BRAJESH.PROFILE.INITIALIZE({skills: [\'NEXT.JS\', \'REACT\', \'MERN\', \'AI\']});',
    'TALENT.ANALYZE({name: \'BRAJESH_KUMAR\', rating: \'EXCEPTIONAL\'});',
    'HIRE.RECOMMEND({developer: \'BRAJESH\', projects: [\'AI_VOICE_ASSISTANT\', \'NGO_PLATFORM\']});',
    'const brajeshSkills = [\'TypeScript\', \'MongoDB\', \'Express\', \'React\', \'Node.js\'];',
    'PORTFOLIO.DEPLOY({status: \'SUCCESS\', performance: \'OPTIMAL\', ui: \'CLEAN\'});',
    'GITHUB.SCAN({user: \'Brajesh31\', repositories: \'IMPRESSIVE\', commits: \'ACTIVE\'});'
  ]);
  const messageIndex = useRef(0);

  // Auto-scroll to bottom
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [messages, currentTyping]);

  // Typing animation
  useEffect(() => {
    if (isTyping) return;

    const timer = setTimeout(() => {
      if (messageIndex.current < messageQueue.current.length) {
        const nextMessage = messageQueue.current[messageIndex.current];
        setIsTyping(true);

        let charIndex = 0;
        const typeChar = () => {
          if (charIndex < nextMessage.length) {
            setCurrentTyping(nextMessage.substring(0, charIndex + 1));
            charIndex++;
            setTimeout(typeChar, 50);
          } else {
            // Finished typing, add to messages
            setMessages(prev => [...prev, {
              text: nextMessage,
              isCommand: nextMessage.includes('GSAP') || nextMessage.includes('WEBFLOW') || nextMessage.includes('PORTFOLIO')
            }]);
            setCurrentTyping('');
            setIsTyping(false);
            messageIndex.current++;
          }
        };

        setTimeout(typeChar, 100);
      }
    }, 3000 + Math.random() * 2000); // Random delay between 3-5 seconds

    return () => clearTimeout(timer);
  }, [isTyping, messages]);

  // Add method to add new messages (for external use)
  const addMessage = (text: string, isCommand = false) => {
    setMessages(prev => [...prev, { text, isCommand }]);
  };

  return (
      <div className="fixed left-5 bottom-5 w-[500px] h-[150px] bg-[rgba(30,26,24,0.7)] border border-[rgba(255,78,66,0.3)] rounded-md overflow-hidden pointer-events-auto z-20">
        {/* Header */}
        <div className="flex justify-between items-center px-3 py-2 bg-[rgba(0,0,0,0.3)] text-sm text-[#ff4e42]">
          <span>SYSTEM TERMINAL</span>
          <span>ONLINE</span>
        </div>

        {/* Content */}
        <div
            ref={contentRef}
            className="px-3 py-2 h-[calc(100%-32px)] overflow-y-auto text-xs text-[#c2b8b2] leading-5 font-mono"
        >
          {messages.map((message, index) => (
              <div
                  key={index}
                  className={`mb-1 ${
                      message.isCommand
                          ? 'text-white'
                          : message.text.includes('ERROR') || message.text.includes('WARNING')
                              ? 'text-[#ff4e42]'
                              : 'text-[#c2b8b2]'
                  }`}
              >
                {message.text}
              </div>
          ))}

          {/* Typing line */}
          <div className="relative">
          <span className={isTyping ? 'text-white' : 'text-[#c2b8b2]'}>
            {currentTyping}
          </span>
            <span className="animate-pulse">|</span>
          </div>
        </div>
      </div>
  );
}
