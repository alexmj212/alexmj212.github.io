import { useState, useEffect, useRef } from 'react';
import ContactList from './ContactList';

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then system preference
    const stored = localStorage.getItem('theme');
    if (stored) {
      return stored === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return [isDark, setIsDark] as const;
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDarkMode, setIsDarkMode] = useDarkMode();
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const throttleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      // Throttle: skip this event if timer is active
      if (throttleTimer.current) return;

      // Execute scroll logic immediately
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

      // Set throttle timer (100ms)
      throttleTimer.current = setTimeout(() => {
        throttleTimer.current = null;
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Clean up throttle timer on unmount
      if (throttleTimer.current) {
        clearTimeout(throttleTimer.current);
      }
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
      <div className="w-full px-4 sm:px-6 lg:px-8 md:bg-transparent bg-gray-900 md:gradient-none shadow-2xl md:shadow-none md:rounded-none border-b-2 md:border-none border-accent2 dark:border-accent2 md:nav-shadow">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Logo/Name */}
          <div className="flex items-center">
            <a
              href="/"
              className="nav-link font-bold text-xl px-3 py-2"
              aria-label="Alex Johnson - Home"
            >
              Alex Johnson
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="#about"
                className="nav-link px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </a>
              <a
                href="#portfolio"
                className="nav-link px-3 py-2 rounded-md text-sm font-medium"
              >
                Portfolio
              </a>
              <a
                href="#skills"
                className="nav-link px-3 py-2 rounded-md text-sm font-medium"
              >
                Skills
              </a>
              <a
                href="#experience"
                className="nav-link px-3 py-2 rounded-md text-sm font-medium"
              >
                Experience
              </a>

              {/* Contact Icons */}
              <div className="hidden md:flex space-x-2 ml-4">
                <ContactList
                  iconSize="text-lg"
                  className="flex space-x-2"
                  styleVariant="minimal"
                />
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="hidden md:block ml-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? (
                  <i className="fas fa-sun text-xl text-yellow-500"></i>
                ) : (
                  <i className="fas fa-moon text-xl text-gray-700"></i>
                )}
              </button>
            </div>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <button
              ref={menuButtonRef}
              onClick={toggleMenu}
              className="text-white hover:text-gray-200 p-2 rounded hover:bg-white hover:bg-opacity-10 transition-all duration-200"
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
              href="#about"
              className="nav-link block px-3 py-2 rounded-md text-base font-medium"
              onClick={handleLinkClick}
              role="menuitem"
              tabIndex={isMenuOpen ? 0 : -1}
            >
              About
            </a>
            <a
              href="#portfolio"
              className="nav-link block px-3 py-2 rounded-md text-base font-medium"
              onClick={handleLinkClick}
              role="menuitem"
              tabIndex={isMenuOpen ? 0 : -1}
            >
              Portfolio
            </a>
            <a
              href="#skills"
              className="nav-link block px-3 py-2 rounded-md text-base font-medium"
              onClick={handleLinkClick}
              role="menuitem"
              tabIndex={isMenuOpen ? 0 : -1}
            >
              Skills
            </a>
            <a
              href="#experience"
              className="nav-link block px-3 py-2 rounded-md text-base font-medium"
              onClick={handleLinkClick}
              role="menuitem"
              tabIndex={isMenuOpen ? 0 : -1}
            >
              Experience
            </a>

            {/* Mobile Contact Icons */}
            <div className="pt-2" role="navigation" aria-label="Social media and contact links">
              <ContactList
                iconSize="text-xl"
                className="flex space-x-4 justify-center"
                styleVariant="minimal"
              />
            </div>

            {/* Mobile Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="mt-3 w-full p-3 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <span className="flex items-center justify-center">
                {isDarkMode ? (
                  <>
                    <i className="fas fa-sun text-xl text-yellow-400 mr-2"></i>
                    <span className="text-white">Light Mode</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-moon text-xl text-white mr-2"></i>
                    <span className="text-white">Dark Mode</span>
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;