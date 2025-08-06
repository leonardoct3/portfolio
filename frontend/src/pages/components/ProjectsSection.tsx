import { Card, CardContent } from "../../components/ui/card";

export const ProjectsSection = () => {
  return (
    <section id="projects" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Add your projects here */}
          <Card className="bg-white dark:bg-gray-900 border-black dark:border-white border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Project 1</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Description of your project...</p>
              <div className="flex gap-2">
                <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">React</span>
                <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">TypeScript</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
