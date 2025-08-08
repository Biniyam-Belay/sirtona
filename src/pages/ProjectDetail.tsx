import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { TProject } from '../types';

// Mock function representing what would be a real API call
// Replace this with your actual WordPress API call
const getProjectBySlug = (slug: string): Promise<TProject | null> => {
  // In real implementation, this would call your WordPress service
  return Promise.resolve({
    id: 1,
    title: 'Demo Project',
    slug: slug,
    excerpt: 'This is a demo project',
    content: 'This is a detailed description of the demo project.',
    featuredImage: {
      url: '/src/assets/react.svg',
      altText: 'Demo Project'
    }
  });
};

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<TProject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (slug) {
        try {
          const projectData = await getProjectBySlug(slug);
          setProject(projectData);
        } catch (error) {
          console.error('Error fetching project:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-red-500">Project Not Found</h1>
        <p className="mt-4 text-lg">The project you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      <div className="relative h-96">
        <img 
          src={project.featuredImage.url} 
          alt={project.featuredImage.altText} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40"></div>
        <div className="absolute bottom-0 left-0 p-10">
          <h1 className="text-4xl font-bold text-white">{project.title}</h1>
          <p className="text-xl text-gray-300 mt-2">{project.excerpt}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto prose prose-invert">
          {/* In a real implementation, you might use a rich text renderer here */}
          <div dangerouslySetInnerHTML={{ __html: project.content }} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
