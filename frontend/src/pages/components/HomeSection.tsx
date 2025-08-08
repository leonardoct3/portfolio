import { useState, useEffect } from "react";

const useTypewriter = (texts: string[], typingSpeed = 150, deletingSpeed = 100, pauseTime = 2000) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          // Finished typing, start deleting after pause
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, textIndex, isDeleting, texts, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
};

export const HomeSection = () => {
  const typewriterText = useTypewriter([
    "Full Stack Developer",
    "Computer Engineer"
  ]);

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
            <h2 className="text-2xl md:text-3xl mb-2 text-gray-700 dark:text-gray-300">
              Hi
            </h2>
            <h1 className="text-4xl md:text-6xl font-bold mb-2">
              I'm <span className="text-red-600">Leonardo</span>
            </h1>
            <h1 className="text-3xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white">
              a <span className="text-red-600 inline-block min-w-[1ch]">{typewriterText}</span>
              <span className="animate-pulse text-red-600">|</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-400 mt-6">
              Computer Engineering student at Insper with a passion for developing software solutions. Dedicated to continuous learning and delivering high-quality projects.
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
                Read More About Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
  