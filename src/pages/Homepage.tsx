import { useEffect, useState } from 'react';
import HeroSection from '../components/sections/HeroSection';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import { getFeaturedProjects } from '../sevices/wordpressService';
import type { TProject } from '../types';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<TProject[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getFeaturedProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
        console.error('Error fetching projects:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="w-full flex flex-col">
      <HeroSection />
      <div className="relative z-10">
        {isLoading && <div className="text-center py-20">Loading projects...</div>}
        {error && <div className="text-center py-20 text-red-500">{error}</div>}
        {!isLoading && (
          <FeaturedProjects projects={projects.length > 0 ? projects : undefined} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
