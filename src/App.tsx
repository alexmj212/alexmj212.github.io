import { useEffect } from "react";
import ThreeBackground from "./components/ThreeBackground";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Portfolio from "./components/portfoilo/Portfolio";
import Skills from "./components/skills/Skills";
import Experience from "./components/experience/Experience";
import ContactList from "./components/ContactList";
import SkipLink from "./components/a11y/SkipLink";
import { reportWebVitals } from "./vitals";

const App = () => {
  const currentYear = new Date().getFullYear();
  const yearsExperience = currentYear - 2013;

  // Report Core Web Vitals once per page load
  useEffect(() => {
    reportWebVitals();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <SkipLink />
      {/* Fixed Three.js Background with Error Boundary */}
      <ErrorBoundary>
        <ThreeBackground />
      </ErrorBoundary>

      <div className="app-container min-h-screen" style={{ position: "relative", zIndex: 1 }}>
        {/* Navigation */}
        <Navbar />
        {/* Home/Hero Section */}
        <header>
          <div id="home" className="w-full h-screen flex justify-center items-center -mt-8 relative">
            <div className="w-full max-w-[90vw] xl:max-w-[85vw] 2xl:max-w-[80vw] px-4 sm:px-6 lg:px-8">
              <div className="hero-layout">
                <div className="hero-title-section">
                  <h1 className="hero-title">Hey, I'm AJ</h1>
                </div>

                <div className="hero-content">
                  <p className="hero-subtitle mb-8">
                    I'm a <strong className="font-semibold text-accent2 dark:text-accent2-dark"> senior front-end software engineer</strong> based in
                    <i className="whitespace-nowrap font-light text-accent1 dark:text-accent1-dark"> Lexington, KY</i> and I specialize in building (and sometimes designing) experiences for the web.
                  </p>
                  <div className="hero-actions">
                    <a href="#portfolio" className="hero-button">
                      <span>Explore My Projects</span>
                      <i className="fas fa-arrow-down ml-2"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* About Section */}
        <main id="main-content">
          <div id="about" className="section-bg-alt w-full py-24">
          <div className="container-responsive">
            <article className="about-card">
              <div className="about-header">
                <h2 className="section-title text-gray-900 dark:text-white">About Me</h2>
              </div>

              <div className="about-content">
                <div className="flex md:flex-row flex-col items-start gap-8 xl:gap-12">
                  {/* Portrait */}
                  <div className="flex-shrink-0 mx-auto md:mx-0">
                    <img className="w-48 h-48 md:w-56 md:h-56 xl:w-64 xl:h-64 object-cover rounded-full shadow-xl" alt="Alex Johnson portrait" src="/assets/img/portrait.jpg" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-6">
                    <div className="text-container-optimal">
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        For {yearsExperience} years, I've built exceptional user experiences and coordinated teams to deliver projects from concept to production. I focus on design, usability, and modern web technologies.
                      </p>

                      <p className="text-gray-700 dark:text-gray-300 mt-4">
                        My passion for web development started in high school building basic websites. This led me to graduate from the <strong>University of Kentucky</strong> in 2013 with a <strong>B.S. in Computer Science</strong>, where I studied
                        web development, algorithms, and software engineering.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="about-contact mt-8">
                  <ContactList showLabel={true} labelSize="text-base" className="flex flex-col md:flex-row gap-4" />
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Portfolio Section */}
        <div id="portfolio">
          <ErrorBoundary fallback={
            <div className="w-full py-24">
              <div className="container-responsive">
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">⚠️</div>
                  <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Portfolio Unavailable
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    This section failed to load. Please try refreshing the page.
                  </p>
                </div>
              </div>
            </div>
          }>
            <Portfolio />
          </ErrorBoundary>
        </div>

        {/* Skills Section */}
        <div id="skills">
          <ErrorBoundary fallback={
            <div className="w-full py-24">
              <div className="container-responsive">
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">⚠️</div>
                  <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Skills Unavailable
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    This section failed to load. Please try refreshing the page.
                  </p>
                </div>
              </div>
            </div>
          }>
            <Skills />
          </ErrorBoundary>
        </div>

        {/* Experience Section */}
          <div id="experience">
            <ErrorBoundary fallback={
              <div className="w-full py-24">
                <div className="container-responsive">
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">⚠️</div>
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Experience Unavailable
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      This section failed to load. Please try refreshing the page.
                    </p>
                  </div>
                </div>
              </div>
            }>
              <Experience />
            </ErrorBoundary>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default App;
