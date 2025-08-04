import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Moon, Sun } from "lucide-react";

interface HeaderProps {
  activeSection?: string;
}

export const Header = ({ activeSection }: HeaderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize dark mode on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
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
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="bg-black dark:bg-gray-900 text-white w-full flex justify-between items-center px-6 py-5 fixed top-0 z-50 shadow-lg">
      {/* Logo/Name */}
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">
          <a 
            href="#home" 
            className="text-white hover:text-red-600 transition-colors duration-300 no-underline"
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
                className={`text-white hover:text-red-600 hover:underline font-bold text-sm transition-all duration-300 no-underline ${
                  activeSection === item.href.substring(1) ? 'text-red-600 underline' : ''
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
      <div className="flex items-center space-x-4">
        {/* Dark mode toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="text-white hover:text-red-600 hover:bg-gray-800"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        {/* Contact Me Button */}
        <Button
          className="bg-white text-black hover:bg-red-600 hover:text-white font-bold px-5 py-2 rounded transition-all duration-300 hidden sm:block"
          onClick={() => scrollToSection('contact')}
        >
          Contact Me!
        </Button>
      </div>

      {/* Mobile Navigation Menu (you can expand this later) */}
      <div className="md:hidden">
        {/* Mobile menu button - can be implemented later */}
      </div>
    </header>
  );
};
