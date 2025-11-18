import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import portfolioData, { PortfolioItem } from "../../data/portfolioData";

interface PortfolioDialogProps {
  item: PortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
}

// Animation constants for consistency
const ANIMATION_CONFIG = {
  duration: 0.5,
  ease: "easeInOut",
  layoutEase: [0.4, 0.0, 0.2, 1], // Custom cubic-bezier for smooth expansion
} as const;

const PortfolioDialog: React.FC<PortfolioDialogProps> = ({ item, isOpen, onClose }) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    }
    // Don't call dialog.close() here - let AnimatePresence handle the exit
  }, [isOpen]);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = (e: Event) => {
      // Prevent the default close behavior to allow animations
      e.preventDefault();
      onClose();
    };

    const handleBackdropClick = (e: MouseEvent) => {
      const rect = dialog.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    dialog.addEventListener('close', handleClose);
    dialog.addEventListener('click', handleBackdropClick);
    dialog.addEventListener('keydown', handleEscapeKey);

    return () => {
      dialog.removeEventListener('close', handleClose);
      dialog.removeEventListener('click', handleBackdropClick);
      dialog.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <AnimatePresence onExitComplete={() => {
      // Close the native dialog after the exit animation completes
      const dialog = dialogRef.current;
      if (dialog && dialog.open) {
        dialog.close();
      }
    }}>
      {isOpen && (
        <motion.dialog
          ref={dialogRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: ANIMATION_CONFIG.duration,
            ease: ANIMATION_CONFIG.ease
          }}
          className="backdrop:bg-black backdrop:bg-opacity-50 backdrop:backdrop-blur-sm bg-transparent p-4 max-w-4xl w-full h-[90vh]"
        >
          <motion.div
            layoutId={`portfolio-card-${item.project}`}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full h-full overflow-hidden relative flex flex-col"
            transition={{ 
              layout: { 
                duration: ANIMATION_CONFIG.duration, 
                ease: ANIMATION_CONFIG.layoutEase,
                type: "tween"
              }
            }}
          >
            <motion.button 
              className="absolute top-4 right-4 w-8 h-8 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full flex justify-center items-center text-gray-600 dark:text-gray-400 text-xl font-bold cursor-pointer transition-colors duration-200 z-10"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                duration: ANIMATION_CONFIG.duration,
                ease: ANIMATION_CONFIG.ease
              }}
            >
              ×
            </motion.button>

            {/* Fixed Header */}
            <motion.div 
              className="flex flex-col lg:flex-row gap-6 p-6 flex-shrink-0"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: ANIMATION_CONFIG.duration,
                ease: ANIMATION_CONFIG.ease,
                delay: 0.1
              }}
            >
              {item.images && item.images.length > 0 && (
                <div className="w-full lg:w-80 h-48 lg:h-64 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img src={item.images[0]} alt={item.project} className="w-full h-full object-contain" />
                </div>
              )}
              <div className="flex-1">
                <motion.h2 
                  className="content-h2"
                  layoutId={`portfolio-title-${item.project}`}
                  layout
                  transition={{
                    layout: {
                      duration: ANIMATION_CONFIG.duration,
                      ease: ANIMATION_CONFIG.layoutEase,
                      type: "tween"
                    }
                  }}
                >
                  {item.project}
                </motion.h2>
                <p className="text-lg mb-3">{item.caption}</p>
                <div className="text-sm mb-4">
                  <span className="font-semibold text-accent1 dark:text-accent1-dark">{item.company}</span>
                  <span className="text-gray-400 mx-2">•</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </motion.div>

            {/* Scrollable Content */}
            <motion.div 
              className="flex-1 px-6 space-y-6 overflow-y-auto custom-scrollbar"
              layoutId={`portfolio-content-${item.project}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: ANIMATION_CONFIG.duration,
                ease: ANIMATION_CONFIG.ease,
                delay: 0.2
              }}
            >
              <div className="space-y-2">
                <h4 className="subsection-header gradient-border-left">Challenge</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.challenge}</p>
              </div>

              <div className="space-y-2">
                <h4 className="subsection-header gradient-border-left">Solution</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.solution}</p>
              </div>

              <div className="space-y-2">
                <h4 className="subsection-header gradient-border-left">Impact</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.impact}</p>
              </div>

              {item.technical_highlights && item.technical_highlights.length > 0 && (
                <div className="space-y-2">
                  <h4 className="subsection-header gradient-border-left">Technical Highlights</h4>
                  <div className="space-y-2 ml-4">
                    {item.technical_highlights.map((highlight, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-start text-gray-700 dark:text-gray-300 leading-relaxed"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ 
                          duration: ANIMATION_CONFIG.duration,
                          ease: ANIMATION_CONFIG.ease,
                          delay: 0.3 + index * 0.05
                        }}
                      >
                        <span className="text-accent2 mr-3 font-bold flex-shrink-0 mt-0.5">▸</span>
                        {highlight}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Fixed Footer */}
            <motion.div 
              className="flex flex-row justify-between items-center p-4 border-t border-gray-200 dark:border-gray-600 flex-shrink-0"
              layoutId={`portfolio-footer-${item.project}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: ANIMATION_CONFIG.duration,
                ease: ANIMATION_CONFIG.ease,
                delay: 0.3
              }}
            >
              <div className="flex flex-wrap gap-2">
                {item.badges.map((badge, index) => (
                  <motion.span 
                    key={index} 
                    className="badge text-xs py-2 px-4"
                    layoutId={`portfolio-badge-${item.project}-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      duration: ANIMATION_CONFIG.duration,
                      ease: ANIMATION_CONFIG.ease,
                      delay: 0.4 + index * 0.05
                    }}
                  >
                    {badge}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.dialog>
      )}
    </AnimatePresence>
  );
};

const Portfolio = () => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = (item: PortfolioItem) => {
    // Prevent body scroll when dialog is open
    document.body.style.overflow = 'hidden';
    
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    // Restore body scroll when dialog is closed
    document.body.style.overflow = '';
    
    // Start the exit animation by closing the dialog
    setIsDialogOpen(false);
    
    // Clear selectedItem after the exit animation completes
    // This ensures the card keeps its layoutId during the transition
    setTimeout(() => {
      setSelectedItem(null);
    }, ANIMATION_CONFIG.duration * 1000); // Convert to milliseconds
  };

  return (
    <div className="w-full py-24">
      <div className="container-responsive">
        <h1 className="section-title">Portfolio</h1>
        <p>
          I take great <strong>pride</strong> in the work that I do. I translate that into successful projects and initiatives. When a project is successful, it deserves to be shared. Here are just a few examples of projects of which I am most proud.
        </p>

        <div className="portfolio-showcase my-16">
          {portfolioData.map((portfolioItem, index) => (
            <motion.article 
              key={`${portfolioItem.date}-${portfolioItem.project}`}
              className="portfolio-card" 
              data-project={index + 1}
              onClick={() => openDialog(portfolioItem)}
              layoutId={`portfolio-card-${portfolioItem.project}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ 
                opacity: selectedItem?.project === portfolioItem.project ? 0 : 1, 
                y: 0 
              }}
              viewport={{ 
                once: true, 
                amount: 0.3,
                margin: "-50px 0px -50px 0px"
              }}
              layout
              transition={{ 
                layout: {
                  duration: ANIMATION_CONFIG.duration,
                  ease: ANIMATION_CONFIG.layoutEase,
                  type: "tween"
                },
                default: {
                  duration: ANIMATION_CONFIG.duration,
                  ease: ANIMATION_CONFIG.ease,
                  delay: index * 0.05
                }
              }}
              whileHover={{ 
                scale: 1.01,
                transition: { 
                  duration: ANIMATION_CONFIG.duration,
                  ease: ANIMATION_CONFIG.ease
                }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { 
                  duration: ANIMATION_CONFIG.duration,
                  ease: ANIMATION_CONFIG.ease
                }
              }}
            >
              <div className="portfolio-header">
                {portfolioItem.images && portfolioItem.images.length > 0 && (
                  <div className="portfolio-image-container">
                    <div className="portfolio-image">
                      <img src={portfolioItem.images[0]} alt={portfolioItem.project} />
                    </div>
                  </div>
                )}
                <div className="portfolio-title-section">
                  <motion.h2 
                    className="content-h2"
                    layoutId={`portfolio-title-${portfolioItem.project}`}
                    layout
                    transition={{
                      layout: {
                        duration: ANIMATION_CONFIG.duration,
                        ease: ANIMATION_CONFIG.layoutEase,
                        type: "tween"
                      }
                    }}
                  >
                    {portfolioItem.project}
                  </motion.h2>
                  <p className="portfolio-caption">{portfolioItem.caption}</p>
                  <div className="portfolio-meta">
                    <span className="portfolio-company">{portfolioItem.company}</span>
                    <span className="portfolio-separator">•</span>
                    <span className="portfolio-date">{portfolioItem.date}</span>
                  </div>
                </div>
              </div>

              <motion.div 
                className="portfolio-content"
                layoutId={`portfolio-content-${portfolioItem.project}`}
                layout
                transition={{
                  layout: {
                    duration: ANIMATION_CONFIG.duration,
                    ease: ANIMATION_CONFIG.layoutEase,
                    type: "tween"
                  }
                }}
              >
                <div className="portfolio-section">
                  <h4 className="portfolio-section-title">Challenge</h4>
                  <p className="portfolio-section-content">{portfolioItem.challenge}</p>
                </div>

                <div className="portfolio-section">
                  <h4 className="portfolio-section-title">Solution</h4>
                  <p className="portfolio-section-content">{portfolioItem.solution}</p>
                </div>

                <div className="portfolio-section">
                  <h4 className="portfolio-section-title">Impact</h4>
                  <p className="portfolio-section-content">{portfolioItem.impact}</p>
                </div>

                {portfolioItem.technical_highlights && portfolioItem.technical_highlights.length > 0 && (
                  <div className="portfolio-section">
                    <h4 className="portfolio-section-title">Technical Highlights</h4>
                    <ul className="technical-highlights-list">
                      {portfolioItem.technical_highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>

              <motion.div 
                className="portfolio-footer"
                layoutId={`portfolio-footer-${portfolioItem.project}`}
                layout
                transition={{
                  layout: {
                    duration: ANIMATION_CONFIG.duration,
                    ease: ANIMATION_CONFIG.layoutEase,
                    type: "tween"
                  }
                }}
              >
                <div className="portfolio-badges">
                  {portfolioItem.badges.map((badge, badgeIndex) => (
                    <motion.span 
                      key={badgeIndex} 
                      className="badge"
                      layoutId={`portfolio-badge-${portfolioItem.project}-${badgeIndex}`}
                      layout
                      transition={{
                        layout: {
                          duration: ANIMATION_CONFIG.duration,
                          ease: ANIMATION_CONFIG.layoutEase,
                          type: "tween"
                        }
                      }}
                    >
                      {badge}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>

      <PortfolioDialog 
        item={selectedItem}
        isOpen={isDialogOpen}
        onClose={closeDialog}
      />
    </div>
  );
};

export default Portfolio;
