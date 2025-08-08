import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getSiteSettings } from '../../sevices/wordpressService';
import type { TSiteSettings } from '../../types/wordpress';

// Import video
import heroBgVideo from '../../assets/herobg.mp4';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const [siteSettings, setSiteSettings] = useState<TSiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Refs for animations
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const heroSubtitleRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video and Scroll Animation
  useLayoutEffect(() => {
    if (!isLoading && videoRef.current && heroSectionRef.current && heroTitleRef.current && heroSubtitleRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      tl.to(videoRef.current, {
        scale: 1.5, // Reduced scale to prevent extreme overflow
        ease: 'power1.inOut',
      }, 0)
      .to([heroTitleRef.current, heroSubtitleRef.current], {
        y: -200, // Reduced movement to prevent overflow
        ease: 'power1.inOut',
      }, 0);
      
      // Refresh ScrollTrigger
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

      // Cleanup
      return () => {
        tl.kill();
      };
    }
  }, [isLoading]);

  // Fetch WordPress settings
  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        console.log('HeroSection mounted - fetching site settings...');
        const settings = await getSiteSettings();
        setSiteSettings(settings);
        console.log('Site settings loaded:', settings);
      } catch (error) {
        console.error('Failed to fetch site settings:', error);
        // Set fallback data on error so component doesn't stay loading forever
        setSiteSettings({
          siteName: 'SIRTONA',
          siteDescription: 'Crafting digital experiences that transform your vision into reality.',
          logo: { url: '', altText: '' },
          contactInfo: { email: '', phone: '', address: '', businessHours: '' },
          socialLinks: {},
          currency: { symbol: 'Br', code: 'ETB' }
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSiteSettings();
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (isLoading || !heroSectionRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([heroTitleRef.current, heroSubtitleRef.current], {
        opacity: 0,
        x: -100
      });

      // Main animation timeline
      const tl = gsap.timeline({ delay: 0.8 });

      tl.to(heroTitleRef.current, {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: "power3.out"
      })
      .to(heroSubtitleRef.current, {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.8");

    }, heroSectionRef);
    
    return () => ctx.revert();
  }, [isLoading]);

  // Dynamic content with fallbacks
  const heroTitle = siteSettings?.siteName || "SIRTONA";
  const heroDescription = siteSettings?.siteDescription || 
    "Crafting digital experiences that transform your vision into reality.";

  if (isLoading) {
    return (
      <section className="relative w-full h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white font-light text-sm">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={heroSectionRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Video Background Container with Overflow Hidden */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: 'scale(1.1)', transformOrigin: 'center center' }}
        >
          <source src={heroBgVideo} type="video/mp4" />
        </video>
      </div>

      {/* Enhanced Premium Glassy Overlay with Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/50 z-10"></div>
      <div className="absolute inset-0 backdrop-blur-[0.1px] z-10"></div>
      
      {/* Decorative Gradient Elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl z-5"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl z-5"></div>

      {/* Premium Hero Content */}
      <div className="relative z-20 px-8 md:px-16 lg:px-24 pb-12 md:pb-16 lg:pb-20 xl:pb-24 w-full max-w-screen-2xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between h-full pt-32">
        
        {/* Left Content Area with Title */}
        <div className="md:w-3/5 lg:w-1/2">
          {/* Decorative Elements */}
          <div className="hidden md:block absolute top-48 left-16 w-20 h-20 border-t-2 border-l-2 border-white/30"></div>
          <div className="hidden md:block absolute bottom-32 left-12 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl"></div>
          
          {/* Main Title with Premium Styling */}
          <div ref={heroTitleRef} className="relative backdrop-blur-sm bg-black/10 p-8 md:p-10 border-l-2 border-white/20 rounded-sm mb-8">
            <div className="absolute -top-2 -left-2 w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
            <span className="block text-white font-light tracking-widest text-sm md:text-base uppercase mb-2">{heroTitle}</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tighter">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-white">
                DIGITAL
              </span>
              <span className="block text-white font-black uppercase -mt-2 md:-mt-4">
                SOLUTIONS
              </span>
            </h1>
          </div>

          {/* Subtitle with Enhanced Styling */}
          <div ref={heroSubtitleRef} className="max-w-lg ml-8 md:ml-10">
            <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed backdrop-blur-sm p-4 border-l border-white/20">
              {heroDescription}
            </p>
            
            {/* CTA Button */}
            <div className="mt-8 flex items-center">
              <a href="#portfolio" className="inline-flex items-center px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-sm text-white transition duration-300 group">
                <span>View our work</span>
                <svg className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <div className="ml-6 w-12 h-px bg-gradient-to-r from-white/80 to-white/0"></div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Stats/Features */}
        <div className="hidden md:flex flex-col items-end mt-10 md:mt-0">
          <div className="backdrop-blur-md bg-white/5 p-6 border border-white/10 rounded-sm">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-4xl font-light text-white mb-1">10<span className="text-blue-400">+</span></p>
                <p className="text-xs uppercase tracking-wider text-white/60">Years Experience</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-light text-white mb-1">150<span className="text-blue-400">+</span></p>
                <p className="text-xs uppercase tracking-wider text-white/60">Projects Completed</p>
              </div>
            </div>
          </div>
          <div className="mt-4 text-right">
            <p className="text-xs text-white/40 tracking-widest">PREMIUM DIGITAL EXPERIENCES</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
        <p className="text-xs text-white/60 tracking-widest mb-2">SCROLL</p>
        <div className="w-px h-8 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
}

export default HeroSection;
