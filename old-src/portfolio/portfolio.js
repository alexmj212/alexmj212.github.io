import { Modal } from '../modal/modal.js';

import './portfolio.scss';

export let portfolioItems = [
  {
    project: 'TwinSpires Dark Mode',
    images: [
      'img/twinspires/program/program-dark-thumb.png',
      'img/twinspires/program/program-mobile.png',
      'img/twinspires/program/program-dark.png',
      'img/twinspires/program/program-light.png',
      'img/twinspires/program/calendar-mobile.png',
      'img/twinspires/program/toteboard-dark.png',
      'img/twinspires/program/toteboard-light.png',
    ],
    date: '2020 - 2021',
    company: 'TwinSpires.com',
    caption: 'Dark Mode visual theme for TwinSpires.com',
    badges: ['Angular', 'SASS', 'Mobile', 'CSS3'],
    description: `
        <h2>Summary</h2>
        <ul class="description">
            <li>Created a feature-rich theming system using modern CSS techniques</li>
            <li>Implemented controls for users to adjust their experience</li>
            <li>Integrated all components to automatically react to theme changes</li>
            <li>Optimized and consolidated page elements for performant user experience</li>
        </ul>
        <h3>Case Study</h3>
            <p>I proposed a Dark Mode implementation as a part of a company "Hack-a-thon" event.
            The purpose of the event was to promote creative and innovative ideas that might become candidates for future features.
            I put together a presentation on a dark mode implementation and coordinated with a few other team members.
            I established the goals and the plan for how Dark Mode could be created and adapted to our existing framework.
            Together with a small team, we designed and tested a proof-of-concept of dark mode and presented it to the company.
            </p><p>
            After the event, Dark Mode was selected and approved to become a fully-realized feature.
            I was responsible for the implementation plan and coordinating the team to design, develop, and test this feature.
            </p>
        <h3>Implementation</h3>
            <p>
            In addition to the implementation of Dark Mode, we performed a consolidation of colors used across the site.
            This consolidation greatly simplified the process of choosing colors while designing Dark Mode.
            Additionally, I unified the styles for interactive elements (buttons, form fields, dropdowns, etc) across the site. This ensured
            that not only were they Dark Mode aware, but also ensured we had consistent user experiences regardless of theme.
            </p><p>
            During development, I discovered that we could further optimize our theme system. In order to reduce the size of our style library,
            I reorganized our global style sheets and SASS framework to reduce compiled styles by about 20% pre-minification.
            By optimizing global styles, we were also able to improve overall performance of the application with reduced overhead
            and less data transferred on initial load.
            </p>
        <h3>Regression Testing</h3>
            <p>
            After the design and implementation, I coordinated a testing plan which outlined the breadth of testing required to
            cover regressions that might arise from the implementation. I developed a testing plan for the QA team which outlined critical areas to focus testing.
            I worked with the QA team to resolve issues through a long testing and review process.
            This process was enlightening as QA was able to provide me with constructive feedback about functional and design choices.
            Through this process we were able to refine the design further.
            </p><p>
            In addition to testing amongst our team members, our team proposed an internal "Test Bash" where many volunteers
            from various departments across the company were given access to a preview of Dark Mode.
            They were asked to provide feedback to further improve the feature.
            I provided structure to this process to ensure all feedback was addressed.
            Afterward, I made the necessary adjustments to ensure that
            all feedback and regressions were addressed and we were able to sign-off on the project.
            </p>`,
  },
  {
    project: 'TwinSpires Responsive',
    images: [
      'img/twinspires/responsive/program-mobile-thumb.png',
      'img/twinspires/responsive/program-light.png',
      'img/twinspires/responsive/landing-light.png',
      'img/twinspires/responsive/calendar-light.png',
    ],
    date: '2018',
    company: 'TwinSpires.com',
    caption: 'Responsive implementation of TwinSpires.com',
    bullets: [
      'Added support for dynamically sized content viewports',
      'Supporting all mobile platforms including iOS, iPadOS, and Android',
      'Created mobile-specific elements including navigation, modals, and lists',
      'Full parity in mobile vs. desktop functionality',
    ],
    badges: ['Angular', 'TypeScript', 'Mobile', 'CSS3'],
    description: ``,
  },
  {
    project: 'TwinSpires Video',
    images: [
      'img/twinspires/video/video-desktop-thumb.png',
      'img/twinspires/video/video-desktop-light.png',
      'img/twinspires/video/video-mobile-light.png',
    ],
    date: '2018 - 2020',
    company: 'TwinSpires.com',
    caption: 'Live and Replayable Video of Racing Content',
    bullets: [
      'Integrated front-end libraries from multiple video providers to create a seamless experience',
      'Created site-wide video components that support a wide variety of views and formats',
      'Dynamic controls for viewing and interacting with video content',
      'Support for desktop and mobile video experiences',
    ],
    badges: ['Angular', 'HTML5', 'Mobile', 'Multimedia'],
    description: ``,
  },
];

export class portfolioPage extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    let res = await fetch('portfolio.html');
    let parser = new DOMParser();
    parser
      .parseFromString(await res.text(), 'text/html')
      .querySelectorAll('section')
      .forEach((element) => {
        this.appendChild(element);
      });
    this.generatePortfolio();
  }

  generatePortfolio() {
    let list = document.querySelector('#portfolio');
    if (list) {
      list.innerHTML = '';
      portfolioItems.forEach((portfolioItem, index) => {
        let listItem = document.createElement('div');
        listItem.className = 'portfolio-item';
        let listItemContainer = document.createElement('div');
        listItemContainer.className = 'portfolio-item-container';

        let listItemImage = document.createElement('div');
        listItemImage.className = 'portfolio-item-image';
        let listItemImageElement = document.createElement('img');
        listItemImageElement.setAttribute('src', portfolioItem.images[0]);
        listItemImage.appendChild(listItemImageElement);

        let listItemDescription = document.createElement('div');
        listItemDescription.className = 'portfolio-item-description';
        let listItemDescriptionName = document.createElement('h3');
        listItemDescriptionName.innerHTML = portfolioItem.project;
        listItemDescription.appendChild(listItemDescriptionName);

        let listItemDescriptionCaption = document.createElement('p');
        listItemDescriptionCaption.innerHTML = portfolioItem.caption;
        listItemDescription.appendChild(listItemDescriptionCaption);

        let listItemBadges = document.createElement('ul');
        listItemBadges.classList.add('badges');

        let listItemHeroButton = document.createElement('a');
        listItemHeroButton.classList.add('hero-button');
        listItemHeroButton.innerHTML = 'View Project';
        listItemDescription.appendChild(listItemHeroButton);

        if (portfolioItem.badges) {
          portfolioItem.badges.forEach((badge) => {
            let listItemBadge = document.createElement('li');
            listItemBadge.classList.add('badge');
            listItemBadge.innerHTML = badge;
            listItemBadges.appendChild(listItemBadge);
          });
        }
        listItemDescription.appendChild(listItemBadges);

        listItemContainer.appendChild(listItemImage);
        listItemContainer.appendChild(listItemDescription);
        listItem.appendChild(listItemContainer);
        listItemHeroButton.addEventListener('click', () => {
          this.openPortfolioModal(index);
        });
        listItemImage.addEventListener('click', () => {
          this.openPortfolioModal(index);
        });
        list.appendChild(listItem);
      });
    }
  }

  openPortfolioModal(index) {
    let portfolioItem = portfolioItems[index];
    let modal = new Modal();
    modal.openModal(Modal.PORTFOLIO_MODAL, portfolioItem);
  }
}

window.customElements.define('portfolio-page', portfolioPage);
