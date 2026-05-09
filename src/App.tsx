/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { 
  Instagram, 
  Linkedin, 
  Twitter, 
  ChevronRight, 
  Mail, 
  ArrowRight,
  Globe,
  Zap,
  Users,
  Layout,
  MessageSquare,
  AlertCircle,
  Database
} from 'lucide-react';
import Hls from 'hls.js';
import { cn } from './lib/utils';

// --- Types ---
interface WordProps {
  children: string;
  progress: any;
  range: [number, number];
}

// --- Helpers ---
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

const Word = ({ children, progress, range, isHighlighted }: WordProps & { isHighlighted?: boolean }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span 
      style={{ opacity }} 
      className={cn(
        "inline-block mr-[0.25em]",
        isHighlighted ? "text-foreground" : "text-hero-subtitle opacity-60"
      )}
    >
      {children}
    </motion.span>
  );
};

// --- Components ---

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-16 py-8 flex items-center justify-between pointer-events-none">
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="relative w-7 h-7 border-2 border-white/60 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 border border-white/60 rounded-full" />
        </div>
        <span className="text-xl font-bold tracking-tight">Mindloop</span>
      </div>

      <div className="hidden md:flex items-center gap-6 pointer-events-auto text-sm">
        {["Home", "How It Works", "Philosophy", "Use Cases"].map((item, i) => (
          <React.Fragment key={item}>
            <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-white/50 hover:text-white transition-colors">
              {item}
            </a>
            {i < 3 && <span className="text-white/20">•</span>}
          </React.Fragment>
        ))}
      </div>

      <div className="flex items-center gap-3 pointer-events-auto">
        {[Instagram, Linkedin, Twitter].map((Icon, i) => (
          <button key={i} className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
            <Icon size={16} />
          </button>
        ))}
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center text-center px-6">
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0" style={{ background: 'radial-gradient(circle at 50% -20%, #333 0%, transparent 70%)' }} />
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 grayscale"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4" type="video/mp4" />
      </video>
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent z-[1]" />
      
      <div className="relative z-10 pt-20 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div 
          {...fadeUp(0.1)}
          className="flex items-center mb-8"
        >
          <div className="flex -space-x-3 mr-4">
            {[1, 2, 3].map((i) => (
              <img 
                key={i}
                src={`https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?w=100&h=100&fit=crop&q=80&sat=-100`}
                alt={`User ${i}`}
                className="w-8 h-8 rounded-full border-2 border-black object-cover"
              />
            ))}
          </div>
          <span className="text-white/60 text-xs font-medium tracking-wide uppercase">7,000+ people already subscribed</span>
        </motion.div>

        <motion.h1 
          {...fadeUp(0.2)}
          className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1] mb-8"
        >
          Get <span className="font-serif italic font-normal">Inspired</span> with Us
        </motion.h1>

        <motion.p 
          {...fadeUp(0.3)}
          className="text-lg md:text-xl max-w-xl mb-12 opacity-90"
          style={{ color: 'hsl(var(--hero-subtitle))' }}
        >
          Join our feed for meaningful updates, news around technology and a shared journey toward depth and direction.
        </motion.p>

        <motion.div 
          {...fadeUp(0.4)}
          className="w-full max-w-lg"
        >
          <div className="liquid-glass rounded-full p-2 flex items-center bg-white/[0.03]">
            <input 
              type="email" 
              placeholder="your@email.com" 
              className="flex-1 bg-transparent border-none outline-none px-6 text-white text-sm placeholder:text-white/30"
            />
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-black font-bold rounded-full px-8 py-3 text-xs tracking-widest uppercase"
            >
              SUBSCRIBE
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PlatformSection = () => {
  const platforms = [
    { name: "ChatGPT", desc: "The frontier of conversational intelligence.", icon: "https://placehold.co/200x200/000000/FFFFFF?text=ChatGPT" },
    { name: "Perplexity", desc: "Real-time answers, sourced with precision.", icon: "https://placehold.co/200x200/000000/FFFFFF?text=Perplexity" },
    { name: "Google AI", desc: "The global brain, reaching new dimensions.", icon: "https://placehold.co/200x200/000000/FFFFFF?text=Google+AI" },
  ];

  return (
    <section className="pt-52 md:pt-64 pb-20 px-8 md:px-28">
      <div className="text-center mb-32">
        <motion.h2 
          {...fadeUp(0.1)}
          className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-2px] mb-8"
        >
          Search has <span className="font-serif italic font-normal">changed.</span> Have you?
        </motion.h2>
        <motion.p 
          {...fadeUp(0.2)}
          className="text-muted-foreground text-lg max-w-2xl mx-auto"
        >
          The way we consume information is evolving. We no longer just browse; we interact, we refine, and we discover.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-20 max-w-6xl mx-auto">
        {platforms.map((p, i) => (
          <motion.div 
            key={p.name}
            {...fadeUp(0.2 + i * 0.1)}
            className="flex flex-col items-center text-center"
          >
            <div className="w-[200px] h-[200px] mb-8 flex items-center justify-center p-4">
               <img src={p.icon} alt={p.name} className="w-full h-full object-contain grayscale" />
            </div>
            <h3 className="font-semibold text-base mb-2">{p.name}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.p 
        {...fadeUp(0.5)}
        className="text-muted-foreground text-sm text-center"
      >
        If you don't answer the questions, someone else will.
      </motion.p>
    </section>
  );
};

const MissionSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const text1 = "We're building a space where curiosity meets clarity — where readers find depth, writers find reach, and every newsletter becomes a conversation worth having.";
  const text2 = "A platform where content, community, and insight flow together — with less noise, less friction, and more meaning for everyone involved.";

  const words1 = text1.split(" ");
  const words2 = text2.split(" ");

  const highlightWords = ["curiosity", "meets", "clarity"];

  return (
    <section ref={containerRef} className="pt-0 pb-32 md:pb-44 px-8 md:px-28 flex flex-col items-center">
      <div className="w-full max-w-3xl aspect-square mb-20">
         <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover grayscale opacity-80"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4" type="video/mp4" />
          </video>
      </div>

      <div className="max-w-4xl text-center">
        <p className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-[-1px] leading-tight mb-12">
          {words1.map((word, i) => {
            const start = i / words1.length;
            const end = (i + 1) / words1.length;
            const isHighlighted = highlightWords.includes(word.toLowerCase().replace(/[^a-z]/g, ""));
            return (
              <Word key={i} progress={scrollYProgress} range={[start * 0.4, end * 0.4]} isHighlighted={isHighlighted}>
                {word}
              </Word>
            );
          })}
        </p>

        <p className="text-xl md:text-2xl lg:text-3xl font-medium text-hero-subtitle">
          {words2.map((word, i) => {
            const start = i / words2.length;
            const end = (i + 1) / words2.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[0.5 + start * 0.4, 0.5 + end * 0.4]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
};

const SolutionSection = () => {
  const features = [
    { title: "Curated Feed", desc: "Only the signal, none of the noise. Tailored to your interests.", icon: Zap },
    { title: "Writer Tools", desc: "Powerful analytics and distribution built for modern creators.", icon: Layout },
    { title: "Community", desc: "Meaningful discussions around the content you love.", icon: Users },
    { title: "Distribution", desc: "Reach your audience where they are, from email to web.", icon: Globe },
  ];

  return (
    <section className="py-32 md:py-44 border-t border-border/30 px-8 md:px-28">
      <div className="max-w-6xl mx-auto">
        <motion.span 
          {...fadeUp(0.1)}
          className="text-xs tracking-[3px] uppercase text-muted-foreground block mb-6"
        >
          SOLUTION
        </motion.span>
        <motion.h2 
          {...fadeUp(0.2)}
          className="text-4xl md:text-6xl font-medium mb-16"
        >
          The platform for <span className="font-serif italic font-normal">meaningful</span> content
        </motion.h2>

        <motion.div 
          {...fadeUp(0.3)}
          className="w-full aspect-[3/1] bg-muted/20 rounded-2xl overflow-hidden mb-20"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={f.title}
              {...fadeUp(0.4 + i * 0.1)}
              className="space-y-4"
            >
              <f.icon className="text-foreground" size={24} strokeWidth={1.5} />
              <h3 className="font-semibold text-base">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const hlsUrl = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(hlsUrl);
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = hlsUrl;
      }
    }
  }, []);

  return (
    <section className="relative py-32 md:py-44 border-t border-border/30 overflow-hidden px-8">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 grayscale"
      />
      <div className="absolute inset-0 bg-background/60 z-[1]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <motion.div 
           {...fadeUp(0.1)}
           className="relative w-10 h-10 border-2 border-foreground/60 rounded-full flex items-center justify-center mb-8"
        >
          <div className="w-5 h-5 border border-foreground/60 rounded-full" />
        </motion.div>

        <motion.h2 
          {...fadeUp(0.2)}
          className="text-4xl md:text-6xl font-medium mb-8"
        >
          Start Your <span className="font-serif italic font-normal">Journey</span>
        </motion.h2>

        <motion.p 
          {...fadeUp(0.3)}
          className="text-muted-foreground text-lg mb-12 max-w-xl"
        >
          Join thousands of readers and writers who are redefining what it means to be informed.
        </motion.p>

        <motion.div 
          {...fadeUp(0.4)}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button className="bg-foreground text-background font-bold rounded-lg px-8 py-3.5 hover:opacity-90 transition-opacity">
            Subscribe Now
          </button>
          <button className="liquid-glass rounded-lg px-8 py-3.5 hover:bg-white/5 transition-colors font-medium">
            Start Writing
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-16 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
      <p className="text-white/40 text-[10px] uppercase tracking-[0.25em]">
        © 2026 Mindloop. All rights reserved.
      </p>
      <div className="flex items-center gap-8 text-white/40 text-[10px] uppercase tracking-[0.25em]">
        {["Privacy", "Terms", "Contact"].map((item) => (
          <a key={item} href="#" className="hover:text-white transition-colors">
            {item}
          </a>
        ))}
      </div>
    </footer>
  );
};

const ConvexConnectionWarning = () => {
  const convexUrl = import.meta.env.VITE_CONVEX_URL;
  if (convexUrl && (convexUrl.includes("convex.cloud") || convexUrl.includes("convex.site"))) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[60] max-w-sm">
      <div className="liquid-glass p-4 rounded-2xl flex gap-4 items-start border border-white/10 bg-black/40">
        <div className="bg-white/10 p-2 rounded-full">
          <AlertCircle size={20} className="text-white" />
        </div>
        
      </div>
    </div>
  );
};

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <PostsSectionContent isErrorState={true} />;
    }
    return this.props.children;
  }
}

