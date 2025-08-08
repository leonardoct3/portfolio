import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Moon, Sun } from "lucide-react";

interface HeaderProps {
  activeSection?: string;
}

export const Header = ({ activeSection }: HeaderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to light mode

  // Initialize dark mode on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Only use dark mode if explicitly saved as dark, or if no preference and user prefers dark
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
      // Explicitly ensure light mode
      if (savedTheme === "light" || !savedTheme) {
        localStorage.setItem("theme", "light");
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Experiences", href: "#experiences" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 text-black dark:text-white w-full flex justify-between items-center px-4 sm:px-6 py-4 sm:py-5 fixed top-0 z-50 shadow-lg">
      {/* Logo/Name */}
      <div className="flex items-center flex-shrink-0">
        <h1 className="text-xl sm:text-2xl font-bold">
          <a 
            href="#home" 
            className="text-black dark:text-white hover:!text-red-600 transition-colors duration-300 no-underline"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
          >
            <span className="text-red-600">Leo</span>nardo
          </a>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex">
        <ul className="flex space-x-8 list-none">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`text-black dark:text-white hover:!text-red-600 hover:underline font-bold text-sm transition-all duration-300 no-underline ${
                  activeSection === item.href.substring(1) ? '!text-red-600 underline' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href.substring(1));
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right side buttons */}
      <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
        {/* Dark mode toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="text-black dark:text-white hover:!text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center"
        >
          {isDarkMode ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
        </Button>

        {/* Contact Me Button */}
        <Button
          className="bg-red-600 text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold px-3 py-2 sm:px-5 sm:py-2 rounded transition-all duration-300 border-2 border-red-600 hover:border-black dark:hover:border-white shadow-lg hover:shadow-xl text-xs sm:text-sm h-10 sm:h-auto flex items-center justify-center"
          onClick={() => scrollToSection('contact')}
        >
          Contact Me!
        </Button>
      </div>
    </header>
  );
};
