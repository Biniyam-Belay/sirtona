import { useEffect, useState } from 'react';
import HeroSection from '../components/sections/HeroSection';
import FeaturedProjects from '../components/sections/FeaturedProjects';

// src/pages/HomePage.tsx
import { getFeaturedProjects } from '../sevices/wordpressService.ts';

import type { TProject } from '../types/';

const HomePage = () => {
  const [projects, setProjects] = useState<TProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        // This function now exists and fetches real data
        const fetchedProjects = await getFeaturedProjects();
        setProjects(fetchedProjects);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <HeroSection />

      {isLoading && <div className="text-center py-20">Loading projects...</div>}
      {error && <div className="text-center py-20 text-red-500">{error}</div>}
      {!isLoading && !error && projects.length > 0 && (
        <FeaturedProjects projects={projects} />
      )}
      {!isLoading && !error && projects.length === 0 && (
         <div className="text-center py-20">No projects found.</div>
      )}
    </div>
  );
};

export default HomePage;