import { useState, useEffect, useRef } from 'react';
import ContactList from './ContactList';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    
    // Focus management for accessibility
    if (newMenuState && firstMenuItemRef.current) {
      // Focus first menu item when opening
      setTimeout(() => {
        firstMenuItemRef.current?.focus();
      }, 100);
    } else if (!newMenuState && menuButtonRef.current) {
      // Return focus to menu button when closing
      menuButtonRef.current.focus();
    }
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    // Return focus to menu button after link click
    if (menuButtonRef.current) {
      menuButtonRef.current.focus();
    }
  };

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        if (menuButtonRef.current) {
          menuButtonRef.current.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

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
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 md:bg-transparent gradient-primary md:gradient-none shadow-2xl md:shadow-none md:rounded-none border-b-2 md:border-none border-accent2 dark:border-accent2 md:nav-shadow">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Logo/Name */}
          <div className="flex items-center">
            <a 
              href="/" 
              className="nav-link font-bold text-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
              aria-label="Alex Johnson - Home"
            >
              Alex Johnson
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4" role="menubar" aria-label="Desktop navigation menu">
              <a 
                href="/#about" 
                className="nav-link px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                role="menuitem"
                tabIndex={0}
              >
                About
              </a>
              <a 
                href="/#portfolio" 
                className="nav-link px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                role="menuitem"
                tabIndex={0}
              >
                Portfolio
              </a>
              <a 
                href="/#skills" 
                className="nav-link px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                role="menuitem"
                tabIndex={0}
              >
                Skills
              </a>
              <a 
                href="/#experience" 
                className="nav-link px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                role="menuitem"
                tabIndex={0}
              >
                Experience
              </a>
              <a 
                href="/resume" 
                className="nav-link px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                role="menuitem"
                tabIndex={0}
              >
                Resume
              </a>

              {/* Contact Icons */}
              <div className="hidden md:flex space-x-2 ml-4" role="navigation" aria-label="Social media and contact links">
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
              ref={menuButtonRef}
              onClick={toggleMenu}
              className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent p-2 rounded hover:bg-white hover:bg-opacity-10 transition-all duration-200"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
            >
              <span className="sr-only">{isMenuOpen ? "Close main menu" : "Open main menu"}</span>
              <i 
                className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}
                aria-hidden="true"
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          id="mobile-menu"
          className={`md:hidden pb-4 transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen 
              ? 'opacity-100 max-h-96' 
              : 'opacity-0 max-h-0 hidden'
          }`}
          role="menu"
          aria-label="Mobile navigation menu"
          aria-hidden={!isMenuOpen}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a 
              ref={firstMenuItemRef}
              href="/#about" 
              className="nav-link block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
              onClick={handleLinkClick}
              role="menuitem"
              tabIndex={isMenuOpen ? 0 : -1}
            >
              About
            </a>
            <a 
              href="/#portfolio" 
              className="nav-link block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
              onClick={handleLinkClick}
              role="menuitem"
              tabIndex={isMenuOpen ? 0 : -1}
            >
              Portfolio
            </a>
            <a 
              href="/#skills" 
              className="nav-link block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
              onClick={handleLinkClick}
              role="menuitem"
              tabIndex={isMenuOpen ? 0 : -1}
            >
              Skills
            </a>
            <a 
              href="/#experience" 
              className="nav-link block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
              onClick={handleLinkClick}
              role="menuitem"
              tabIndex={isMenuOpen ? 0 : -1}
            >
              Experience
            </a>
            <a 
              href="/resume" 
              className="nav-link block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
              onClick={handleLinkClick}
              role="menuitem"
              tabIndex={isMenuOpen ? 0 : -1}
            >
              Resume
            </a>

            {/* Mobile Contact Icons */}
            <div className="pt-2" role="navigation" aria-label="Social media and contact links">
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