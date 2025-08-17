'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Skill tags data
const skillTags = [
  'React', 'Node.js', 'Express', 'MongoDB', 'TypeScript',
  'Python', 'PostgreSQL', 'Docker', 'Next.js', 'C++', 'Jira'
];

// Brajesh Kumar's 15 actual featured projects
const featuredProjects = [
  {
    id: 0,
    title: 'Emma – AI Productivity Assistant',
    description: 'Python-based daily automation assistant, manages scheduling, reminders, and task suggestions.',
    tags: ['Python', 'AI', 'Automation'],
    image: '/emma.jpg',
    demoUrl: '',
    githubUrl: 'https://github.com/Brajesh31/emma-ai-assistant'
  },
  {
    id: 1,
    title: 'Thea – AI Therapist',
    description: 'Empathetic AI therapist for mental health support and human-like conversations.',
    tags: ['Python', 'AI', 'NLP'],
    image: '/thea.jpg',
    demoUrl: '',
    githubUrl: 'https://github.com/Brajesh31/thea-ai-therapist'
  },
  {
    id: 2,
    title: 'Ella (AI Companion) Mobile App',
    description: 'React Native mobile app companion using ML for emotional support and productivity tools.',
    tags: ['React Native', 'ML', 'Expo'],
    image: '/ella.jpg',
    demoUrl: '',
    githubUrl: 'https://github.com/Brajesh31/ella-ai-companion'
  },
  {
    id: 3,
    title: 'The Knights of Flovora',
    description: 'Flutter-based RPG dungeon crawler with combat and fantasy storyline.',
    tags: ['Flutter', 'Dart', 'Game Dev'],
    image: '/knights.jpg',
    demoUrl: '',
    githubUrl: 'https://github.com/Brajesh31/knights-of-flovora'
  },
  {
    id: 4,
    title: 'Mathematrix – Learning Platform',
    description: 'Gamified multiplication tables for kids using quizzes and interactive UI.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: '/mathematrix.jpg',
    demoUrl: '',
    githubUrl: 'https://github.com/Brajesh31/mathematrix'
  },
  {
    id: 5,
    title: 'SEMAC – College Utilities Platform',
    description: 'Group study resources, notifications, and Random Forest analytics (Next.js, MongoDB).',
    tags: ['Next.js', 'MongoDB', 'ML'],
    image: '/semc.jpg',
    demoUrl: '',
    githubUrl: 'https://github.com/Brajesh31/semac'
  },
  {
    id: 6,
    title: 'IdeaPool – Project Collaboration',
    description: 'MERN stack idea-sharing platform for developers and team formation.',
    tags: ['MERN', 'Collaboration', 'Web App'],
    image: '/ideapool.jpg',
    demoUrl: '',
    githubUrl: 'https://github.com/Brajesh31/ideapool'
  },
  {
    id: 7,
    title: 'FitDeck – Social Fitness Network',
    description: 'Community and social network for fitness, coach following, and fitness articles.',
    tags: ['MERN', 'Social', 'Fitness'],
    image: '/fitdeck.jpg',
    demoUrl: '',
    githubUrl: 'https://github.com/Brajesh31/fitdeck'
  },
  {
    id: 8,
    title: 'ChatterBox – Real-time Chat App',
    description: 'Node.js/Socket.io app for live messaging, themed chat rooms, and notifications.',
    tags: ['Node.js', 'Socket.io', 'Real-time'],
    image: '/chatterbox.jpg',
    demoUrl: '',
    githubUrl: 'https://github.com/Brajesh31/chatterbox'
  },
  {
    id: 9,
    title: 'Cap’nShare – Food Sharing Platform',
    description: 'Ruby on Rails app for campus food sharing with AWS S3 and admin moderation.',
    tags: ['Rails', 'PostgreSQL', 'AWS S3'],
    image: '/capnshare.jpg',
    demoUrl: '',
    githubUrl: 'https://github.com/Brajesh31/capnshare'
  },
  {
    id: 10,
    title: 'Career Mapper',
    description: 'Job and offer comparison tool based on cost of living and safety indices.',
    tags: ['Python', 'React', 'MySQL'],
    image: '/career-mapper.jpg',
    demoUrl: '',
    githubUrl: 'https://github.com/Brajesh31/career-mapper'
  },
  {
    id: 11,
    title: 'Inventory Management System',
    description: 'Business stock, orders, and delivery management platform (Django, SQLite).',
    tags: ['Python', 'Django', 'SQLite'],
    image: '/inventory-management.jpg',
    demoUrl: '',
    githubUrl: 'https://github.com/Brajesh31/inventory-management'
  },
  {
    id: 12,
    title: 'Chatbot Project',
    description: 'AI customer service chatbot using NLP and TensorFlow.',
    tags: ['Python', 'TensorFlow', 'NLP'],
    image: '/django_chat.jpg',
    demoUrl: '',
    githubUrl: 'https://github.com/Brajesh31/chatbot-project'
  },
  {
    id: 13,
    title: 'AgroTech – IoT Farm Management',
    description: 'React, Node.js, IoT-enabled farm dashboard with analytics.',
    tags: ['React', 'Node.js', 'IoT'],
    image: '/agrotech.jpg',
    demoUrl: '',
    githubUrl: 'https://github.com/Brajesh31/agrotech'
  },
  {
    id: 14,
    title: 'Image Denoising + StyleGAN',
    description: 'GAN and diffusion-based AI for intelligent image enhancement & denoising.',
    tags: ['Deep Learning', 'GANs', 'Python'],
    image: '/image_analysis_for_segmentation_of_grayscale_image.jpg',
    demoUrl: '',
    githubUrl: 'https://github.com/Brajesh31/image-denoise-gan'
  }
];

