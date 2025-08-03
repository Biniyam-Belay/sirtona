import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect';
import { getTeamMembers } from '../sevices/wordpressService';
import type { TTeamMember } from '../types';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [teamMembers, setTeamMembers] = useState<TTeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.fade-in', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [teamMembers]); // Re-run animation when team members load

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setIsLoading(true);
        const members = await getTeamMembers();
        setTeamMembers(members);
      } catch (err) {
        setError('Failed to load team members. Please try again later.');
        console.error(err);
        
        // Fallback to default team members if WordPress fails
        setTeamMembers([
          {
            id: 1,
            name: 'John Doe',
            slug: 'john-doe',
            role: 'CEO & Founder',
            bio: 'Passionate about empowering Ethiopian businesses through technology.',
            image: {
              url: '/api/placeholder/300/300',
              altText: 'John Doe'
            },
            socialLinks: {
              linkedin: '#',
              email: 'john@sirtona.com'
            }
          },
          {
            id: 2,
            name: 'Jane Smith',
            slug: 'jane-smith',
            role: 'Lead Developer',
            bio: 'Full-stack developer with 8+ years of experience in modern web technologies.',
            image: {
              url: '/api/placeholder/300/300',
              altText: 'Jane Smith'
            },
            socialLinks: {
              linkedin: '#',
              email: 'jane@sirtona.com'
            }
          },
          {
            id: 3,
            name: 'Mike Johnson',
            slug: 'mike-johnson',
            role: 'Design Director',
            bio: 'Creative designer focused on user experience and brand identity.',
            image: {
              url: '/api/placeholder/300/300',
              altText: 'Mike Johnson'
            },
            socialLinks: {
              linkedin: '#',
              email: 'mike@sirtona.com'
            }
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div ref={containerRef} className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="fade-in text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About Sirtona
          </h1>
          <p className="fade-in text-xl text-gray-600 mb-8">
            We're a passionate team dedicated to helping Ethiopian businesses thrive in the digital world.
          </p>
        </div>

        <div className="fade-in bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Our Mission</h2>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
            To empower Ethiopian small and medium enterprises (SMEs) with cutting-edge digital solutions 
            that drive growth, enhance productivity, and create lasting impact in their communities.
          </p>
        </div>

        <div className="fade-in mb-16">
          <h2 className="text-3xl font-semibold text-center mb-12">Meet Our Team</h2>
          
          {isLoading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading team members...</p>
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

          {!isLoading && !error && teamMembers.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                    <img 
                      src={member.image.url} 
                      alt={member.image.altText}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  
                  {member.socialLinks && (
                    <div className="flex justify-center space-x-4">
                      {member.socialLinks.linkedin && (
                        <a 
                          href={member.socialLinks.linkedin} 
                          className="text-blue-600 hover:text-blue-700 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      )}
                      {member.socialLinks.twitter && (
                        <a 
                          href={member.socialLinks.twitter} 
                          className="text-blue-600 hover:text-blue-700 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                          </svg>
                        </a>
                      )}
                      {member.socialLinks.email && (
                        <a 
                          href={`mailto:${member.socialLinks.email}`} 
                          className="text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="fade-in bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-semibold mb-4">Ready to Work Together?</h2>
          <p className="text-lg text-gray-700 mb-6">
            Let's discuss how we can help your business grow with our digital solutions.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transform transition-all duration-300 hover:scale-105">
            Contact Us Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
