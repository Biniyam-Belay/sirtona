import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect';
import { getServices } from '../sevices/wordpressService';
import type { TService } from '../types';

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [services, setServices] = useState<TService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.service-card', 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [services]); // Re-run animation when services load

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const servicesData = await getServices();
        setServices(servicesData);
      } catch (err) {
        setError('Failed to load services. Please try again later.');
        console.error(err);
        
        // Fallback to default services if WordPress fails
        setServices([
          {
            id: 1,
            title: 'Web Development',
            slug: 'web-development',
            excerpt: 'Modern, responsive websites that convert visitors into customers.',
            content: 'Custom web applications built with modern technologies for optimal performance and user experience.',
            icon: '🌐',
            features: [
              'Responsive Design',
              'SEO Optimization',
              'Performance Optimization',
              'Content Management',
              'Security Features'
            ],
            price: 25000,
            featuredImage: {
              url: '/api/placeholder/600/400',
              altText: 'Web Development Services'
            }
          },
          {
            id: 2,
            title: 'Mobile App Development',
            slug: 'mobile-apps',
            excerpt: 'iOS and Android apps that engage users and drive business growth.',
            content: 'Native and cross-platform mobile applications that provide seamless user experiences.',
            icon: '📱',
            features: [
              'Cross-platform Development',
              'Native Performance',
              'API Integration',
              'App Store Publishing',
              'Maintenance & Support'
            ],
            price: 35000,
            featuredImage: {
              url: '/api/placeholder/600/400',
              altText: 'Mobile App Development Services'
            }
          },
          {
            id: 3,
            title: 'Digital Marketing',
            slug: 'digital-marketing',
            excerpt: 'Strategic marketing campaigns that deliver measurable results.',
            content: 'Comprehensive digital marketing strategies to boost your online presence and drive conversions.',
            icon: '📈',
            features: [
              'SEO Optimization',
              'Social Media Marketing',
              'Content Strategy',
              'PPC Advertising',
              'Analytics & Reporting'
            ],
            price: 15000,
            featuredImage: {
              url: '/api/placeholder/600/400',
              altText: 'Digital Marketing Services'
            }
          },
          {
            id: 4,
            title: 'E-commerce Solutions',
            slug: 'ecommerce',
            excerpt: 'Full-featured online stores that maximize sales and customer satisfaction.',
            content: 'Complete e-commerce platforms with payment integration and inventory management.',
            icon: '🛒',
            features: [
              'Shopping Cart System',
              'Payment Gateway Integration',
              'Inventory Management',
              'Order Tracking',
              'Customer Dashboard'
            ],
            price: 30000,
            featuredImage: {
              url: '/api/placeholder/600/400',
              altText: 'E-commerce Solutions'
            }
          },
          {
            id: 5,
            title: 'Consulting & Strategy',
            slug: 'consulting',
            excerpt: 'Strategic consulting to align technology with your business goals.',
            content: 'Expert guidance on digital transformation and technology strategy for your business.',
            icon: '💡',
            features: [
              'Digital Strategy Planning',
              'Technology Assessment',
              'Process Optimization',
              'Training & Workshops',
              'Ongoing Support'
            ],
            price: 10000,
            featuredImage: {
              url: '/api/placeholder/600/400',
              altText: 'Consulting Services'
            }
          },
          {
            id: 6,
            title: 'Maintenance & Support',
            slug: 'maintenance',
            excerpt: 'Reliable maintenance and support services for peace of mind.',
            content: 'Ongoing maintenance and technical support to keep your digital assets running smoothly.',
            icon: '🔧',
            features: [
              'Regular Updates',
              'Security Monitoring',
              'Performance Optimization',
              '24/7 Support',
              'Backup & Recovery'
            ],
            price: 5000,
            featuredImage: {
              url: '/api/placeholder/600/400',
              altText: 'Maintenance & Support Services'
            }
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (isLoading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive digital solutions to transform your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 animate-pulse">
                <div className="w-12 h-12 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-3"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Services</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive digital solutions to transform your business and achieve your goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="service-card bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">{service.icon}</div>
                <h2 className="text-2xl font-bold text-gray-800">{service.title}</h2>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.excerpt}
              </p>
              
              <div className="space-y-3 mb-6">
                {service.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-6">
                {service.price && (
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">Starting at</span>
                    <span className="text-xl font-bold text-blue-600">
                      ETB {service.price.toLocaleString()}
                    </span>
                  </div>
                )}
                
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Every business is unique. Let's discuss your specific requirements and create a tailored solution that fits your needs perfectly.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Get Custom Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
