import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for tailwind class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Types
type CommandResponse = {
  type: 'text' | 'html';
  content: string;
};

type HistoryItem = {
  command: string;
  response: CommandResponse;
};

const COMMANDS: Record<string, (args: string[]) => CommandResponse | string> = {
  help: () => `
Available commands:
  - clear:       Clear the terminal
  - help:        Show this help message
  - about:       Professional summary and background
  - skills:      Technical stack and core competencies
  - projects:    Featured work and deployments
  - experience:  Internship and professional history
  - education:   Academic qualifications and certifications
  - socials:     Find me on the web
  - color [opt]: Change theme color (light, blue, red, etc.)
`,
  about: () => ({
    type: 'html',
    content: `
      <div class="space-y-4">
        <h1 class="text-2xl font-bold text-terminal-green">Professional Summary</h1>
        <p>I am a <span class="font-bold underline">B.Tech Computer Science & Engineering</span> student at Lovely Professional University (Class of 2026), originally from Dhaka, Bangladesh. With a robust portfolio of <span class="font-bold">30+ deployed web applications</span>, I bridge the gap between creative design and complex computational logic.</p>
        <p>My work philosophy is simple: <span class="italic font-bold">"Code is a form of art, and every line tells a story."</span> As a Bengali writer, singer, and violinist, I bring a unique multidisciplinary perspective to software engineering, balancing technical precision with artistic intuition.</p>
      </div>
    `
  }),
  skills: () => ({
    type: 'html',
    content: `
      <div class="space-y-6">
        <h1 class="text-2xl font-bold text-terminal-green">Technical Ecosystem</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-4">
            <section>
              <h2 class="text-xl font-semibold border-b border-terminal-green/30 pb-1 mb-2">Web Engineering</h2>
              <p class="text-sm opacity-80">React.js, Node.js, TypeScript, TailwindCSS, Bootstrap, PHP, MySQL, MongoDB.</p>
            </section>
            <section>
              <h2 class="text-xl font-semibold border-b border-terminal-green/30 pb-1 mb-2">Data Science & AI</h2>
              <p class="text-sm opacity-80">Python (Pandas, NumPy, Matplotlib, Seaborn), TensorFlow, Keras, Streamlit, Scrapy, Power BI.</p>
            </section>
          </div>
          <div class="space-y-4">
            <section>
              <h2 class="text-xl font-semibold border-b border-terminal-green/30 pb-1 mb-2">Tools & Platforms</h2>
              <p class="text-sm opacity-80">Git/GitHub, Vercel, VS Code, Google Colab, Linux Environment.</p>
            </section>
            <section>
              <h2 class="text-xl font-semibold border-b border-terminal-green/30 pb-1 mb-2">Soft Skills</h2>
              <p class="text-sm opacity-80 italic">Leadership, Maturity under pressure, High-speed adaptability, Multilingual communication (EN, BN, HI).</p>
            </section>
          </div>
        </div>
      </div>
    `
  }),
  projects: () => ({
    type: 'html',
    content: `
      <div class="space-y-6">
        <section>
          <h1 class="text-2xl font-bold text-terminal-green mb-4">Featured Projects</h1>
          <div class="space-y-4">
            <div class="border-l-2 border-terminal-green/30 pl-4 py-1">
              <h3 class="text-lg font-bold uppercase tracking-wider text-terminal-green">AlgoViz - Algorithm Learning Platform</h3>
              <p class="text-sm opacity-70">A dedicated React-based visualizer for 20+ Data Structures and Algorithms.</p>
              <a href="https://algoviz-eta.vercel.app/" target="_blank" class="text-xs hover:underline mt-1 inline-block opacity-50">[View Live Build]</a>
            </div>
            <div class="border-l-2 border-terminal-green/30 pl-4 py-1">
              <h3 class="text-lg font-bold uppercase tracking-wider text-terminal-green">Deep Learning: Protein Sequence Analytics</h3>
              <p class="text-sm opacity-70">Achieved 81.53% Q3 accuracy on 95,000+ proteins using a Bi-LSTM and MNB framework.</p>
            </div>
            <div class="border-l-2 border-terminal-green/30 pl-4 py-1">
              <h3 class="text-lg font-bold uppercase tracking-wider text-terminal-green">Streamlit Bowler Stats Visualization</h3>
              <p class="text-sm opacity-70">Comparative performance analytics for bowlers using 4+ parameters.</p>
            </div>
          </div>
        </section>

        <section>
          <h1 class="text-xl font-bold text-terminal-green mb-4 opacity-80 decoration-dotted underline underline-offset-4">Other Projects</h1>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white/5 p-3 rounded border border-white/10 hover:border-terminal-green/30 transition-colors">
              <h4 class="font-bold text-sm">MERN Stack Blog</h4>
              <p class="text-[10px] opacity-60 leading-tight mt-1">A robust blogging platform with authentication, SEO, and CRUD.</p>
              <div class="flex gap-2 mt-2">
                <a href="https://github.com/kanadkapil/Mern_Blog" target="_blank" class="text-[9px] hover:underline opacity-40">[GitHub]</a>
              </div>
            </div>
            <div class="bg-white/5 p-3 rounded border border-white/10 hover:border-terminal-green/30 transition-colors">
              <h4 class="font-bold text-sm">NoteNest</h4>
              <p class="text-[10px] opacity-60 leading-tight mt-1">A streamlined, colorful React-powered note-taking app.</p>
              <div class="flex gap-2 mt-2">
                <a href="https://react-note-card.vercel.app/" target="_blank" class="text-[9px] hover:underline opacity-40">[Live Demo]</a>
              </div>
            </div>
            <div class="bg-white/5 p-3 rounded border border-white/10 hover:border-terminal-green/30 transition-colors">
              <h4 class="font-bold text-sm">The Minion Times</h4>
              <p class="text-[10px] opacity-60 leading-tight mt-1">A visually appealing CSS-based magazine layout.</p>
              <div class="flex gap-2 mt-2">
                <a href="https://kanadkapil.github.io/Web-Works-Live/Magazine/" target="_blank" class="text-[9px] hover:underline opacity-40">[View Site]</a>
              </div>
            </div>
            <div class="bg-white/5 p-3 rounded border border-white/10 hover:border-terminal-green/30 transition-colors">
              <h4 class="font-bold text-sm">CardPro Designer</h4>
              <p class="text-[10px] opacity-60 leading-tight mt-1">Generate and customize professional business cards.</p>
              <div class="flex gap-2 mt-2">
                <a href="https://kanadkapil.github.io/Web-Works-Live/Card/index.html" target="_blank" class="text-[9px] hover:underline opacity-40">[Designer]</a>
              </div>
            </div>
            <div class="bg-white/5 p-3 rounded border border-white/10 hover:border-terminal-green/30 transition-colors">
              <h4 class="font-bold text-sm">Flip Match Memory</h4>
              <p class="text-[10px] opacity-60 leading-tight mt-1">Interactive card-matching game built for the web.</p>
              <div class="flex gap-2 mt-2">
                <a href="https://kanadkapil.github.io/Web-Works-Live/FlipCards/index.html" target="_blank" class="text-[9px] hover:underline opacity-40">[Play Game]</a>
              </div>
            </div>
            <div class="bg-white/5 p-3 rounded border border-white/10 hover:border-terminal-green/30 transition-colors">
              <h4 class="font-bold text-sm">Internal Tooling</h4>
              <p class="text-[10px] opacity-60 leading-tight mt-1">Brainfuck Interpreter & Emoji Encoder/Decoder tools.</p>
              <div class="flex gap-2 mt-2 font-mono italic opacity-40 text-[9px]">
                <span>[Utility Apps]</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    `
  }),
  experience: () => ({
    type: 'html',
    content: `
      <div class="space-y-6">
        <h1 class="text-2xl font-bold text-terminal-green">Professional Journey</h1>
        <div class="border-l-2 border-terminal-green/30 pl-4 py-2">
          <h2 class="text-xl font-bold">Manohari Shop (Bangladesh)</h2>
          <p class="text-sm font-semibold opacity-80">Web & Data Analytics Intern | June 2023 - Present</p>
          <ul class="list-disc list-inside text-sm mt-3 space-y-2 opacity-70">
            <li>Engineered a high-performance sales dashboard using Python/Streamlit for inventory forecasting.</li>
            <li>Optimized data pipelines for real-time KPI visualization across business units.</li>
            <li>Collaborated on iterative UI/UX refinements for e-commerce interfaces.</li>
          </ul>
        </div>
      </div>
    `
  }),
  education: () => ({
    type: 'html',
    content: `
      <div class="space-y-6">
        <h1 class="text-2xl font-bold text-terminal-green">Academic Background</h1>
        <div class="space-y-4">
          <div>
            <h2 class="text-xl font-bold">Lovely Professional University, Punjab</h2>
            <p class="text-sm opacity-80 italic">B.Tech in Computer Science & Engineering (Batch 2022-2026)</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm opacity-70 mt-4">
             <div class="bg-terminal-green/5 p-2 border border-terminal-green/20 rounded">
                <span class="font-bold block">Cloud Computing Certification</span>
                <span>NPTEL, IIT Kharagpur (2025)</span>
             </div>
             <div class="bg-terminal-green/5 p-2 border border-terminal-green/20 rounded">
                <span class="font-bold block">DSA Specialist Certification</span>
                <span>GeeksforGeeks (2024)</span>
             </div>
             <div class="bg-terminal-green/5 p-2 border border-terminal-green/20 rounded">
                <span class="font-bold block">Web Dev Bootcamp (66 hrs)</span>
                <span>Udemy (2023)</span>
             </div>
             <div class="bg-terminal-green/5 p-2 border border-terminal-green/20 rounded">
                <span class="font-bold block">Generative AI Essentials</span>
                <span>Coursera (2024)</span>
             </div>
          </div>
        </div>
      </div>
    `
  }),
  socials: () => ({
    type: 'html',
    content: `
      <div class="space-y-4">
        <h1 class="text-2xl font-bold text-terminal-green">Connect with me</h1>
        <div class="flex flex-wrap gap-4">
          <a href="https://github.com/kanadkapil" target="_blank" class="hover:text-terminal-green hover:underline">[GitHub]</a>
          <a href="https://www.linkedin.com/in/kanad-kapil/" target="_blank" class="hover:text-terminal-green hover:underline">[LinkedIn]</a>
          <a href="https://twitter.com/kanad_kapil" target="_blank" class="hover:text-terminal-green hover:underline">[Twitter]</a>
          <a href="https://kanadkapil.vercel.app/" target="_blank" class="hover:text-terminal-green hover:underline">[Portfolio Site]</a>
        </div>
      </div>
    `
  }),
  color: (args) => {
    const color = args[0];
    if (['light', 'blue', 'green', 'red', 'violet', 'orange'].includes(color)) {
      return `Changed theme to ${color}`;
    }
    return "Invalid color option. Available: light, blue, green, red, violet, orange. Example: color blue";
  }
};

