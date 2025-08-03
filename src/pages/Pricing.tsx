import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect';
import PriceDisplay from '../components/ui/PriceDisplay';
import { getPricingPlans } from '../sevices/wordpressService';
import type { TPricingPlan } from '../types';

const Pricing = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pricingPlans, setPricingPlans] = useState<TPricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pricing-card', 
        { y: 80, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [pricingPlans]); // Re-run animation when plans load

  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        setIsLoading(true);
        const plans = await getPricingPlans();
        setPricingPlans(plans);
      } catch (err) {
        setError('Failed to load pricing plans. Please try again later.');
        console.error(err);
        
        // Fallback to default plans if WordPress fails
        setPricingPlans([
          {
            id: 1,
            title: 'Starter',
            slug: 'starter',
            price: 4500,
            period: '/month',
            features: [
              'Basic website',
              '5 pages',
              'Mobile responsive',
              'Basic SEO',
              'Email support'
            ],
            isPopular: false,
            description: 'Perfect for small businesses getting started online',
            ctaText: 'Get Started',
            ctaUrl: '/contact'
          },
          {
            id: 2,
            title: 'Professional',
            slug: 'professional',
            price: 9000,
            period: '/month',
            features: [
              'Advanced website',
              '10 pages',
              'Mobile responsive',
              'Advanced SEO',
              'E-commerce ready',
              'Priority support',
              'Analytics dashboard'
            ],
            isPopular: true,
            description: 'Ideal for growing businesses that need more features',
            ctaText: 'Get Started',
            ctaUrl: '/contact'
          },
          {
            id: 3,
            title: 'Enterprise',
            slug: 'enterprise',
            price: 18000,
            period: '/month',
            features: [
              'Custom solution',
              'Unlimited pages',
              'Mobile responsive',
              'Premium SEO',
              'Full e-commerce',
              '24/7 support',
              'Advanced analytics',
              'Custom integrations'
            ],
            isPopular: false,
            description: 'Complete solution for large enterprises',
            ctaText: 'Contact Sales',
            ctaUrl: '/contact'
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPricingPlans();
  }, []);

  return (
    <div ref={containerRef} className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your business needs. All plans include our core features and dedicated support.
          </p>
        </div>

        {isLoading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading pricing plans...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !error && pricingPlans.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`pricing-card relative bg-white rounded-2xl shadow-lg p-8 ${
                  plan.isPopular ? 'ring-2 ring-blue-600 transform scale-105' : ''
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.title}</h3>
                  <PriceDisplay 
                    amount={plan.price} 
                    period={plan.period} 
                    size="large"
                    className="justify-center"
                  />
                  {plan.description && (
                    <p className="text-gray-600 mt-4">{plan.description}</p>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-3">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    plan.isPopular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => window.location.href = plan.ctaUrl}
                >
                  {plan.ctaText}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pricing;
