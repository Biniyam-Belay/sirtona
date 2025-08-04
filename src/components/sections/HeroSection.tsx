import { useRef } from 'react';
import gsap from 'gsap';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftTextRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 });
      gsap.fromTo('.hero-accent', { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power3.out', delay: 0.7, transformOrigin: 'left' });
      gsap.fromTo(rightTextRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.7 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[90vh] min-h-[600px] bg-white flex items-end justify-between overflow-hidden font-[Nunito,sans-serif]"
    >
      {/* Rotated/Masked Background Image */}
      <img
        src="/vite.svg" // Replace with your hero image
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-80 pointer-events-none select-none z-0 rotate-2 scale-105"
        style={{ maskImage: 'linear-gradient(to top, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 80%, transparent 100%)', filter: 'blur(0.5px) saturate(1.1)' }}
      />
      {/* White overlay for clarity */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />

      {/* Bottom Left Text */}
      <div
        ref={leftTextRef}
        className="absolute bottom-16 left-8 md:left-20 z-20 max-w-xl text-left"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-black mb-4 leading-tight tracking-tight relative">
          Build Your <span className="text-blue-600">Vision</span>
          <div ref={accentRef} className="hero-accent absolute left-0 -bottom-2 h-2 w-32 bg-blue-500 rounded-full scale-x-0" />
          <br />With Sirtona
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 mt-6 max-w-lg">
          We create digital experiences that inspire, engage, and deliver results for modern brands and startups.
        </p>
      </div>

      {/* Bottom Right Text - Glassmorphism Info Box */}
      <div
        ref={rightTextRef}
        className="absolute bottom-16 right-8 md:right-20 z-20 max-w-xs text-right hidden md:block"
      >
        <div className="inline-block bg-white/60 backdrop-blur-md rounded-2xl px-8 py-6 shadow-2xl border border-gray-100 ring-1 ring-blue-100">
          <span className="block text-xs text-gray-500 mb-1 tracking-widest uppercase">Featured Project</span>
          <span className="block text-xl font-bold text-black mb-1">Ethiopian Startups Portal</span>
          <span className="block text-base text-blue-600 font-semibold">Launched 2025</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;4