import { Card, CardContent } from "../../components/ui/card";

export const HomeSection = () => {
  return (
    <section id="home" className="min-h-[90vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Picture */}
          <div className="flex justify-center md:order-2">
            <div className="relative w-80 h-80 md:w-96 md:h-96 group">
              {/* Hexagonal container */}
              <div className="w-full h-full hover:scale-105 transition-all duration-500">
                <img
                  src="/me.svg"
                  alt="Leonardo's Profile Picture"
                  className="w-full h-full scale-110 object-contain transition-transform duration-500"
                  loading="eager"
                />
                {/* Overlay for better visual effect */}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center md:text-left md:order-1">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Hi, I'm <span className="text-red-600">Leonardo</span>
            </h1>
            <h2 className="text-2xl md:text-3xl mb-6 text-gray-700 dark:text-gray-300">
              Full Stack Developer
            </h2>
            <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-400">
              Passionate about creating amazing web experiences with modern technologies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-red-600 border-2 border-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Hire Me
              </button>
              <button 
                className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white border-2 border-black dark:border-white transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => {
                  const element = document.getElementById('about');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                More About Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

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

export const ContactSection = () => {
  return (
    <section id="contact" className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Contact Me</h2>
        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 border-2 border-black dark:border-white rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-white focus:border-red-600 dark:focus:border-red-500 transition-colors duration-300"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 border-2 border-black dark:border-white rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-white focus:border-red-600 dark:focus:border-red-500 transition-colors duration-300"
              />
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full p-4 border-2 border-black dark:border-white rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-white focus:border-red-600 dark:focus:border-red-500 transition-colors duration-300 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-lg font-bold hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white border-2 border-black dark:border-white hover:border-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
