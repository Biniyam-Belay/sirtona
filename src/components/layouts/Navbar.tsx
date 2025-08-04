import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const servicesContainerRef = useRef<HTMLDivElement>(null);
  const contactButtonRef = useRef<HTMLAnchorElement>(null);
  const hoverTimeoutRef = useRef<number | null>(null);

  // Services data with icons
  const services = [
    { 
      name: 'Web Development', 
      href: '/services/web-development',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      description: 'Custom websites and web applications'
    },
    { 
      name: 'Mobile Apps', 
      href: '/services/mobile-apps',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
        </svg>
      ),
      description: 'Native and cross-platform mobile solutions'
    },
    { 
      name: 'E-commerce', 
      href: '/services/ecommerce',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      description: 'Complete online store solutions'
    },
    { 
      name: 'Digital Marketing', 
      href: '/services/digital-marketing',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      description: 'Grow your online presence and reach'
    },
    { 
      name: 'Consulting', 
      href: '/services/consulting',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      description: 'Strategic technology guidance'
    },
    { 
      name: 'Maintenance', 
      href: '/services/maintenance',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      description: 'Keep your digital assets running smoothly'
    }
  ];

  // Initial animations
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate navbar on mount
      gsap.fromTo(navRef.current, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );

      // Animate nav items
      gsap.fromTo('.nav-item', 
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.5, ease: 'power2.out' }
      );

      // Contact button hover animations
      const contactButton = contactButtonRef.current;
      if (contactButton) {
        const handleMouseEnter = () => {
          gsap.to(contactButton, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
          });
        };

        const handleMouseLeave = () => {
          gsap.to(contactButton, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        };

        contactButton.addEventListener('mouseenter', handleMouseEnter);
        contactButton.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          contactButton.removeEventListener('mouseenter', handleMouseEnter);
          contactButton.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }, navRef);

    return () => {
      ctx.revert();
      // Clear timeout on unmount
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
    };
  }, []);

  // Services dropdown animations
  useEffect(() => {
    const dropdown = servicesDropdownRef.current;
    const overlay = overlayRef.current;
    if (!dropdown || !overlay) return;

    if (isServicesOpen) {
      gsap.set(overlay, { display: 'block' });
      gsap.to(overlay, { opacity: 1, duration: 0.4, ease: 'power2.out' });
      
      gsap.set(dropdown, { display: 'block' });
      gsap.to(dropdown, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power3.out'
      });
      
      // Animate left column items
      gsap.fromTo('.service-item',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.07, delay: 0.2, ease: 'power2.out' }
      );

      // Animate right column
      gsap.fromTo('.services-right-col',
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, delay: 0.3, ease: 'power2.out' }
      );

    } else {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => gsap.set(overlay, { display: 'none' })
      });
      gsap.to(dropdown, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(dropdown, { display: 'none' });
        }
      });
    }
  }, [isServicesOpen]);

  const handleServicesMouseEnter = () => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (!isServicesOpen) {
      setIsServicesOpen(true);
    }
  };

  const handleServicesMouseLeave = () => {
    // Add a delay before closing to allow navigation to dropdown
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsServicesOpen(false);
    }, 300);
  };

  const handleDropdownMouseEnter = () => {
    // Clear timeout when entering dropdown
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (!isServicesOpen) {
      setIsServicesOpen(true);
    }
  };

  const handleDropdownMouseLeave = () => {
    // Add a small delay before closing to prevent flickering
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsServicesOpen(false);
    }, 100);
  };

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 hidden"
        style={{ opacity: 0 }}
        onClick={() => setIsServicesOpen(false)}
      />
      <header ref={navRef} className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 z-50">
        <nav className="container mx-auto px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo with increased left margin */}
            <div className="ml-8">
              <Link to="/" className="nav-item text-2xl font-bold text-black hover:text-gray-700 transition-colors duration-300">
                Sirtona
              </Link>
            </div>

            {/* Center Navigation - moved closer to logo */}
            <div className="hidden lg:flex items-center space-x-12 ml-16">
              {/* Services with Full-width Dropdown */}
              <div 
                ref={servicesContainerRef}
                className="relative"
              >
                <button 
                  className="nav-item text-black hover:text-gray-600 transition-colors duration-300 font-medium flex items-center space-x-1 relative group"
                  onMouseEnter={handleServicesMouseEnter}
                  onMouseLeave={handleServicesMouseLeave}
                >
                  <span>Services</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </button>
                
                {/* Full-width Dropdown Menu - Compact & Animated */}
                <div
                  ref={servicesDropdownRef}
                  className="fixed top-16 left-0 w-full bg-white shadow-lg border-b border-gray-200 hidden z-50"
                  style={{ display: 'none' }}
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  <div className="container mx-auto max-w-5xl px-8">
                    <div className="grid grid-cols-12 gap-x-6 py-6">
                      {/* Left Column: Services List */}
                      <div className="col-span-7">
                        <div className="grid grid-cols-2 gap-4">
                          {services.map((service) => (
                            <Link
                              key={service.name}
                              to={service.href}
                              className="service-item group p-4 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-100"
                            >
                              <div className="flex items-start space-x-3">
                                <div className="text-black flex-shrink-0 w-6 h-6 group-hover:text-blue-600 transition-colors duration-200">
                                  {service.icon}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-sm text-black mb-1 group-hover:text-blue-600 transition-colors duration-200">
                                    {service.name}
                                  </h3>
                                  <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-200">
                                    {service.description}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Right Column: CTA and Links */}
                      <div className="services-right-col col-span-5 bg-gray-50/70 rounded-xl p-6 flex flex-col justify-between">
                        <div className="mb-6">
                          <h3 className="font-bold text-md text-black mb-4">Ready to Start?</h3>
                          <Link to="/pricing" className="group block bg-gradient-to-r from-blue-500 to-indigo-600 p-5 rounded-lg text-white hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-bold text-lg">View Our Plans</p>
                                <p className="text-sm opacity-90">Find the perfect fit for your project.</p>
                              </div>
                              <svg className="w-8 h-8 opacity-80 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </div>
                          </Link>
                        </div>
                        
                        <div className="border-t border-gray-200 pt-5">
                          <h4 className="font-semibold text-sm text-black">Stay Updated</h4>
                          <p className="text-xs text-gray-600 mt-1 mb-3">Get our latest news and special offers.</p>
                          <form className="flex items-center">
                            <input type="email" placeholder="your.email@example.com" className="w-full px-3 py-2 text-xs border border-gray-300 rounded-l-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition" />
                            <button type="submit" className="bg-black text-white px-3 py-2 text-xs font-semibold rounded-r-md hover:bg-gray-800 transition-colors">
                              Subscribe
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link to="/pricing" className="nav-item text-black hover:text-gray-600 transition-colors duration-300 font-medium relative group">
                Pricing
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/blog" className="nav-item text-black hover:text-gray-600 transition-colors duration-300 font-medium relative group">
                Blog
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            {/* Contact Button with increased right margin */}
            <div className="mr-8">
              <Link 
                ref={contactButtonRef}
                to="/contact" 
                className="nav-item bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden nav-item text-black hover:text-gray-600 transition-colors duration-300 mr-8">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;