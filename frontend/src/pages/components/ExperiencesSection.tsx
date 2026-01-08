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
  created_at: string;
  updated_at: string;
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
            "id": 4,
            "title": "Trainee → Consultant → Senior Consultant → Projects Manager",
            "company": "Insper Jr.",
            "location": "São Paulo, BR",
            "start_date": "Mar 2024",
            "end_date": "Present",
            "description": "Started by developing core technical and consulting skills through intensive training and participation in diverse projects, including web development, data analysis, and dashboard design. Took on increasing responsibilities in client-facing and technical roles, delivering end-to-end solutions that combined strategy, design, and implementation. Progressively assumed leadership responsibilities, mentoring team members, guiding technical decisions, and ensuring delivery quality across multiple projects. Currently oversee the Engineering and Tech areas, fostering member growth and implementing structured learning paths in Backend and Cloud, integrating FastAPI, SQLAlchemy, Supabase, and CI/CD deployments to production environments.",
            "skills": [],
            "created_at": "2025-08-08T13:51:47.023059+00:00",
            "updated_at": "2025-08-08T13:55:28.057616+00:00"
        },
        {
            "id": 5,
            "title": "Summer Intern",
            "company": "BTG Pactual",
            "location": "São Paulo, BR",
            "start_date": "Jul 2025",
            "end_date": "Aug 2025",
            "description": "Worked on the development of Java Quarkus-based AWS Lambdas triggered by EventBridge to integrate with internal APIs and microservices, generating financial reports and emergency alerts for officers and bankers. Operated end-to-end, from understanding the business context and designing the architecture to implementation and deployment using CloudFormation. Integrated solutions with DynamoDB and internal systems to ensure robust, scalable, and timely communication across critical processes.",
            "skills": [],
            "created_at": "2025-08-08T13:57:22.597217+00:00",
            "updated_at": "2025-08-08T13:57:22.597217+00:00"
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
