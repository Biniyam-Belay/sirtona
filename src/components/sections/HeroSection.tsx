import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { getSiteSettings } from '../../sevices/wordpressService';
import type { TSiteSettings } from '../../types';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [siteSettings, setSiteSettings] = useState<TSiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const settings = await getSiteSettings();
        setSiteSettings(settings);
      } catch (err) {
        console.error('Failed to load site settings:', err);
        // Use fallback settings
        setSiteSettings({
          siteName: 'Sirtona',
          siteDescription: 'Digital Solutions for Ethiopia\'s Innovators',
          logo: {
            url: '/logo.png',
            altText: 'Sirtona Logo'
          },
          contactInfo: {
            email: 'hello@sirtona.com',
            phone: '+251 91 234 5678',
            address: 'Addis Ababa, Ethiopia',
            businessHours: 'Mon-Fri 9:00 AM - 6:00 PM'
          },
          socialLinks: {},
          currency: {
            symbol: 'ETB',
            code: 'ETB'
          }
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSiteSettings();
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!siteSettings) return;
    
    // A GSAP context allows for safe cleanup
    const ctx = gsap.context(() => {
      // Create a timeline for sequenced animations
      const tl = gsap.timeline();
      
      tl.fromTo(
        '.hero-headline',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(
        '.hero-subheadline',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        "-=0.5" // Start 0.5s before the previous animation ends
      )
      .fromTo(
        '.hero-cta',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
        "-=0.4"
      );

    }, containerRef); // Scope animations to this component

    // Cleanup function
    return () => ctx.revert();
  }, [siteSettings]);

  if (isLoading) {
    return (
      <section className="bg-gray-100 h-[calc(100vh-4rem)] flex items-center justify-center text-center">
        <div className="container mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-16 bg-gray-300 rounded mb-4 mx-auto max-w-4xl"></div>
            <div className="h-6 bg-gray-300 rounded mb-8 mx-auto max-w-2xl"></div>
            <div className="h-12 bg-gray-300 rounded-full mx-auto max-w-xs"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef} 
      className="bg-gray-100 h-[calc(100vh-4rem)] flex items-center justify-center text-center"
    >
      <div className="container mx-auto px-6">
        <h1 className="hero-headline text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          {siteSettings?.siteDescription || 'Digital Solutions for Ethiopia\'s Innovators'}
        </h1>
        <p className="hero-subheadline text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          We build stunning websites, powerful digital products, and provide resources to help your business thrive.
        </p>
        <button className="hero-cta bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transform transition-transform duration-300 hover:scale-105">
          Get Started Today
        </button>
      </div>
    </section>
  );
};

export default HeroSection;