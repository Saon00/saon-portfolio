
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Layers, 
  ExternalLink, 
  Menu, 
  X, 
  MessageSquare,
  Send,
  BookOpen,
  Microscope,
  Youtube,
  Instagram,
  Facebook,
  Play,
  Smartphone,
  Cpu,
  Database,
  Code2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Components ---

const NeumorphicCard = ({ children, className = "", inset = false, hover = true }) => (
  <motion.div 
    whileHover={hover && !inset ? { y: -4 } : {}}
    className={`${inset ? 'neu-concave' : 'neu-convex'} rounded-[32px] ${className}`}
  >
    {children}
  </motion.div>
);

const GlassCard = ({ children, className = "", hover = true }) => (
  <motion.div 
    whileHover={hover ? { y: -4 } : {}}
    className={`bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-[32px] ${className}`}
  >
    {children}
  </motion.div>
);

const sectionReveal = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const itemReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const SectionHeader = ({ title, subtitle, location = "DHAKA, BD / 23.81° N" }) => (
  <div className="mb-12 md:mb-20 relative z-20">
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="text-[10px] md:text-xs font-black tracking-[0.4em] text-appGray mb-5 uppercase"
    >
      {location}
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="font-heading text-4xl md:text-6xl font-extrabold mb-6 text-appText leading-tight"
    >
      {title}
    </motion.h2>
    <motion.p 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-appGray max-w-2xl font-accent text-base md:text-lg leading-relaxed font-medium"
    >
      {subtitle}
    </motion.p>
  </div>
);

