import { useState, useEffect } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { config } from "../../config/config";

interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string;
  description: string;
  skills: string[];
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export const ExperiencesSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data as fallback
  const mockExperiences: Experience[] = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Pickleball.com",
      location: "Remote",
      start_date: "Jan 2024",
      end_date: "Present",
      description: "Developed full-stack applications with React.js and Next.js. Lead the frontend development team, focusing on creating, improving, and fine-tuning web applications to make them fast and reliable. My job includes planning our technical approaches, guiding the team, and actively coding and reviewing code.",
      skills: []
    },
    {
      id: 2,
      title: "Junior -> Senior -> Alumni",
      company: "Bosnia and Herzegovina Futures Foundation",
      location: "Sarajevo, BA",
      start_date: "Sep 2021",
      end_date: "Present", 
      description: "Actively engaged in personal development, focusing on enhancing soft skills and public speaking abilities under experienced mentors. Transitioned into a mentorship role, guiding high school students in developing their soft skills and providing guidance in career planning and decision-making.",
      skills: []
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "Atlantbh (Internship)",
      location: "Sarajevo, BA",
      start_date: "Feb 2022",
      end_date: "May 2022",
      description: "Developed full-stack applications with React.js and Spring Boot. Implemented essential software development practices such as GitHub for version control, Maven for project management, JUnit for testing, and applied design patterns and MVC architecture.",
      skills: []
    }
  ];

  // Fetch experiences from API
  const fetchExperiences = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${config.apiBaseUrl}/api/experiences`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<Experience[]> = await response.json();
      
      if (result.success && result.data) {
        setExperiences(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch experiences');
      }
    } catch (err) {
      console.error('Error fetching experiences:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch experiences');
      // Use mock data as fallback
      setExperiences(mockExperiences);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const experiencesSection = document.getElementById('experiences');
      if (!experiencesSection) return;

      const rect = experiencesSection.getBoundingClientRect();
      const sectionHeight = experiencesSection.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate how much of the section has been scrolled through
      const scrolled = Math.max(0, -rect.top);
      const maxScroll = sectionHeight - viewportHeight;
      const progress = Math.min(1, Math.max(0, scrolled / maxScroll));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="experiences" className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-black dark:text-white">Work Experience</h2>
        
        {loading && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="ml-2 text-lg">Loading experiences...</span>
          </div>
        )}

        {!loading && experiences.length > 0 && (
          <div className="relative">
            {/* Thin Progress Timeline Bar */}
            <div className="absolute left-6 top-0 w-0.5 h-full bg-gray-200 dark:bg-gray-700">
              {/* Animated gradient progress bar */}
              <div 
                className="w-full bg-gradient-to-b from-red-500 via-red-600 to-red-700 transition-all duration-500 ease-out"
                style={{ height: `${scrollProgress * 100}%` }}
              />
            </div>

            {/* Single dot at the start */}
            <div className="absolute left-4 top-0">
              <div className="w-5 h-5 rounded-full bg-red-600 border-2 border-white dark:border-gray-900 shadow-lg z-10" />
            </div>

            {/* Experience Cards */}
            <div className="ml-16 space-y-12">
              {experiences.map((experience) => (
                <div key={experience.id} className="group">
                  {/* Experience Card - Skills card style */}
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-l transition-all duration-300 hover:scale-105">
                    {/* Company Name */}
                    <h3 className="text-lg font-bold text-red-600 mb-2">
                      {experience.company}
                    </h3>
                    
                    {/* Title and Date */}
                    <h4 className="text-md font-semibold text-black dark:text-white mb-3">
                      {experience.title}/{experience.start_date} - {experience.end_date}
                    </h4>
                    
                    {/* Description with bullet points */}
                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                      {experience.description.split('. ').map((sentence, i) => (
                        <div key={i} className="flex items-start gap-3 mb-2">
                          <div className="w-2 h-2 dark:bg-white bg-black rounded-full mt-2 flex-shrink-0" />
                          <span>{sentence}{i < experience.description.split('. ').length - 1 ? '.' : ''}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
