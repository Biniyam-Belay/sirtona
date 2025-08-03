import type { TProject } from '../../types/'; // Assuming you have a project type defined
import { Link } from 'react-router-dom';

// A small, reusable card component
const ProjectCard = ({ project }: { project: TProject }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden group">
    <img src={project.featuredImage.url} alt={project.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
      <p className="text-gray-600 mb-4">{project.excerpt}</p>
      <Link to={`/portfolio/${project.slug}`} className="text-blue-600 font-semibold hover:underline">
        View Case Study →
      </Link>
    </div>
  </div>
);

// The main section component
interface FeaturedProjectsProps {
  projects: TProject[]; // Expects an array of projects
}

const FeaturedProjects = ({ projects }: FeaturedProjectsProps) => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Recent Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;