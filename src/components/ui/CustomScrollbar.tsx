import React, { useEffect, useRef, useState } from 'react';

interface ScrollbarProps {
  sections?: string[];
}

const CustomScrollbar: React.FC<ScrollbarProps> = ({ sections = ['hero', 'projects', 'about'] }) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to update scroll position
    const handleScroll = () => {
      // Calculate how far down the page the user has scrolled
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScrollPercentage = (scrollTop / scrollHeight) * 100;
      
      setScrollPercentage(currentScrollPercentage);
      
      // Determine which section is active
      const sectionHeight = scrollHeight / sections.length;
      const currentSection = Math.min(
        Math.floor(scrollTop / sectionHeight),
        sections.length - 1
      );
      setActiveSection(currentSection);
    };

    // Listen for both regular scroll and our custom lenisScroll events
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('lenisScroll', handleScroll);
    
    // Initialize position
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('lenisScroll', handleScroll);
    };
  }, [sections]);

  useEffect(() => {
    // Update the thumb position
    if (thumbRef.current) {
      thumbRef.current.style.height = `${20 + (scrollPercentage * 0.4)}px`;
      thumbRef.current.style.top = `${scrollPercentage}%`;
    }
  }, [scrollPercentage]);

  return (
    <>
      {/* Custom scrollbar */}
      <div className="custom-scrollbar">
        <div className="custom-scrollbar-track"></div>
        <div 
          ref={thumbRef} 
          className="custom-scrollbar-thumb" 
          style={{ top: `${scrollPercentage}%`, height: '20px' }}
        ></div>
      </div>
      
      {/* Section indicators */}
      <div className="scroll-indicator">
        {sections.map((section, index) => (
          <div
            key={section}
            className={`scroll-indicator-dot ${index === activeSection ? 'active' : ''}`}
            title={section}
          ></div>
        ))}
      </div>
    </>
  );
};

export default CustomScrollbar;
