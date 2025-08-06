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
