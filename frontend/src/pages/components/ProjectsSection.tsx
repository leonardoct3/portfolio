import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../../components/ui/carousel";
import { Button } from "../../components/ui/button";
import { ExternalLink, Github, Loader2 } from "lucide-react";
import { config } from "../../config/config";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github_url?: string | null;
  live_url?: string | null;
  image_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

interface ApiResponse {
  success: boolean;
  data?: Project[];
  message?: string;
  error?: string;
}

export const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${config.apiBaseUrl}/api/projects`);
        const data: ApiResponse = await response.json();
        
        if (data.success && data.data) {
          setProjects(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch projects');
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
        // Fallback data for development/demo purposes
        setProjects([
          {
            id: 1,
            title: "Portfolio Website",
            description: "A modern, responsive portfolio website built with React and TypeScript, featuring a clean design and smooth animations.",
            technologies: ["React", "TypeScript", "Vite", "Express", "Supabase"],
            github_url: "https://github.com/yourusername/portfolio",
            live_url: "https://yourportfolio.com",
            image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop&crop=center"
          },
          {
            id: 2,
            title: "Task Management App",
            description: "A full-stack task management application with real-time updates, user authentication, and collaborative features.",
            technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth.js"],
            github_url: "https://github.com/yourusername/task-manager",
            live_url: "https://taskmanager.example.com",
            image_url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop&crop=center"
          },
          {
            id: 3,
            title: "E-commerce Platform",
            description: "A scalable e-commerce platform with payment integration, inventory management, and admin dashboard.",
            technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS S3"],
            github_url: "https://github.com/yourusername/ecommerce",
            live_url: "https://shop.example.com",
            image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop&crop=center"
          },
          {
            id: 4,
            title: "Weather Dashboard",
            description: "A comprehensive weather application with forecasts, interactive maps, and location-based weather alerts.",
            technologies: ["Vue.js", "TypeScript", "Chart.js", "OpenWeather API"],
            github_url: "https://github.com/yourusername/weather-app",
            live_url: "https://weather.example.com",
            image_url: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop&crop=center"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentSlide(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  if (loading) {
    return (
      <section id="projects" className="min-h-screen md:min-h-screen py-12 md:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-black dark:text-white">Projects</h2>
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="ml-2 text-lg">Loading projects...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error && projects.length === 0) {
    return (
      <section id="projects" className="min-h-screen md:min-h-screen py-12 md:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-black dark:text-white">Projects</h2>
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-red-500 mb-4">Error loading projects: {error}</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-12 md:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">Projects</h2>
        
        {projects.length > 0 ? (
          <div className="relative">
            {/* Mobile indicator text */}
            <div className="md:hidden text-center mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Swipe to see more projects</p>
            </div>
            
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {projects.map((project) => (
                  <CarouselItem key={project.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <Card className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-md h-full">
                      <CardContent className="p-4 md:p-6 flex flex-col h-full">
                        <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">
                          {project.title}
                        </h3>
                        
                        {project.image_url && (
                          <div className="mb-3 md:mb-4 overflow-hidden rounded-lg">
                            <img 
                              src={project.image_url} 
                              alt={project.title}
                              className="w-full object-contain bg-gray-50 dark:bg-gray-800"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-6 flex-grow text-sm leading-relaxed">
                          {project.description}
                        </p>
                        
                        <div className="flex gap-2 md:gap-3 mt-auto">
                          {project.github_url && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1 text-xs md:text-sm border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                              onClick={() => window.open(project.github_url!, '_blank')}
                            >
                              <Github className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                              Code
                            </Button>
                          )}
                          {project.live_url && (
                            <Button 
                              variant="default" 
                              size="sm" 
                              className="flex-1 text-xs md:text-sm bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition-opacity"
                              onClick={() => window.open(project.live_url!, '_blank')}
                            >
                              <ExternalLink className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                              Live Demo
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black" />
              <CarouselNext className="hidden md:flex -right-12 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black" />
            </Carousel>
            
            {/* Mobile dots indicator */}
            <div className="md:hidden flex justify-center mt-6 space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`w-1 h-1 rounded-full transition-all duration-200 ${
                    index === currentSlide
                      ? 'bg-black dark:bg-white scale-110'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">No projects found.</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">Check back soon for exciting projects!</p>
          </div>
        )}
      </div>
    </section>
  );
};
