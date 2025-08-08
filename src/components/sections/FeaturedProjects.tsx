import type { TProject } from '../../types/'; // Assuming you have a project type defined
import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import React from 'react';
import { ArrowRight } from 'lucide-react';

// ...existing code...

// The main section component
interface FeaturedProjectsProps {
  projects?: TProject[]; // Make it optional
}

// Fallback mock data for projects
const mockProjects = [
  {
    id: 1,
    title: 'Aura Health',
    slug: 'aura-health',
    excerpt: 'Web design for a health tech startup',
    content: 'Detailed project description will go here.',
    featuredImage: {
      url: '/src/assets/placeholder1.jpg',
      altText: 'Aura Health Project'
    },
    category: 'Web Design',
    projectUrl: 'https://aura-health.example.com',
  },
  {
    id: 2,
    title: 'QuantumLeap',
    slug: 'quantum-leap',
    excerpt: 'Branding for a technology innovator',
    content: 'Detailed project description will go here.',
    featuredImage: {
      url: '/src/assets/placeholder2.jpg',
      altText: 'QuantumLeap Project'
    },
    category: 'Branding',
    projectUrl: 'https://quantum-leap.example.com',
  },
  {
    id: 3,
    title: 'Nova Solutions',
    slug: 'nova-solutions',
    excerpt: 'Web development for an enterprise solution',
    content: 'Detailed project description will go here.',
    featuredImage: {
      url: '/src/assets/placeholder3.jpg',
      altText: 'Nova Solutions Project'
    },
    category: 'Web Development',
    projectUrl: 'https://nova-solutions.example.com',
  },
  {
    id: 4,
    title: 'Zenith Bank',
    slug: 'zenith-bank',
    excerpt: 'Mobile application for digital banking',
    content: 'Detailed project description will go here.',
    featuredImage: {
      url: '/src/assets/placeholder4.jpg',
      altText: 'Zenith Bank Project'
    },
    category: 'Mobile App',
    projectUrl: 'https://zenith-bank.example.com',
  },
];

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects = mockProjects }) => {
  // Create a ref for animations
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  // Initialize animations when component mounts and when projects change
  useEffect(() => {
    if (sectionRef.current && headingRef.current && projectsRef.current) {
      // Create a GSAP context
      const ctx = gsap.context(() => {
        // Kill any existing ScrollTriggers to prevent conflicts
        ScrollTrigger.killAll();
        
        // Set initial state for elements
        gsap.set([headingRef.current, ".project-card"], { opacity: 1, y: 0 });
        
        // Only animate if we have projects to show
        if (projects.length > 0) {
          // Reset elements for animation
          gsap.set(headingRef.current, { y: 50, opacity: 0 });
          gsap.set(".project-card", { y: 100, opacity: 0 });
          
          // Heading animation
          gsap.to(headingRef.current, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
            }
          });

          // Project cards animation - staggered
          gsap.to(".project-card", {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: projectsRef.current,
              start: "top 70%",
            }
          });
        }
      }, sectionRef);

      // Cleanup
      return () => {
        ctx.revert();
        ScrollTrigger.killAll();
      };
    }
  }, [projects]); // Re-run when projects change

  return (
    <section 
      ref={sectionRef}
      className="bg-white text-black py-32 sm:py-40 relative mt-0"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      <div className="absolute top-40 right-10 w-64 h-64 rounded-full bg-blue-100/50 blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-72 h-72 rounded-full bg-purple-100/40 blur-3xl"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div ref={headingRef} className="mx-auto max-w-2xl text-center mb-24">
          <p className="text-blue-600 font-semibold tracking-widest uppercase text-sm mb-3">Our Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          <p className="mt-4 text-xl leading-8 text-gray-600 max-w-xl mx-auto">
            A glimpse into our passion for creating stunning digital experiences that transform businesses.
          </p>
        </div>

        <div ref={projectsRef} className="mx-auto grid max-w-7xl grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((project) => (
            <article 
              key={project.id} 
              className="project-card group relative bg-white rounded-xl shadow-xl shadow-gray-200/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img 
                  src={project.featuredImage.url} 
                  alt={project.featuredImage.altText} 
                  className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-x-4 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {project.category || project.excerpt.split(' ')[0]} {/* Use custom category field from WordPress if available */}
                  </span>
                </div>
                
                <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                  <Link to={`/portfolio/${project.slug}`} className="relative z-10">
                    {project.title}
                  </Link>
                </h3>
                
                <p className="mt-3 text-gray-600 line-clamp-2">
                  {project.excerpt}
                </p>
                
                <div className="mt-6 flex items-center">
                  {project.projectUrl ? (
                    <a 
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-medium flex items-center gap-2 group-hover:text-blue-800 transition-colors duration-300"
                    >
                      View Live Project 
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  ) : (
                    <Link 
                      to={`/portfolio/${project.slug}`}
                      className="text-blue-600 font-medium flex items-center gap-2 group-hover:text-blue-800 transition-colors duration-300"
                    >
                      View Project 
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-20">
          <Link 
            to="/portfolio" 
            className="inline-flex items-center px-8 py-4 bg-white border border-gray-300 hover:border-blue-500 text-gray-900 rounded-lg transition duration-300 group shadow-md hover:shadow-lg"
          >
            <span className="font-medium">View All Projects</span>
            <ArrowRight className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
