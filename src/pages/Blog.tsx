import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect';
import { getBlogPosts } from '../sevices/wordpressService';
import type { TBlogPost } from '../types';

const Blog = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blogPosts, setBlogPosts] = useState<TBlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.blog-card', 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [blogPosts]); // Re-run animation when posts load

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setIsLoading(true);
        const posts = await getBlogPosts(6); // Fetch 6 posts for the grid
        setBlogPosts(posts);
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.');
        console.error(err);
        
        // Fallback to default posts if WordPress fails
        setBlogPosts([
          {
            id: 1,
            title: 'The Future of Web Development in Ethiopia',
            slug: 'future-web-development-ethiopia',
            excerpt: 'Exploring emerging trends and opportunities in Ethiopian tech landscape.',
            content: '',
            author: 'John Doe',
            date: 'January 15, 2025',
            category: 'Technology',
            featuredImage: {
              url: '/api/placeholder/400/250',
              altText: 'Future of Web Development'
            }
          },
          {
            id: 2,
            title: 'Digital Marketing Strategies for SMEs',
            slug: 'digital-marketing-strategies-smes',
            excerpt: 'Proven digital marketing tactics that work for small and medium enterprises.',
            content: '',
            author: 'Jane Smith',
            date: 'January 12, 2025',
            category: 'Marketing',
            featuredImage: {
              url: '/api/placeholder/400/250',
              altText: 'Digital Marketing Strategies'
            }
          },
          {
            id: 3,
            title: 'E-commerce Best Practices for Ethiopian Businesses',
            slug: 'ecommerce-best-practices-ethiopia',
            excerpt: 'Essential tips for launching and scaling your online store in Ethiopia.',
            content: '',
            author: 'Mike Johnson',
            date: 'January 10, 2025',
            category: 'E-commerce',
            featuredImage: {
              url: '/api/placeholder/400/250',
              altText: 'E-commerce Best Practices'
            }
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest insights, tips, and trends in technology and digital business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-300 rounded w-20"></div>
                    <div className="h-3 bg-gray-300 rounded w-20"></div>
                  </div>
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Blog</h1>
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
            Our Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest insights, tips, and trends in technology and digital business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img 
                  src={typeof post.featuredImage === 'string' ? post.featuredImage : post.featuredImage?.url || '/api/placeholder/400/250'}
                  alt={typeof post.featuredImage === 'string' ? post.title : post.featuredImage?.altText || post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-blue-600 text-sm font-medium bg-blue-50 px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm ml-auto">{post.date}</span>
                </div>
                
                <h2 className="text-xl font-semibold text-gray-800 mb-3 hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">By {post.author}</span>
                  <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transform transition-all duration-300 hover:scale-105">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
