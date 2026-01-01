
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  FileText, 
  Layers, 
  Cpu, 
  Code2, 
  Smartphone, 
  ExternalLink, 
  Menu, 
  X, 
  ChevronRight,
  MessageSquare,
  Send,
  User,
  BookOpen,
  Microscope,
  Youtube,
  Instagram,
  Facebook,
  Play,
  ArrowRight,
  Database,
  Terminal,
  Server
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

const SectionHeader = ({ title, subtitle, location = "REYKJAVÍK / 64.14° N" }) => (
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

const MinimalButton = ({ children, onClick = () => {}, className = "" }) => (
  <motion.button
    whileTap={{ scale: 0.96 }}
    onClick={onClick}
    className={`neu-button px-8 py-4 rounded-full font-heading font-bold text-appText flex items-center gap-2 text-sm ${className}`}
  >
    {children}
  </motion.button>
);

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
    { name: 'Dossier', href: '#research' }, 
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

const Hero = () => (
  <section className="min-h-screen flex items-center pt-32 pb-20 bg-grid">
    <div className="container mx-auto px-10">
      <div className="max-w-4xl">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-black tracking-[0.5em] text-appGray mb-10 uppercase"
        >
          DHAKA, BD / 23.81° N
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-6xl md:text-8xl lg:text-9xl font-black text-appText mb-12 leading-[0.85] tracking-tighter"
        >
          Flutter<br/>Developer<span className="text-appShadow">.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-appGray text-xl md:text-3xl max-w-2xl mb-16 leading-tight font-accent font-semibold"
        >
          Md. Saon Sikder — Building pixel-perfect ecosystems and researching machine intelligence.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-10"
        >
          <MinimalButton className="px-12 py-5 text-lg">Explore Dossier</MinimalButton>
          <div className="flex gap-8 items-center">
            <a href="#" className="text-appGray hover:text-appText transition-all transform hover:scale-110"><Github size={26} /></a>
            <a href="#" className="text-appGray hover:text-appText transition-all transform hover:scale-110"><Linkedin size={26} /></a>
            <a href="#" className="text-appGray hover:text-appText transition-all transform hover:scale-110"><Youtube size={26} /></a>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-40">
    <div className="container mx-auto px-10">
      <div className="grid lg:grid-cols-2 gap-32 items-center">
        <div className="relative">
          <NeumorphicCard className="aspect-[4/5] p-1.5" hover={false}>
            <div className="w-full h-full rounded-[28px] bg-white flex items-center justify-center text-appBg overflow-hidden border border-appShadow/20">
               <User size={240} strokeWidth={0.2} className="text-appShadow/40" />
            </div>
          </NeumorphicCard>
        </div>
        <div>
          <SectionHeader 
            title="Sparse Clouds" 
            subtitle="I specialize in the convergence of Flutter's reactive UI with advanced Machine Learning models, creating apps that aren't just tools, but intelligent companions." 
          />
          <div className="grid grid-cols-2 gap-12 mt-16">
            {[
              { l: "Focus", v: "ML Research", i: <Microscope size={26} /> },
              { l: "Papers", v: "2 Publications", i: <BookOpen size={26} /> },
              { l: "Academy", v: "50k+ Devs", i: <Youtube size={26} /> },
              { l: "Stack", v: "Flutter Core", i: <Layers size={26} /> }
            ].map((s, i) => (
              <div key={i} className="flex gap-5 items-start">
                <div className="text-appGray mt-1.5">{s.i}</div>
                <div>
                  <div className="font-heading font-black text-appText text-xl leading-none mb-1">{s.v}</div>
                  <div className="text-[10px] uppercase font-black text-appGray tracking-widest">{s.l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Skills = () => {
  const techs = [
    { n: "Flutter", i: <Smartphone size={24} /> }, 
    { n: "Dart", i: <Terminal size={24} /> }, 
    { n: "Python", i: <Code2 size={24} /> }, 
    { n: "TensorFlow", i: <Cpu size={24} /> },
    { n: "Firebase", i: <Database size={24} /> }, 
    { n: "Clean Arch", i: <Layers size={24} /> },
    { n: "BLoC", i: <Server size={24} /> }, 
    { n: "Scikit-Learn", i: <Microscope size={24} /> }
  ];
  return (
    <section id="skills" className="py-40 border-y border-appShadow/20">
      <div className="container mx-auto px-10">
        <SectionHeader 
          title="Technical Arsenal" 
          subtitle="A curated stack of technologies I use to architect robust, scalable digital experiences." 
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {techs.map((tech, i) => (
            <NeumorphicCard key={i} inset className="p-10 flex flex-col items-center justify-center text-center group">
              <div className="text-appGray group-hover:text-appText transition-all mb-6">
                {tech.i}
              </div>
              <div className="font-heading font-black text-appText text-sm uppercase tracking-widest">{tech.n}</div>
            </NeumorphicCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const apps = [
    { title: "NeoCommerce", d: "ML shopping engine.", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=600" },
    { title: "FitPulse AI", d: "On-device analysis.", img: "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&q=80&w=600" },
    { title: "Crypton 2.0", d: "Crypto Tracker.", img: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=600" }
  ];
  return (
    <section id="projects" className="py-40">
      <div className="container mx-auto px-10 text-center">
        <SectionHeader title="Featured Apps" subtitle="High-end smartphone mockups demonstrating research-backed motion and intelligent UI." />
        <div className="flex flex-wrap justify-center gap-16 md:gap-32 mt-20">
          {apps.map((app, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="phone-frame mb-10 transform group-hover:scale-105 transition-all duration-500">
                <div className="phone-island" />
                <div className="phone-screen">
                  <img src={app.img} className="w-full h-full object-cover" alt={app.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                     <span className="text-white text-[10px] font-black tracking-widest uppercase">Live Demo Available</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h4 className="font-heading text-3xl font-black mb-3 text-appText">{app.title}</h4>
                <p className="text-appGray text-sm font-accent font-bold uppercase tracking-wider">{app.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Academy = () => (
  <section id="academy" className="py-40 bg-appBg border-t border-appShadow/30">
    <div className="container mx-auto px-10">
      <div className="grid lg:grid-cols-12 gap-24 items-center">
        <div className="lg:col-span-5">
          <SectionHeader title="Programming Academy" subtitle="Educating thousands of developers on Flutter, Dart, and AI integration through structured tutorials." />
          <div className="flex flex-col gap-8">
            <MinimalButton className="justify-center py-6 text-base shadow-xl">
              <Youtube size={24} /> Subscribe to Channel
            </MinimalButton>
            <div className="grid grid-cols-2 gap-6">
              <a href="#" className="neu-button p-6 rounded-3xl flex flex-col items-center gap-4 transition-all hover:scale-105"><Facebook className="text-blue-600" size={32} /> <span className="font-black text-[10px] tracking-widest uppercase text-appGray">COMMUNITY</span></a>
              <a href="#" className="neu-button p-6 rounded-3xl flex flex-col items-center gap-4 transition-all hover:scale-105"><Instagram className="text-pink-600" size={32} /> <span className="font-black text-[10px] tracking-widest uppercase text-appGray">UPDATES</span></a>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <NeumorphicCard className="aspect-video p-2" hover={false}>
             <div className="w-full h-full bg-appText rounded-[28px] flex items-center justify-center relative group cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <Play size={80} className="text-white opacity-20 group-hover:opacity-100 transition-all z-20 group-hover:scale-110" />
                <div className="absolute bottom-12 left-12 z-20 text-left">
                  <div className="text-[10px] font-black uppercase text-appShadow tracking-[0.4em] mb-3">Featured Tutorial</div>
                  <div className="text-white font-heading text-2xl font-black">Advanced BLoC Patterns</div>
                </div>
             </div>
          </NeumorphicCard>
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-40">
    <div className="container mx-auto px-10 max-w-5xl">
      <SectionHeader title="Sync Streams" subtitle="Available for enterprise collaborations, ML research partnerships, or guest lectures." />
      <div className="grid md:grid-cols-2 gap-24 mt-20">
        <div className="space-y-16">
          <div className="flex gap-8 items-start group">
            <div className="neu-button p-5 rounded-3xl group-hover:scale-110 transition-transform"><Mail className="text-appGray" size={28} /></div>
            <div>
              <div className="text-[10px] uppercase font-black text-appGray tracking-[0.3em] mb-2">Electronic Mail</div>
              <div className="text-2xl font-black text-appText">saon.sikder@example.com</div>
            </div>
          </div>
          <div className="flex gap-8 items-start group">
            <div className="neu-button p-5 rounded-3xl group-hover:scale-110 transition-transform"><Linkedin className="text-appGray" size={28} /></div>
            <div>
              <div className="text-[10px] uppercase font-black text-appGray tracking-[0.3em] mb-2">Professional network</div>
              <div className="text-2xl font-black text-appText">linkedin.com/in/saon-sikder</div>
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
