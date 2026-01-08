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
            "id": 11,
            "title": "ReddiView",
            "description": "A Reddit client that lets you sign in with Reddit, browse and filter by subreddit, and upvote/downvote posts. Built with Create React App (CRA), React, Redux, and the Reddit API.",
            "technologies": [
                "React",
                "Redux",
                "CRA",
                "Reddit API"
            ],
            "github_url": "https://github.com/leonardoct3/reddiview.git",
            "live_url": "https://reddiview.netlify.app",
            "image_url": "https://res.cloudinary.com/dd4ul1s1i/image/upload/v1754616562/67d17810-f495-4819-9014-3353cef8652b.png",
            "created_at": "2025-08-08T01:37:10.168721+00:00",
            "updated_at": "2025-08-12T23:36:01.604369+00:00"
        },
        {
            "id": 10,
            "title": "GP I",
            "description": "Platform to appraise and manage Insper Jr.’s selective process, built with React + TypeScript (frontend), FastAPI (backend) and MongoDB. Includes role-based areas (director, coordinator, appraisers) and operational workflows for evaluations.",
            "technologies": [
                "React",
                "TypeScript",
                "Vite",
                "FastAPI",
                "MongoDB"
            ],
            "github_url": null,
            "live_url": "https://gp-front-zeta.vercel.app/director/login",
            "image_url": "https://res.cloudinary.com/dd4ul1s1i/image/upload/v1754614936/WhatsApp_Image_2025-08-07_at_21.05.50_eaa636a6_c2uoso.jpg",
            "created_at": "2025-08-08T01:26:20.904969+00:00",
            "updated_at": "2025-08-12T23:35:45.284472+00:00"
        },
        {
            "id": 9,
            "title": "Jammming",
            "description": "Spotify web helper: search tracks, listen to previews, and create new playlists on Spotify using the Spotify Web API and user token.",
            "technologies": [
                "React",
                "CRA",
                "Spotify API",
                "OAuth"
            ],
            "github_url": "https://github.com/leonardoct3/jammming",
            "live_url": "https://unique-beignet-b03e4e.netlify.app",
            "image_url": "https://res.cloudinary.com/dd4ul1s1i/image/upload/v1754658722/a4e17e43-b83f-4cfa-b3b6-a928a2267c0e.png",
            "created_at": "2025-08-08T13:15:13.938137+00:00",
            "updated_at": "2025-08-12T23:34:29.230656+00:00"
        },
        {
            "id": 8,
            "title": "PokeGame",
            "description": "A Pokémon guessing game with scoreboard and Pokédex. Built with React + Vite (frontend) and Django (backend), integrating with the PokeAPI. Data is stored in a PostgreSQL database.",
            "technologies": [
                "React",
                "Vite",
                "Django",
                "PostgreSQL",
                "PokeAPI"
            ],
            "github_url": null,
            "live_url": "https://projeto-2-frontend-felipe-e-leonardo.onrender.com",
            "image_url": "https://res.cloudinary.com/dd4ul1s1i/image/upload/v1754615041/WhatsApp_Image_2025-08-07_at_20.49.50_97033334_gxd7uu.jpg",
            "created_at": "2025-08-08T12:55:45.743153+00:00",
            "updated_at": "2025-08-08T12:55:45.743153+00:00"
        },
        {
            "id": 7,
            "title": "Get-It",
            "description": "Task manager (to-do) with tags for organization. Full CRUD for tasks and tags. Built as a full-stack Django app using SQLite for storage.",
            "technologies": [
                "Django",
                "Python",
                "SQLite",
                "HTML",
                "CSS"
            ],
            "github_url": null,
            "live_url": "https://projeto-1b-leonardoct3-1.onrender.com",
            "image_url": "https://res.cloudinary.com/dd4ul1s1i/image/upload/v1754615022/WhatsApp_Image_2025-08-07_at_20.59.12_b730d81d_syk0ae.jpg",
            "created_at": "2025-08-08T01:44:00.71059+00:00",
            "updated_at": "2025-08-08T01:44:00.71059+00:00"
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