const PostsSectionContent = ({ isErrorState }: { isErrorState?: boolean }) => {
  const articles = isErrorState ? undefined : useQuery(api.articles.getPublishedArticles);
  
  // High-quality sample data to ensure the UI looks great even before the first Convex sync
  const sampleArticles = [
    {
      _id: "s1",
      title: "The Architecture of Depth",
      description: "How we're moving away from algorithmic feeds toward intentional curation and deep-form content.",
      category: "Philosophy",
    },
    {
      _id: "s2",
      title: "Agents and the New Web",
      description: "Exploring a future where personal AI agents navigate the information landscape on our behalf.",
      category: "Technology",
    },
    {
      _id: "s3",
      title: "Building Mindloop",
      description: "The story behind our monochrome aesthetic and why we chose clarity over color.",
      category: "Internal",
    }
  ];

  const displayArticles = articles && articles.length > 0 ? articles : sampleArticles;

  return (
    <section className="py-32 md:py-44 border-t border-white/10 px-8 md:px-28">
      <div className="max-w-6xl mx-auto">
        <motion.span 
          {...fadeUp(0.1)}
          className="text-xs tracking-[3px] uppercase text-white/40 block mb-6"
        >
          {articles && articles.length > 0 ? "LATEST POSTS" : "FEATURED CONTENT"}
        </motion.span>
        <motion.h2 
          {...fadeUp(0.2)}
          className="text-4xl md:text-6xl font-medium mb-16"
        >
          Fresh <span className="font-serif italic font-normal">Perspectives</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {displayArticles.map((article: any, i: number) => (
            <motion.div 
              key={article._id}
              {...fadeUp(0.3 + i * 0.1)}
              className="liquid-glass p-8 rounded-2xl group cursor-pointer hover:bg-white/[0.03] transition-colors"
            >
              <span className="text-xs text-white/40 uppercase tracking-widest block mb-4">{article.category}</span>
              <h3 className="text-xl font-medium mb-4 group-hover:text-white transition-colors">{article.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3">{article.description}</p>
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white group-hover:gap-4 transition-all">
                Read More <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
        
        {(!articles || articles.length === 0) && (
          <motion.div 
            {...fadeUp(0.6)}
            className="mt-12 flex items-center justify-center gap-3 text-white/20"
          >
            <Database size={16} />
            <p className="text-xs tracking-wide">Showing featured content • Sync your Convex backend to go live</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black font-sans">
      <Navbar />
      <main>
        <Hero />
        <PlatformSection />
        <MissionSection />
        <SolutionSection />
        <ErrorBoundary>
          <PostsSectionContent />
        </ErrorBoundary>
        <CTASection />
      </main>
      <Footer />
      <ConvexConnectionWarning />
    </div>
  );
}
