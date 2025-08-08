import { useLayoutEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomScrollbar from '../ui/CustomScrollbar';

const AppLayout = () => {
  const lenisRef = useRef<any>(null);
  
  useLayoutEffect(() => {
    // Register GSAP plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis with configuration to handle smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false, // Don't use infinite scrolling
    });
    
    // Store reference to lenis instance
    lenisRef.current = lenis;

    // Basic scroll loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Connect GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    
    // Make scroll events available to window for the custom scrollbar
    lenis.on('scroll', ({ scroll }: any) => {
      // Update window.scrollY so our CustomScrollbar can detect scroll position
      window.scrollY = scroll;
      
      // Create a custom event instead of a generic scroll event to avoid recursion
      // This prevents the infinite loop that occurs when a scroll event triggers Lenis
      // which then triggers another scroll event
      const customScrollEvent = new CustomEvent('lenisScroll', { detail: { scroll } });
      window.dispatchEvent(customScrollEvent);
    });
    
    // Make sure ScrollTrigger and all animations are properly initialized
    gsap.delayedCall(0.1, () => {
      ScrollTrigger.refresh(true);
    });

    // Cleanup on component unmount
    return () => {
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div id="app-container" className="flex flex-col w-full min-h-screen relative">
      <CustomScrollbar sections={['Hero', 'Projects', 'About', 'Contact']} />
      <Navbar />
      <main className="flex-grow w-full relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;