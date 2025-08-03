import { useRef } from 'react';
import gsap from 'gsap';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { formatETB } from '../../lib/currency';

const WebDevelopment = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.fade-in', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="fade-in text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Web Development Services
          </h1>
          <p className="fade-in text-xl text-gray-600 mb-8">
            Custom websites and web applications built with modern technologies
          </p>
          
          <div className="fade-in bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Custom website development
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Responsive design for all devices
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Modern frameworks (React, Vue, Angular)
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Performance optimization
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                SEO-friendly development
              </li>
            </ul>
          </div>

          <div className="fade-in bg-blue-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">Basic Website</h3>
                <p className="text-3xl font-bold text-blue-600 mb-4">{formatETB(3000)}</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Up to 5 pages</li>
                  <li>• Mobile responsive</li>
                  <li>• Basic SEO</li>
                  <li>• Contact form</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">Advanced Website</h3>
                <p className="text-3xl font-bold text-blue-600 mb-4">{formatETB(6000)}</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Up to 10 pages</li>
                  <li>• CMS integration</li>
                  <li>• Advanced SEO</li>
                  <li>• Analytics setup</li>
                  <li>• 3 months support</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="fade-in text-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transform transition-all duration-300 hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebDevelopment;