export default function BentoGrid() {
  const [currentTime, setCurrentTime] = useState('');
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const projectInterval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % featuredProjects.length);
    }, 3000);
    return () => clearInterval(projectInterval);
  }, []);

  return (
      <section className="modern-bento-grid" id="bento-grid">
        {/* Hero Introduction */}
        <div className="bento-card hero-card">
          <div className="hero-content">
            <div className="status-indicator">
              <div className="status-dot"></div>
              <span>Available for work</span>
            </div>
            <h1 className="hero-title">
              Full-Stack
              <span className="gradient-text">Developer</span>
            </h1>
            <p className="hero-description">
              Crafting full-stack & AI-powered web solutions for real-world impact.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">130+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat">
                <span className="stat-number">2+</span>
                <span className="stat-label">Years Learning</span>
              </div>
              <div className="stat">
                <span className="stat-number">Top</span>
                <span className="stat-label">Open-Source Contributor</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills & Expertise */}
        <div className="bento-card skills-card">
          <div className="card-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3>Tech Stack</h3>
          </div>
          <div className="skills-container">
            {skillTags.map((skill, index) => (
                <span
                    key={skill}
                    className="skill-tag"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animationDuration: `${2 + (index % 4) * 0.5}s`
                    }}
                >
              {skill}
            </span>
            ))}
          </div>
          <div className="skill-progress">
            <div className="progress-bar"></div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="bento-card projects-card">
          <div className="card-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
              <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3>Featured Work</h3>
          </div>
          <div className="project-showcase">
            <div className="project-preview">
              <Image
                  src={featuredProjects[activeProject].image}
                  alt={featuredProjects[activeProject].title}
                  width={260}
                  height={150}
                  className="project-image object-cover"
              />
              <div className="project-overlay flex flex-col justify-between">
                <div className="project-status text-xs font-mono tracking-wide px-2 py-1 rounded bg-[#ff4e42]/20 text-[#ff4e42] w-fit">
                  {featuredProjects[activeProject].demoUrl ? 'LIVE' : 'CODE'}
                </div>
                <div className="flex gap-2 mt-auto">
                  {featuredProjects[activeProject].demoUrl && (
                      <a
                          href={featuredProjects[activeProject].demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-mono bg-[#ff4e42] text-white px-2 py-1 rounded hover:bg-[#ff654f] transition"
                      >
                        DEMO
                      </a>
                  )}
                  {featuredProjects[activeProject].githubUrl && (
                      <a
                          href={featuredProjects[activeProject].githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-mono bg-white/10 text-white px-2 py-1 rounded hover:bg-white/20 transition"
                      >
                        CODE
                      </a>
                  )}
                </div>
              </div>
            </div>
            <div className="project-info">
              <h4 className="project-title line-clamp-1">{featuredProjects[activeProject].title}</h4>
              <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                {featuredProjects[activeProject].description}
              </p>
              <div className="project-tech mt-2">
                {featuredProjects[activeProject].tags.slice(0,4).map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
            <div className="project-indicators">
              {featuredProjects.map((_, index) => (
                  <button
                      key={index}
                      className={`indicator ${index === activeProject ? 'active' : ''}`}
                      onClick={() => setActiveProject(index)}
                      aria-label={`Show project ${featuredProjects[index].title}`}
                  />
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bento-card actions-card">
          <div className="card-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 11H15M9 15H15M17 21L12 16L7 21H17ZM21 5H3C2.45 5 2 5.45 2 6V14C2 14.55 2.45 15 3 15H21C21.55 15 22 14.55 22 14V6C22 5.45 21.55 5 21 5Z" fill="currentColor"/>
            </svg>
            <h3>Quick Actions</h3>
          </div>
          <div className="action-buttons">
            <a href="#contact" className="action-btn primary">
              <span>Hire Me</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#projects" className="action-btn secondary">
              <span>View Work</span>
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="bento-card social-card">
          <div className="card-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M16 8A6 6 0 1 1 4 8V16A2 2 0 0 0 6 18H16A2 2 0 0 0 18 16V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="18" cy="8" r="3" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <h3>Connect</h3>
          </div>
          <div className="social-links">
            <a href="https://github.com/Brajesh31" className="social-link github" target="_blank" rel="noopener noreferrer">
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/brajesh-kumar-9b58651a8/" className="social-link linkedin" target="_blank" rel="noopener noreferrer">
              <span>LinkedIn</span>
            </a>
            <a href="mailto:bk117134@gmail.com" className="social-link email">
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Status & Time */}
        <div className="bento-card status-card">
          <div className="status-info">
            <div className="time-display">
              <span className="time">{currentTime}</span>
              <span className="timezone">IST</span>
            </div>
            <div className="location">
              <span>Madhubani, Bihar</span>
            </div>
          </div>
        </div>

        {/* Profile Image */}
        <div className="bento-card profile-card">
          <div className="profile-container">
            <div className="profile-image-wrapper">
              <Image
                  src="/profile-brajesh.jpg"
                  alt="Brajesh Kumar - Full-Stack Developer"
                  width={300}
                  height={400}
                  className="profile-image"
              />
              <div className="profile-overlay">
                <div className="overlay-content">
                  <h4>Brajesh Kumar</h4>
                  <p>Full-Stack | MERN | AI Enthusiast</p>
                </div>
              </div>
            </div>
            <div className="profile-metrics">
              <div className="metric">
                <span className="metric-value">98%</span>
                <span className="metric-label">Client Satisfaction</span>
              </div>
              <div className="metric">
                <span className="metric-value">150+</span>
                <span className="metric-label">Commits This Month</span>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
