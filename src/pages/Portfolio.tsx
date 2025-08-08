import React from 'react';
import type { TProject } from '../types';

// Import this if you want to fetch all projects
// import { getAllProjects } from '../services/wordpressService';

const Portfolio: React.FC = () => {
  // You could use state to store projects fetched from WordPress
  // const [projects, setProjects] = useState<TProject[]>([]);
  
  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     const fetchedProjects = await getAllProjects();
  //     setProjects(fetchedProjects);
  //   };
  //   
  //   fetchProjects();
  // }, []);

  return (
    <div className="bg-black text-white py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-10 text-center">Portfolio</h1>
        <p className="text-xl text-center text-gray-400 mb-16">
          Explore our complete collection of projects and case studies
        </p>
        
        {/* You would map through projects here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project cards would go here */}
          <div className="p-16 text-center text-gray-500 border border-gray-800 rounded-lg">
            Portfolio items will be displayed here
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
