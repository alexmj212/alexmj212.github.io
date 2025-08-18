import { useState, useEffect } from 'react';
import ContactList from './ContactList';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 100;

      if (currentScrollY < scrollThreshold) {
        setIsNavbarVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav 
      id="navbar" 
      className={`w-full sticky top-0 z-20 transition-transform duration-300 ease-in-out ${
        isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 md:bg-transparent gradient-primary md:gradient-none shadow-2xl md:shadow-none md:rounded-none border-b-2 md:border-none border-accent2 dark:border-accent2">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Logo/Name */}
          <div className="flex items-center">
            <a href="/" className="nav-link font-bold text-xl px-3 py-2">
              Alex Johnson
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="/#about" className="nav-link px-3 py-2 rounded-md text-sm font-medium">About</a>
              <a href="/#portfolio" className="nav-link px-3 py-2 rounded-md text-sm font-medium">Portfolio</a>
              <a href="/#skills" className="nav-link px-3 py-2 rounded-md text-sm font-medium">Skills</a>
              <a href="/#experience" className="nav-link px-3 py-2 rounded-md text-sm font-medium">Experience</a>

              {/* Contact Icons */}
              <div className="hidden md:flex space-x-2 ml-4">
                <ContactList 
                  iconSize="text-lg" 
                  className="flex space-x-2" 
                  styleVariant="minimal"
                />
              </div>
            </div>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-white hover:text-gray-200 focus:outline-none focus:text-gray-200 p-2 rounded hover:bg-white hover:bg-opacity-10 transition-all duration-200"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden pb-4 transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen 
              ? 'opacity-100 max-h-96' 
              : 'opacity-0 max-h-0 hidden'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a 
              href="/#about" 
              className="nav-link block px-3 py-2 rounded-md text-base font-medium"
              onClick={handleLinkClick}
            >
              About
            </a>
            <a 
              href="/#portfolio" 
              className="nav-link block px-3 py-2 rounded-md text-base font-medium"
              onClick={handleLinkClick}
            >
              Portfolio
            </a>
            <a 
              href="/#skills" 
              className="nav-link block px-3 py-2 rounded-md text-base font-medium"
              onClick={handleLinkClick}
            >
              Skills
            </a>
            <a 
              href="/#experience" 
              className="nav-link block px-3 py-2 rounded-md text-base font-medium"
              onClick={handleLinkClick}
            >
              Experience
            </a>

            {/* Mobile Contact Icons */}
            <div className="pt-2">
              <ContactList 
                iconSize="text-xl" 
                className="flex space-x-4 justify-center" 
                styleVariant="minimal"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;