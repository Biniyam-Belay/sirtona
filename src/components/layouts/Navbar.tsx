import { Link } from 'react-router-dom';
import { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { RiMenu3Line, RiCloseLine, RiLinkedinFill, RiTwitterXFill, RiInstagramFill, RiGithubFill } from 'react-icons/ri';

const Navbar = () => {
  // State & Refs
  const navRef = useRef<HTMLElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Menu animation functions - defined without dependencies first
  const closeMenuAnimation = (onComplete: () => void) => {
    if (!menuOverlayRef.current) return;
    
    const tl = gsap.timeline({ onComplete });
    
    tl.to('.menu-item',
      { y: -20, opacity: 0, duration: 0.2, stagger: 0.03, ease: 'power2.in' }
    )
    .to(menuContentRef.current,
      { y: -30, opacity: 0, duration: 0.3, ease: 'power2.in' },
      '-=0.1'
    )
    .to(menuOverlayRef.current,
      { opacity: 0, duration: 0.3, ease: 'power2.in' },
      '-=0.2'
    );
  };
  
  const openMenuAnimation = () => {
    if (!menuOverlayRef.current) return;
    
    // Ensure display is set before animation
    gsap.set(menuOverlayRef.current, { 
      display: 'flex',
      visibility: 'visible' 
    });
    
    const tl = gsap.timeline();
    
    tl.fromTo(menuOverlayRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    )
    .fromTo(menuContentRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
      '-=0.1'
    )
    .fromTo('.menu-item',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' },
      '-=0.2'
    );
  };
  
  // Memoized action handlers that use the animations
  const closeMenu = useCallback(() => {
    if (!isMenuOpen) return;
    
    closeMenuAnimation(() => {
      setIsMenuOpen(false);
      if (menuOverlayRef.current) {
        gsap.set(menuOverlayRef.current, { display: 'none' });
      }
      // Re-enable scrolling
      document.body.style.overflow = '';
    });
  }, [isMenuOpen]);
  
  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
    openMenuAnimation();
  }, []);

  // Toggle menu handler
  const toggleMenu = useCallback(() => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [isMenuOpen, closeMenu, openMenu]);
  
  // Handle scroll locking and keyboard shortcuts
  useEffect(() => {
    // Lock/unlock body scroll based on menu state
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    
    // Set up ESC key listener
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };
    
    // Set up scroll listener (only when menu is open)
    const handleScroll = () => {
      if (window.scrollY > 50 && isMenuOpen) {
        closeMenu();
      }
    };
    
    // Add event listeners
    window.addEventListener('keydown', handleEscKey);
    if (isMenuOpen) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleEscKey);
      window.removeEventListener('scroll', handleScroll);
      // Safety measure to ensure scrolling is re-enabled
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, closeMenu]);

  // Services data
  const services = [
    { name: 'Web Development', href: '/services/web-development' },
    { name: 'Mobile Apps', href: '/services/mobile-apps' },
    { name: 'E-commerce', href: '/services/ecommerce' },
    { name: 'Digital Marketing', href: '/services/digital-marketing' },
    { name: 'UI/UX Design', href: '/services/ui-ux-design' },
    { name: 'Consulting', href: '/services/consulting' }
  ];

  const mainMenuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ];

  const socialLinks = [
    { name: 'LinkedIn', href: '#', icon: RiLinkedinFill },
    { name: 'Twitter', href: '#', icon: RiTwitterXFill },
    { name: 'Instagram', href: '#', icon: RiInstagramFill },
    { name: 'GitHub', href: '#', icon: RiGithubFill }
  ];

  // Close menu when clicking on a link - using useCallback for stability
  const handleLinkClick = useCallback(() => {
    if (isMenuOpen) {
      closeMenu();
    }
  }, [isMenuOpen, closeMenu]);

  return (
    <>
      {/* Main Navbar - Permanently fixed at top-4 position */}
      <header 
        ref={navRef} 
        className="fixed left-0 w-full top-4 bg-transparent z-[100] transition-all duration-500 px-4"
        role="banner"
      >
        <nav 
          className="flex justify-between items-center px-8 md:px-12 lg:px-16 py-5 max-w-screen-2xl mx-auto transition-all duration-500"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link to="/" className="group flex items-center">
            <span className="w-8 h-8 flex items-center justify-center border-2 border-white/80 rounded-sm mr-3 overflow-hidden group-hover:border-blue-400 transition-all duration-300">
              <span className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors duration-300">S</span>
            </span>
            <span className="text-xl font-semibold text-white tracking-wider group-hover:text-blue-200 transition-colors duration-300 drop-shadow-lg">
              Sirtona
            </span>
          </Link>

          {/* Hamburger Menu */}
          <button
            onClick={toggleMenu}
            className="text-white hover:text-blue-200 transition-all duration-500 z-[110] relative transform hover:scale-105 rounded-sm p-2 border border-white/20 hover:border-blue-400/40"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <div className="relative w-7 h-7 flex items-center justify-center">
              <div className={`absolute transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-0 rotate-180 scale-75' : 'opacity-100 rotate-0 scale-100'}`}>
                <RiMenu3Line className="w-7 h-7" />
              </div>
              <div className={`absolute transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-75'}`}>
                <RiCloseLine className="w-8 h-8" />
              </div>
            </div>
          </button>
        </nav>
      </header>

      {/* Full Screen Menu Overlay */}
      <div
        ref={menuOverlayRef}
        className={`fixed inset-0 bg-black/90 backdrop-blur-lg z-[90] hidden items-center justify-center`}
        style={{ display: 'none' }}
        onClick={(e) => {
          // Close menu when clicking the overlay (outside menu content)
          if (e.target === e.currentTarget) {
            closeMenu();
          }
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
      >
        <div
          ref={menuContentRef}
          className="w-full h-full flex items-center justify-center px-4 py-16 md:px-12 md:py-20 lg:px-20 lg:py-24"
          style={{ paddingTop: 'max(4rem, 15vh)', paddingBottom: 'max(4rem, 10vh)' }}
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside from bubbling up
        >
          <div className="max-w-5xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-stretch w-full">
              
              {/* Right Column (reordered for mobile) */}
              <div className="w-full space-y-6 md:space-y-8 lg:order-last">
                {/* Navigation */}
                <div className="w-full">
                  <h3 className="text-base font-semibold text-white/60 mb-5 uppercase tracking-widest">Main Menu</h3>
                  <ul className="space-y-4">
                    {mainMenuItems.map((item, index) => (
                      <li key={index} className="menu-item">
                        <Link
                          to={item.href}
                          onClick={handleLinkClick}
                          className="group text-2xl md:text-3xl lg:text-4xl font-light text-white hover:text-white/70 transition-all duration-500 block relative overflow-hidden"
                        >
                          <span className="block transform transition-transform duration-500 group-hover:translate-x-4">
                            {item.name}
                          </span>
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-500 group-hover:w-full"></div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services */}
                <div className="w-full">
                  <h3 className="text-base font-semibold text-white/60 mb-5 uppercase tracking-widest">Services</h3>
                  <ul className="grid grid-cols-2 gap-4">
                    {services.map((service, index) => (
                      <li key={index} className="menu-item">
                        <Link
                          to={service.href}
                          onClick={handleLinkClick}
                          className="group text-base md:text-lg font-light text-white/80 hover:text-white transition-all duration-300 block"
                        >
                          <span className="transition-transform duration-300 group-hover:translate-x-2 block">
                            {service.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Left Column (reordered for mobile) */}
              <div className="w-full space-y-6 md:space-y-8 flex flex-col justify-between h-full">
                <div className="space-y-6 md:space-y-8">
                  {/* Newsletter Subscription */}
                  <div className="menu-item hidden md:block w-full">
                    <h3 className="text-base font-semibold text-white/60 mb-3 uppercase tracking-widest">Stay Connected</h3>
                    <p className="text-white/80 mb-4 leading-relaxed text-base">
                      Subscribe to our newsletter for the latest updates on digital trends and our services.
                    </p>
                    <form className="space-y-4">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-0 py-2 border-0 border-b border-white/30 bg-transparent text-white placeholder-white/50 focus:border-white focus:outline-none transition-colors duration-300 text-base"
                      />
                      <button
                        type="submit"
                        className="group bg-white text-black py-2 px-5 hover:bg-white/90 transition-all duration-300 font-medium flex items-center gap-2 text-base"
                      >
                        <span>Subscribe</span>
                        <span className="transform transition-transform group-hover:translate-x-1">→</span>
                      </button>
                    </form>
                  </div>

                  {/* Contact Information */}
                  <div className="menu-item hidden md:block w-full">
                    <h3 className="text-base font-semibold text-white/60 mb-4 uppercase tracking-widest">Get in Touch</h3>
                    <div className="space-y-4 text-white/80">
                      <div className="group cursor-pointer">
                        <p className="font-medium text-white mb-1 text-base">Email</p>
                        <a href="mailto:hello@sirtona.com" className="text-lg hover:text-white transition-colors duration-300 group-hover:translate-x-2 transform block">
                          hello@sirtona.com
                        </a>
                      </div>
                      <div className="group cursor-pointer">
                        <p className="font-medium text-white mb-1 text-base">Phone</p>
                        <a href="tel:+1234567890" className="text-lg hover:text-white transition-colors duration-300 group-hover:translate-x-2 transform block">
                          +1 (234) 567-890
                        </a>
                      </div>
                      <div>
                        <p className="font-medium text-white mb-1 text-base">Address</p>
                        <p className="text-lg leading-relaxed">123 Digital Street<br />Tech City, TC 12345</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="menu-item w-full">
                  <h3 className="text-base font-semibold text-white/60 mb-4 uppercase tracking-widest">Follow Us</h3>
                  <div className="flex gap-5">
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon;
                      return (
                        <a 
                          key={index} 
                          href={social.href} 
                          className="group text-white/80 hover:text-white transition-all duration-300 flex items-center justify-center"
                          aria-label={social.name}
                        >
                          <IconComponent className="w-7 h-7 transform transition-transform group-hover:scale-110" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