const MinimalButton = ({ children, onClick = () => {}, className = "", as = "button", href = undefined, ...props }) => {
  const Component = as === "a" ? motion.a : motion.button;
  return (
    <Component
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      href={href}
      className={`neu-button px-8 py-4 rounded-full font-heading font-bold text-appText flex items-center gap-2 text-sm ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'About', href: '#about' }, 
    { name: 'Arsenal', href: '#skills' }, 
    { name: 'Research', href: '#research' }, 
    { name: 'Experience', href: '#experience' }, 
    { name: 'Education', href: '#education' },
    { name: 'Apps', href: '#projects' }, 
    { name: 'Academy', href: '#academy' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-appBg/90 backdrop-blur-lg py-4 border-b border-appShadow/30' : 'bg-transparent py-10'}`}>
      <div className="container mx-auto px-10 flex justify-between items-center">
        <a href="#" className="font-heading text-2xl font-black tracking-tighter text-appText">SAON.</a>
        
        <div className="hidden lg:flex gap-12 items-center">
          {links.map(link => (
            <a key={link.name} href={link.href} className="font-accent text-xs uppercase tracking-widest font-black text-appGray hover:text-appText transition-all">{link.name}</a>
          ))}
          <MinimalButton className="py-2.5 px-6 text-xs">Resume</MinimalButton>
        </div>

        <button className="lg:hidden text-appText" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden fixed inset-0 top-[72px] bg-appBg p-10 flex flex-col gap-10"
          >
            {links.map(link => (
              <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="font-heading text-4xl font-extrabold text-appText">{link.name}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HeroVisual = () => (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Central Hub */}
      <GlassCard className="relative z-20 p-8 rounded-[40px] flex items-center justify-center bg-white/40 border-white/60 shadow-2xl" hover={false}>
          <div className="relative z-10">
             <Smartphone size={64} className="text-appText" />
             <div className="absolute -bottom-2 -right-2 bg-appText text-white text-[10px] font-black px-2 py-0.5 rounded-full">v3.0</div>
          </div>
          {/* Pulse Effect */}
          <div className="absolute inset-0 bg-blue-100/30 rounded-[40px] animate-ping opacity-20" />
      </GlassCard>

      {/* Orbiting Nodes */}
      {[
        { i: <Cpu size={28} />, x: -160, y: -100, d: 0, c: "bg-blue-100/80 text-blue-600 border-blue-200" },
        { i: <Database size={28} />, x: 160, y: -80, d: 1.5, c: "bg-purple-100/80 text-purple-600 border-purple-200" },
        { i: <Code2 size={28} />, x: -120, y: 140, d: 0.8, c: "bg-green-100/80 text-green-600 border-green-200" },
        { i: <Layers size={28} />, x: 140, y: 120, d: 2.2, c: "bg-orange-100/80 text-orange-600 border-orange-200" },
      ].map((node, i) => (
        <motion.div
           key={i}
           animate={{ y: [node.y, node.y - 20, node.y] }}
           transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: node.d }}
           className={`absolute z-10 p-5 rounded-2xl shadow-lg border backdrop-blur-md ${node.c}`}
           style={{ x: node.x }} // Set X directly
        >
           {node.i}
           {/* Connecting Line */}
           <svg className="absolute top-1/2 left-1/2 -z-10 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30 overflow-visible">
              <line 
                x1="200" 
                y1="200" 
                x2={200 - node.x} 
                y2={200 - node.y} 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeDasharray="6 6" 
                strokeLinecap="round"
              />
           </svg>
        </motion.div>
      ))}

      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-blue-200/20 to-purple-200/20 rounded-full blur-3xl -z-10" />
    </div>
);

const Hero = () => {
  const socialLinks = [
    { icon: Github, url: "https://github.com/Saon00" },
    { icon: Linkedin, url: "https://www.linkedin.com/in/saon00" },
    { icon: Youtube, url: "https://www.youtube.com/@BlackOsRa" },
    { icon: Facebook, url: "https://facebook.com/saon00" },
    { icon: Instagram, url: "https://instagram.com/saon00" },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 bg-appBg overflow-hidden">
      {/* grid overlay */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />
  
      {/* content */}
      <div className="relative container mx-auto px-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Text */}
            <div className="max-w-3xl z-20">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs font-black tracking-[0.5em] text-appText mb-10 uppercase"
              >
                DHAKA, BD / 23.81° N
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-heading text-6xl md:text-8xl font-black text-appText mb-8 leading-[0.9] tracking-tighter"
              >
                Flutter Developer & Researcher<span className="text-appShadow">.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-appGray text-xl md:text-2xl mb-12 leading-relaxed font-accent font-medium max-w-xl"
              >
                Md. Saon Sikder — Building pixel-perfect ecosystems and researching machine intelligence.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-8 items-start sm:items-center"
              >
                <MinimalButton className="px-10 py-5 text-base shadow-xl bg-white border border-white/50">Explore Dossier</MinimalButton>
                <div className="flex gap-4 items-center">
                  {socialLinks.map(({ icon: Icon, url }, i) => (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-full bg-white/40 border border-white/60 text-appGray hover:text-appText hover:bg-white hover:shadow-lg transition-all transform hover:scale-110"
                    >
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column: Visual */}
            <div className="hidden lg:block relative z-10">
               <HeroVisual />
            </div>
        </div>
      </div>
    </section>
  );
};

const TechBadge = ({ name, color, icon: Icon }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="flex items-stretch overflow-hidden rounded-lg font-bold text-xs uppercase tracking-wider shadow-sm"
  >
    <div className={`flex items-center justify-center px-3 py-2 text-white ${color}`}>
      {Icon ? <Icon size={16} /> : name[0]}
    </div>
    <div className="bg-white/80 backdrop-blur-sm px-4 py-2 flex items-center text-appText border-y border-r border-gray-100 rounded-r-lg">
      {name}
    </div>
  </motion.div>
);

const About = () => (
  <section id="about" className="py-24 bg-appBg/50">
    <div className="container mx-auto px-10">
      <div className="flex flex-col-reverse lg:flex-row gap-20 items-center">
        <div className="lg:w-1/2">
          <SectionHeader 
            title="Sparse Clouds" 
            subtitle="I specialize in the convergence of Flutter's reactive UI with advanced Machine Learning models, creating apps that aren't just tools, but intelligent companions." 
          />
          <div className="grid grid-cols-2 gap-6 mt-12">
            {[
              { l: "Focus", v: "ML Research", i: <Microscope size={22} /> },
              { l: "Papers", v: "2 Publications", i: <BookOpen size={22} /> },
              { l: "Academy", v: "5k+ Devs", i: <Youtube size={22} /> },
              { l: "Stack", v: "Flutter Core", i: <Layers size={22} /> }
            ].map((s, i) => (
              <GlassCard key={i} className="p-6 flex items-center gap-4 hover:bg-white/80 transition-colors" hover={true}>
                 <div className="p-3 rounded-full bg-appText/5 text-appText">{s.i}</div>
                 <div>
                    <div className="font-heading font-black text-appText text-lg leading-none mb-1">{s.v}</div>
                    <div className="text-[9px] uppercase font-black text-appGray tracking-widest">{s.l}</div>
                 </div>
              </GlassCard>
            ))}


          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center lg:justify-end relative">
           <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 to-purple-100/30 blur-3xl rounded-full -z-10" />
           <GlassCard className="relative p-2 w-[70%] lg:w-[80%] aspect-square rotate-3 hover:rotate-0 transition-transform duration-500">
             <div className="w-full h-full rounded-[28px] overflow-hidden relative">
               <img src="/images/1000016829.jpg?auto=format&fit=crop&q=80&w=600" alt="Profile" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
               <div className="absolute bottom-6 left-6 text-white">
                 <div className="font-black text-xl tracking-widest uppercase">Saon</div>
               </div>
             </div> 
           </GlassCard>           
        </div>
      </div>
    </div>
  </section>
);

const Skills = () => {
  const techs = [
    "C", "Python", "Java", "Dart", "HTML5",
    "Firebase", "MySQL", "Supabase", "Postman", "Apache",
    "OpenCV", "ScikitLearn", "TensorFlow",
    "Flutter", "Canva", "Notion"
  ];

  return (
    <section id="skills" className="py-24 border-y border-appShadow/20 bg-appBg">
      <div className="container mx-auto px-10">
        <SectionHeader 
          title="Technical Arsenal" 
          subtitle="A curated stack of technologies I use to architect robust, scalable digital experiences." 
        />
        <div className="flex flex-wrap gap-6 justify-center max-w-5xl mx-auto">
          {techs.map((tech, i) => (
            <GlassCard key={i} className="px-8 py-4 flex items-center justify-center text-center hover:bg-white/80 transition-all cursor-default" hover={true}>
              <span className="font-heading font-black text-appText text-sm uppercase tracking-widest">{tech}</span>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const Research = () => {
  const papers = [
    { 
      title: "Comparative Evaluation of Machine Learning and Hybrid Models for Stock Price Forecasting: A Case Study on Grameenphone Ltd. in Bangladesh’s Emerging Market", 
      journal: "2025 IEEE 4th International Conference (RAAICON)", 
      year: "2025", 
      desc: "" ,
      
    },
    { 
      title: "Improving mango ripeness grading accuracy: A comprehensive analysis of deep learning, traditional machine learning, and transfer learning techniques", 
      journal: "Machine Learning with Applications", 
      year: "2025", 
      desc: ""
    }
  ];
  return (
    <motion.section 
      id="research" 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.2 }} 
      variants={sectionReveal} 
      className="py-24 bg-appBg relative z-20"
    >
      <div className="container mx-auto px-6">
        <SectionHeader title="Scientific Contributions" subtitle="Pushing the boundaries of mobile intelligence through peer-reviewed research." />
        <div className="grid md:grid-cols-2 gap-10">
          {papers.map((p, i) => (
            <GlassCard key={i} className="p-10">
              <div className="flex items-start justify-between mb-8">
                <Microscope className="text-appText" size={38} />
                <div className="px-3 py-1 bg-appText/5 border border-appText/10 rounded text-appText text-[10px] font-black uppercase tracking-widest">{p.year}</div>
              </div>
              <div className="text-[11px] font-black text-appGray mb-3 tracking-[0.2em] uppercase">{p.journal}</div>
              <h4 className="font-heading text-xl md:text-2xl font-black mb-6 leading-snug text-appText">{p.title}</h4>
              <p className="text-appGray text-sm md:text-base leading-relaxed mb-8 font-accent">{p.desc}</p>
              <MinimalButton className="px-6 py-3 text-xs bg-transparent shadow-none border border-appText/10 hover:bg-appText/5">
                Access Publication <ExternalLink size={16} />
              </MinimalButton>
            </GlassCard>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const Experience = () => {
  const items = [
    { role: "Junior Flutter Developer", company: "SM Technology", date: "Aug 2025 - Present", desc: "Developing and maintaining cross-platform mobile applications using Flutter, focusing on clean UI, performance optimization, and scalable code architecture." },
    { role: "Research Assistant", company: "Department of Computer Science and Engineering, Faridpur Engineering College", date: "Part-time", desc: "Assisting in academic research, data analysis, and technical documentation, with a focus on software systems and emerging computing technologies." },
    { role: "Python Programming Trainer", company: "ICT Division", date: "Oct 2023 - Mar 2024", desc: "A government initiative to train high school students in Python programming. About 180 students were trained from Salauddin Ahmed High School & Shamsul Hoque Khan School & College" },
    { role: "Intern Flutter Developer", company: "Isbah IT", date: "Aug 2023- Oct 2023", desc: "Developing and maintaining cross-platform mobile applications using Flutter, focusing on clean UI, performance optimization, and scalable code architecture." },
    
  ];

  return (
    <motion.section 
      id="experience" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionReveal}
      className="py-32 bg-appBg relative z-20"
    >
      <div className="container mx-auto px-6">
        <SectionHeader title="Professional Path" subtitle="A timeline of engineering excellence and scientific discovery." />
        
        <div className="max-w-6xl mx-auto relative px-4">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-appText/10 -translate-x-1/2 hidden lg:block" />
          
          <div className="space-y-24 md:space-y-32">
            {items.map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute left-[-20px] lg:left-1/2 top-0 w-6 h-6 rounded-full bg-appText border-8 border-appBg lg:-translate-x-1/2 shadow-xl z-10" />
                
                <div className={`flex flex-col lg:flex-row items-start ${i % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'}`}>
                  <div className={`w-full lg:w-[46%] ${i % 2 === 0 ? 'lg:text-right lg:pr-16' : 'lg:text-left lg:pl-16'}`}>
                    <motion.div variants={itemReveal}>
                      <div className="text-appText/60 font-heading font-black text-sm mb-4 tracking-[0.3em] uppercase">{item.date}</div>
                      <h4 className="font-heading text-2xl md:text-3xl font-black mb-2 text-appText">{item.role}</h4>
                      <div className="text-appGray font-bold mb-8 text-lg">{item.company}</div>
                      
                      <GlassCard className="p-8 text-left">
                        <p className="text-appGray text-base md:text-lg font-accent leading-relaxed">
                          {item.desc}
                        </p>
                      </GlassCard>
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const Education = () => {
  const items = [
    { degree: "B.Sc. in Engineering in Computer Science & Engineering", school: "Faridpur Engineering College", date: "2018 - 2023", desc: "Focus on Artificial Intelligence and Mobile Computing. Graduated with Honors." },
    { degree: "Higher Secondary Certificate", school: "Dr. Mahbubur Rahman Mollah College", date: "2015 - 2017", desc: "Science concentration. Awarded for excellence in Physics and Mathematics." }
  ];

  return (
    <motion.section 
      id="education" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionReveal}
      className="py-32 bg-appBg relative z-20"
    >
      <div className="container mx-auto px-6">
        <SectionHeader title="Academic Foundation" subtitle="The theoretical groundwork powering practical innovation." />
        
        <div className="max-w-4xl mx-auto grid gap-12">
          {items.map((item, i) => (
             <GlassCard key={i} className="p-10 flex flex-col md:flex-row gap-10 items-start">
                <div className="min-w-[120px]">
                   <div className="text-5xl font-black text-appText/10 font-heading">{'0' + (i + 1)}</div>
                </div>
                <div>
                   <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                      <h4 className="font-heading text-2xl font-black text-appText">{item.school}</h4>
                      <span className="hidden md:block text-appGray/30">•</span>
                      <span className="text-xs font-black uppercase tracking-widest text-appText/60 bg-appText/5 px-3 py-1 rounded">{item.date}</span>
                   </div>
                   <div className="text-lg font-bold text-appGray mb-4">{item.degree}</div>
                   <p className="text-appGray/80 font-accent leading-relaxed">{item.desc}</p>
                </div>
             </GlassCard>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const Projects = () => {
  const apps = [
    { title: "Mind Twin", d: "ML shopping engine.", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=600" },
    { title: "SpanX", d: "On-device analysis.", img: "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&q=80&w=600" },
    { title: "Devyn", d: "Crypto Tracker.", img: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=600" },
    { title: "ChopTop", d: "AI Text Summarizer.", img: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=600" },
     { title: "The Carribean Note", d: "Object Detection.", img: "public/images/cara.png" }
  ];

  return (
    <section id="projects" className="py-24 overflow-hidden bg-appBg">
      <div className="container mx-auto px-10 mb-16 text-center">
        <SectionHeader title="Featured Apps" subtitle="High-end smartphone mockups demonstrating research-backed motion and intelligent UI." />
      </div>
      
      <div className="relative w-full">
         <div className="flex gap-20 w-max animate-infinite-scroll">
            {[...apps, ...apps, ...apps].map((app, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center group cursor-pointer w-[300px] flex-shrink-0"
              >
                <div className="phone-frame mb-8 transform group-hover:scale-105 transition-all duration-500 shadow-2xl">
                  <div className="phone-island" />
                  <div className="phone-screen bg-black">
                    <img src={app.img} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={app.title} />
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="font-heading text-2xl font-black mb-2 text-appText">{app.title}</h4>
                  <p className="text-appGray text-xs font-accent font-bold uppercase tracking-wider">{app.d}</p>
                </div>
              </div>
            ))}
         </div>
         {/* Gradients for smooth fade */}
         <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-appBg to-transparent z-10" />
         <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-appBg to-transparent z-10" />
      </div>
    </section>
  );
};

const Academy = () => (
  <section id="academy" className="py-20 bg-appBg border-t border-appShadow/30">
    <div className="container mx-auto px-10">
      <div className="grid lg:grid-cols-12 gap-24 items-center">
        <div className="lg:col-span-5">
          <SectionHeader title="Programming Academy" subtitle="Educating thousands of developers on Flutter, Dart, and AI integration through structured tutorials." />
          <div className="flex flex-col gap-8">
            <MinimalButton as="a" href="https://www.youtube.com/@BlackOsRa" target="_blank" rel="noopener noreferrer" className="justify-center py-6 text-base shadow-xl">
              <Youtube size={24} /> Subscribe to Channel
            </MinimalButton>
           <div className="grid grid-cols-2 gap-6">
  <a
    href="https://facebook.com/blackosra"
    target="_blank"
    rel="noopener noreferrer"
    className="neu-button p-6 rounded-3xl flex flex-col items-center gap-4 transition-all hover:scale-105"
  >
    <Facebook className="text-blue-600" size={32} />
    <span className="font-black text-[10px] tracking-widest uppercase text-appGray">
      COMMUNITY
    </span>
  </a>

  <a
    href="https://instagram.com/blackosra"
    target="_blank"
    rel="noopener noreferrer"
    className="neu-button p-6 rounded-3xl flex flex-col items-center gap-4 transition-all hover:scale-105"
  >
    <Instagram className="text-pink-600" size={32} />
    <span className="font-black text-[10px] tracking-widest uppercase text-appGray">
      UPDATES
    </span>
  </a>
</div>
          </div>
        </div>
        <div className="lg:col-span-7">
         <NeumorphicCard className="aspect-video p-2" hover={false}>
  <a
    href="https://youtu.be/FF2UcqjOGrU"
    target="_blank"
    rel="noopener noreferrer"
    className="w-full h-full rounded-[28px] overflow-hidden relative group cursor-pointer block"
  >
    {/* Thumbnail */}
    <img
      src="https://img.youtube.com/vi/FF2UcqjOGrU/maxresdefault.jpg"
      alt="Advanced BLoC Patterns"
      className="w-full h-full object-cover"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10" />

    {/* Play icon */}
    <Play
      size={80}
      className="absolute inset-0 m-auto text-white opacity-80 group-hover:scale-110 transition-transform z-20"
    />

    {/* Text */}
    <div className="absolute bottom-12 left-12 z-20 text-left">
      <div className="text-[10px] font-black uppercase text-appShadow tracking-[0.4em] mb-3">
        Featured Tutorial
      </div>
      <div className="text-white font-heading text-2xl font-black">
        পাইথন বাংলা টিউটোরিয়াল - Python Tutorial for Beginners (Bangla) - Full Course
      </div>
    </div>
  </a>
</NeumorphicCard>

        </div>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-20">
    <div className="container mx-auto px-10 max-w-5xl">
      <SectionHeader title="Sync Streams" subtitle="Available for enterprise collaborations, ML research partnerships, or guest lectures." />
      <div className="grid md:grid-cols-2 gap-24 mt-20">
        <div className="space-y-16">
          <div className="flex gap-8 items-start group">
            <div className="neu-button p-5 rounded-3xl group-hover:scale-110 transition-transform"><Mail className="text-appGray" size={28} /></div>
            <div>
              <div className="text-[10px] uppercase font-black text-appGray tracking-[0.3em] mb-2">For personal queries</div>
              <div className="text-2xl font-black text-appText">sikdersaon1@gmail.com</div>
            </div>
          </div>
          <div className="flex gap-8 items-start group">
            <div className="neu-button p-5 rounded-3xl group-hover:scale-110 transition-transform"><Linkedin className="text-appGray" size={28} /></div>
            <div>
              <div className="text-[10px] uppercase font-black text-appGray tracking-[0.3em] mb-2">Professional network</div>
              <div className="text-2xl font-black text-appText">Md. Saon Sikder</div>
            </div>
          </div>
        </div>
        <form className="space-y-8" onSubmit={e => e.preventDefault()}>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-appGray tracking-widest">Identification</label>
            <input className="neu-concave w-full rounded-[28px] px-8 py-5 outline-none font-accent text-appText font-bold focus:shadow-inner" placeholder="Your name" />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-appGray tracking-widest">Transmission</label>
            <textarea rows={4} className="neu-concave w-full rounded-[28px] px-8 py-5 outline-none font-accent resize-none text-appText font-bold focus:shadow-inner" placeholder="How can we build the future?" />
          </div>
          <MinimalButton className="w-full justify-center py-6 text-lg">Initiate Sync <Send size={22} /></MinimalButton>
        </form>
      </div>
    </div>
  </section>
);

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'ai', text: "Liaison Alpha-1 online. How may I assist your query regarding Saon's research or development?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: `You are Saon Sikder's AI Liaison. Saon is a Flutter Dev & ML Researcher with 2 publications. He has a YouTube academy. Be sharp and professional. Query: ${input}` }] }],
        config: { systemInstruction: "Represent Md. Saon Sikder. Be highly intelligent, professional, and concise (max 40 words)." }
      });
      setMessages(prev => [...prev, { role: 'ai', text: response.text || "Connection interupted." }]);
    } catch { setMessages(prev => [...prev, { role: 'ai', text: "Neural link offline." }]); } finally { setLoading(false); }
  };

  return (
    <div className="fixed bottom-12 right-12 z-[110]">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="absolute bottom-28 right-0 w-[90vw] sm:w-[420px]">
            <NeumorphicCard className="h-[600px] flex flex-col p-8 border border-appShadow/40" hover={false}>
              <div className="flex justify-between items-center mb-8 pb-5 border-b border-appShadow/40">
                <div className="flex items-center gap-4">
                   <div className="w-3 h-3 rounded-full bg-appText animate-pulse shadow-lg" />
                   <span className="text-[11px] font-black uppercase tracking-[0.4em] text-appGray">Liaison Alpha-1</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-appGray hover:text-appText transition-colors"><X size={26} /></button>
              </div>
              <div ref={scrollRef} className="flex-grow overflow-y-auto space-y-8 scrollbar-hide mb-8">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-5 rounded-[24px] text-sm font-accent ${m.role === 'user' ? 'bg-appText text-appBg font-bold rounded-tr-none shadow-2xl' : 'neu-concave text-appText rounded-tl-none font-medium'}`}>{m.text}</div>
                  </div>
                ))}
                {loading && <div className="text-[10px] font-black tracking-[0.4em] text-appGray animate-pulse px-4 uppercase">Neural Calibration...</div>}
              </div>
              <div className="relative pt-2">
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Input command..." className="neu-concave w-full rounded-full px-8 py-5 pr-16 outline-none text-sm font-accent text-appText font-bold" />
                <button onClick={handleSend} className="absolute right-4 bottom-4 p-2 text-appText hover:scale-125 transition-transform"><Send size={22} /></button>
              </div>
            </NeumorphicCard>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }} 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-20 h-20 rounded-full neu-button flex items-center justify-center z-[120]"
      >
        <MessageSquare size={36} />
      </motion.button>
    </div>
  );
};

const App = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Research />
      <Experience />
      <Education />
      <Projects />
      <Academy />
      <Contact />
      <footer className="py-24 border-t border-appShadow/20 text-center">
        <div className="font-heading text-3xl font-black mb-6">SAON.</div>
        <div className="text-appGray text-[10px] uppercase font-black tracking-[0.5em]">© {new Date().getFullYear()} Code & Intelligence. All Rights Reserved.</div>
      </footer>
      <AIAssistant />
    </div>
  );
};

const container = document.getElementById('root');
if (container) createRoot(container).render(<App />);
