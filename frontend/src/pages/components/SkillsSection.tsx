import { Card, CardContent } from "../../components/ui/card";

export const SkillsSection = () => {
  return (
    <section id="skills" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Add your skills here */}
          <Card className="bg-white dark:bg-gray-900 border-black dark:border-white border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-4">Frontend</h3>
              <p className="text-gray-600 dark:text-gray-400">React, TypeScript, Tailwind CSS</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-900 border-black dark:border-white border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-4">Backend</h3>
              <p className="text-gray-600 dark:text-gray-400">Node.js, Express, PostgreSQL</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-900 border-black dark:border-white border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-4">Tools</h3>
              <p className="text-gray-600 dark:text-gray-400">Git, Docker, VS Code</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
