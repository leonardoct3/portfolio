import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export const Footer = () => {
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

  const socialLinks = [
    { icon: Github, href: "https://github.com/your-username", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/your-profile", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/your-handle", label: "Twitter" },
    { icon: Mail, href: "mailto:your-email@example.com", label: "Email" },
  ];

  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center space-y-8">
          {/* Navigation */}
          <nav>
            <ul className="flex flex-wrap justify-center space-x-8 list-none">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-white hover:text-red-600 hover:underline transition-all duration-300 no-underline"
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

          {/* Social Media Links */}
          <div className="flex space-x-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-red-600 transform hover:scale-110 transition-all duration-300"
                  aria-label={social.label}
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400">
            <p>&copy; 2025 Leonardo. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
