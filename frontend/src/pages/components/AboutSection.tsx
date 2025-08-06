import { Card, CardContent } from "../../components/ui/card";

export const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">About Me</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white dark:bg-gray-900 border-black dark:border-white border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Experience 1</h3>
              <p className="text-gray-600 dark:text-gray-300">Description of your experience or skill...</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-900 border-black dark:border-white border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Experience 2</h3>
              <p className="text-gray-600 dark:text-gray-300">Description of your experience or skill...</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-900 border-black dark:border-white border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Experience 3</h3>
              <p className="text-gray-600 dark:text-gray-300">Description of your experience or skill...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