const Typewriter: React.FC<{ text: string; speed?: number; onComplete?: () => void }> = ({ text, speed = 5, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return <div className="whitespace-pre-wrap">{displayedText}</div>;
};

const App: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState('');
  const [themeColor, setThemeColor] = useState('text-terminal-green');
  const [borderColor, setBorderColor] = useState('border-terminal-green/50');
  const [glowColor, setGlowColor] = useState('shadow-[0_0_15px_rgba(34,197,94,0.3)]');
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [history, isTyping]);

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  const updateTheme = (color: string) => {
    switch (color) {
      case 'light':
        setThemeColor('text-white');
        setBorderColor('border-white/50');
        setGlowColor('shadow-[0_0_15px_rgba(255,255,255,0.3)]');
        break;
      case 'blue':
        setThemeColor('text-blue-500');
        setBorderColor('border-blue-500/50');
        setGlowColor('shadow-[0_0_15px_rgba(59,130,246,0.3)]');
        break;
      case 'red':
        setThemeColor('text-red-500');
        setBorderColor('border-red-500/50');
        setGlowColor('shadow-[0_0_15px_rgba(239,68,68,0.3)]');
        break;
      case 'violet':
        setThemeColor('text-violet-500');
        setBorderColor('border-violet-500/50');
        setGlowColor('shadow-[0_0_15px_rgba(139,92,246,0.3)]');
        break;
      case 'orange':
        setThemeColor('text-orange-500');
        setBorderColor('border-orange-500/50');
        setGlowColor('shadow-[0_0_15px_rgba(249,115,22,0.3)]');
        break;
      default:
        setThemeColor('text-terminal-green');
        setBorderColor('border-terminal-green/50');
        setGlowColor('shadow-[0_0_15px_rgba(34,197,94,0.3)]');
    }
  };

  const handleCommand = (cmdStr: string) => {
    const [name, ...args] = cmdStr.trim().toLowerCase().split(' ');
    
    if (name === 'clear') {
      setHistory([]);
      return;
    }

    let response: CommandResponse;
    const cmdFn = COMMANDS[name];

    if (cmdFn) {
      const result = cmdFn(args);
      if (typeof result === 'string') {
        response = { type: 'text', content: result };
      } else {
        response = result;
      }

      if (name === 'color' && args[0]) {
        updateTheme(args[0]);
      }
    } else {
      response = { type: 'text', content: `Command not found: ${name}` };
    }

    setIsTyping(true);
    setHistory(prev => [...prev, { command: cmdStr, response }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    handleCommand(input);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-mono">
      <div className="w-full max-w-4xl space-y-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "bg-[#0a0a0a] border-2 rounded-xl overflow-hidden flex flex-col h-[75vh] transition-all duration-500 backdrop-blur-sm bg-opacity-95",
            borderColor,
            glowColor,
            themeColor
          )}
        >
          <div className={cn("px-4 py-2 border-b flex items-center justify-between bg-black/80", borderColor)}>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="w-[1px] h-4 bg-white/10 mx-1" />
              <div className="flex items-center gap-2">
                <TerminalIcon size={14} className="opacity-70" />
                <span className="text-xs font-bold opacity-60 uppercase tracking-[0.2em]">user@kanad-kapil:~</span>
              </div>
            </div>
          </div>

          <div 
            ref={terminalRef}
            className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth custom-scrollbar"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="opacity-40 text-xs mb-8 space-y-1 font-bold tracking-widest uppercase">
              <p>System Initialized... Node Environment: Production</p>
              <p>Accessing Portfolio Data v2.0.0...</p>
              <p className="text-terminal-green">Welcome, Authorized Guest.</p>
            </div>

            <AnimatePresence mode="popLayout">
              {history.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-3 font-bold">
                    <span className="text-terminal-green opacity-40">❯</span>
                    <span className="opacity-90">{item.command}</span>
                  </div>
                  <div className="pl-6 opacity-90 leading-relaxed transition-all duration-300">
                    {item.response.type === 'text' ? (
                      <Typewriter 
                        text={item.response.content} 
                        onComplete={() => i === history.length - 1 && setIsTyping(false)} 
                      />
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onAnimationComplete={() => i === history.length - 1 && setIsTyping(false)}
                        dangerouslySetInnerHTML={{ __html: item.response.content }} 
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="flex items-center gap-3">
              <span className="text-terminal-green opacity-40 animate-pulse font-bold">❯</span>
              <input
                ref={inputRef}
                type="text"
                autoFocus
                disabled={isTyping}
                className="flex-1 bg-transparent border-none outline-none focus:ring-0 p-0 placeholder-white/10"
                placeholder={isTyping ? "..." : "Type a command..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </form>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center space-y-4"
        >
          <p className="text-terminal-green/50 text-sm font-medium italic">
            "Don't Hesitate... Just go for it..."
          </p>
          <div className="flex justify-center items-center gap-6 text-[10px] opacity-40 uppercase tracking-[0.3em] font-bold">
            <span className="hover:opacity-100 transition-opacity cursor-default">React 18</span>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <span className="hover:opacity-100 transition-opacity cursor-default">TypeScript</span>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <span className="hover:opacity-100 transition-opacity cursor-default">Tailwind CSS</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default App;
