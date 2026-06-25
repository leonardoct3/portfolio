import { Card, CardContent } from "../../components/ui/card";
// React Icons - Technology specific icons
import {
  SiReact,
  SiReactrouter,
  SiReactquery,
  SiVite,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiPython,
  SiC,
  SiCplusplus,
  SiUnity,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiSupabase,
  SiGit,
  SiVercel,
  SiDocker,
  SiAmazon,
  SiAmazons3,
  SiLinux,
  SiFigma,
  SiSpringboot,
  SiQuarkus,
  SiFastapi,
  SiDjango,
  SiAmazondynamodb,
  SiGithub,
  SiJupyter
} from 'react-icons/si';

// Import Java Icon
import { FaJava } from 'react-icons/fa';
import { VscAzure } from 'react-icons/vsc';
// C# icon (simple-icons no longer ships one, so use Tabler's brand icon)
import { TbBrandCSharp, TbSql } from 'react-icons/tb';

interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const SkillsSection = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: "Languages",
      skills: [
        { name: "Python", icon: SiPython, color: "text-gray-600 dark:text-gray-300" },
        { name: "Java", icon: FaJava, color: "text-gray-600 dark:text-gray-300" },
        { name: "C", icon: SiC, color: "text-gray-600 dark:text-gray-300" },
        { name: "C++", icon: SiCplusplus, color: "text-gray-600 dark:text-gray-300" },
        { name: "C#", icon: TbBrandCSharp, color: "text-gray-600 dark:text-gray-300" },
        { name: "SQL", icon: TbSql, color: "text-gray-600 dark:text-gray-300" },
        { name: "TypeScript", icon: SiTypescript, color: "text-gray-600 dark:text-gray-300" },
        { name: "JavaScript", icon: SiJavascript, color: "text-gray-600 dark:text-gray-300" },
      ]
    },
    {
      title: "Frontend",
      skills: [
        { name: "React", icon: SiReact, color: "text-gray-600 dark:text-gray-300" },
        { name: "React Router", icon: SiReactrouter, color: "text-gray-600 dark:text-gray-300" },
        { name: "React Query", icon: SiReactquery, color: "text-gray-600 dark:text-gray-300" },
        { name: "Vite", icon: SiVite, color: "text-gray-600 dark:text-gray-300" },
        { name: "HTML5", icon: SiHtml5, color: "text-gray-600 dark:text-gray-300" },
        { name: "CSS3", icon: SiCss3, color: "text-gray-600 dark:text-gray-300" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-gray-600 dark:text-gray-300" },
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Express", icon: SiExpress, color: "text-gray-600 dark:text-gray-300" },
        { name: "FastAPI", icon: SiFastapi, color: "text-gray-600 dark:text-gray-300" },
        { name: "Django", icon: SiDjango, color: "text-gray-600 dark:text-gray-300" },
        { name: "Spring Boot", icon: SiSpringboot, color: "text-gray-600 dark:text-gray-300" },
        { name: "Quarkus", icon: SiQuarkus, color: "text-gray-600 dark:text-gray-300" },
        { name: "PostgreSQL", icon: SiPostgresql, color: "text-gray-600 dark:text-gray-300" },
        { name: "MongoDB", icon: SiMongodb, color: "text-gray-600 dark:text-gray-300" },
        { name: "DynamoDB", icon: SiAmazondynamodb, color: "text-gray-600 dark:text-gray-300" },
        { name: "Supabase", icon: SiSupabase, color: "text-gray-600 dark:text-gray-300" },
      ]
    },
    {
      title: "Tools & Cloud",
      skills: [
        { name: "AWS", icon: SiAmazon, color: "text-gray-600 dark:text-gray-300" },
        { name: "Amazon S3", icon: SiAmazons3, color: "text-gray-600 dark:text-gray-300" },
        { name: "Azure DevOps", icon: VscAzure, color: "text-gray-600 dark:text-gray-300" },
        { name: "Docker", icon: SiDocker, color: "text-gray-600 dark:text-gray-300" },
        { name: "Vercel", icon: SiVercel, color: "text-gray-600 dark:text-gray-300" },
        { name: "Unity", icon: SiUnity, color: "text-gray-600 dark:text-gray-300" },
        { name: "Git", icon: SiGit, color: "text-gray-600 dark:text-gray-300" },
        { name: "GitHub", icon: SiGithub, color: "text-gray-600 dark:text-gray-300" },
        { name: "Jupyter", icon: SiJupyter, color: "text-gray-600 dark:text-gray-300" },
        { name: "Figma", icon: SiFigma, color: "text-gray-600 dark:text-gray-300" },
        { name: "Linux", icon: SiLinux, color: "text-gray-600 dark:text-gray-300" },
      ]
    }
  ];

  return (
    <section id="skills" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-black dark:text-white">Skills & Technologies</h2>
        
        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              {/* Category Title */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-red-600 mb-2">{category.title}</h3>
                <div className="w-20 h-1 bg-red-600 mx-auto rounded-full"></div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <Card 
                    key={skillIndex}
                    className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 hover:border-red-500 dark:hover:border-red-500 shadow-md hover:shadow-lg transition-all duration-300 group"
                  >
                    <CardContent className="px-4 flex flex-col items-center text-center space-y-2">
                      {/* Icon */}
                      <div className={`text-4xl ${skill.color} group-hover:text-red-500 group-hover:scale-105 transition-all duration-300`}>
                      <skill.icon />
                      </div>
                      
                      {/* Skill Name */}
                      <h4 className="text-xs font-medium text-black dark:text-white group-hover:text-red-500 transition-colors duration-300">
                      {skill.name}
                      </h4>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional decorative element */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Always learning new technologies and staying up-to-date with industry trends
          </p>
        </div>
      </div>
    </section>
  );
};
