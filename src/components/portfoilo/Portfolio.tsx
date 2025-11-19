import React, { useState, useEffect, useCallback } from "react";
import portfolioData, { PortfolioItem } from "../../data/portfolioData";

interface PortfolioDialogProps {
  item: PortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const PortfolioDialog: React.FC<PortfolioDialogProps> = ({ item, isOpen, onClose }) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = (e: Event) => {
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
    <dialog
      ref={dialogRef}
      className="backdrop:bg-black backdrop:bg-opacity-50 backdrop:backdrop-blur-sm bg-transparent p-4 max-w-4xl w-full h-[90vh]"
    >
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full h-full overflow-hidden relative flex flex-col">
        <button
          className="absolute top-4 right-4 w-8 h-8 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full flex justify-center items-center text-gray-600 dark:text-gray-400 text-xl font-bold cursor-pointer z-10"
          onClick={onClose}
        >
          ×
        </button>

        {/* Fixed Header */}
        <div className="flex flex-col lg:flex-row gap-6 p-6 flex-shrink-0">
          {item.images && item.images.length > 0 && (
            <div className="w-full lg:w-80 h-48 lg:h-64 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img
                src={item.images[0]}
                alt={item.project}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
          <div className="flex-1">
            <h2 className="content-h2">{item.project}</h2>
            <p className="text-lg mb-3 text-gray-700 dark:text-gray-300">{item.caption}</p>
            <div className="text-sm mb-4">
              <span className="font-semibold text-accent1 dark:text-accent1-dark">{item.company}</span>
              <span className="text-gray-400 dark:text-gray-500 mx-2">•</span>
              <span className="text-gray-600 dark:text-gray-400">{item.date}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 px-6 space-y-6 overflow-y-auto custom-scrollbar">
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
                  <div
                    key={index}
                    className="flex items-start text-gray-700 dark:text-gray-300 leading-relaxed"
                  >
                    <span className="text-accent2 mr-3 font-bold flex-shrink-0 mt-0.5">▸</span>
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Fixed Footer */}
        <div className="flex flex-row justify-between items-center p-4 border-t border-gray-200 dark:border-gray-600 flex-shrink-0">
          <div className="flex flex-wrap gap-2">
            {item.badges.map((badge, index) => (
              <span key={index} className="badge text-xs py-2 px-4">
                {badge}
              </span>
            ))}
          </div>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-button text-sm px-4 py-2 whitespace-nowrap"
            >
              Visit Project
              <i className="fas fa-external-link-alt ml-2"></i>
            </a>
          )}
        </div>
      </div>
    </dialog>
  );
};

const Portfolio = () => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = (item: PortfolioItem) => {
    document.body.classList.add('overflow-hidden');
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const closeDialog = useCallback(() => {
    document.body.classList.remove('overflow-hidden');
    setIsDialogOpen(false);
    setSelectedItem(null);
  }, []);

  // Cleanup effect to prevent body overflow memory leak
  useEffect(() => {
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div className="w-full py-24">
      <div className="container-responsive">
        <h1 className="section-title">Portfolio</h1>
        <p>
          I take great <strong>pride</strong> in the work that I do. I translate that into successful projects and initiatives. When a project is successful, it deserves to be shared. Here are just a few examples of projects of which I am most proud.
        </p>

        <div className="portfolio-showcase my-16">
          {portfolioData.map((portfolioItem, index) => (
            <article
              key={`${portfolioItem.date}-${portfolioItem.project}`}
              className="portfolio-card"
              data-project={index + 1}
              onClick={() => openDialog(portfolioItem)}
            >
              <div className="portfolio-header">
                {portfolioItem.images && portfolioItem.images.length > 0 && (
                  <div className="portfolio-image-container">
                    <div className="portfolio-image">
                      <img
                        src={portfolioItem.images[0]}
                        alt={portfolioItem.project}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}
                <div className="portfolio-title-section">
                  <h2 className="content-h2">{portfolioItem.project}</h2>
                  <p className="portfolio-caption">{portfolioItem.caption}</p>
                  <div className="portfolio-meta">
                    <span className="portfolio-company">{portfolioItem.company}</span>
                    <span className="portfolio-separator">•</span>
                    <span className="portfolio-date">{portfolioItem.date}</span>
                  </div>
                </div>
              </div>

              <div className="portfolio-footer">
                <div className="portfolio-badges">
                  {portfolioItem.badges.map((badge, badgeIndex) => (
                    <span key={badgeIndex} className="badge">
                      {badge}
                    </span>
                  ))}
                </div>
                {portfolioItem.link && (
                  <a
                    href={portfolioItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-button text-sm px-4 py-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Visit Project
                    <i className="fas fa-external-link-alt ml-2"></i>
                  </a>
                )}
              </div>
            </article>
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
