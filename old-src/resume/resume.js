import './resume.scss';

export class resumePage extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    let res = await fetch('resume.html');
    let parser = new DOMParser();
    parser
      .parseFromString(await res.text(), 'text/html')
      .querySelectorAll('section')
      .forEach((element) => {
        this.appendChild(element);
      });
    [...document.getElementsByClassName('timeline-event')].forEach((timelineEvent) => {
      timelineEvent.addEventListener('click', (event) => {
        this.changeExperienceView(event.currentTarget);
      });
    });
  }

  changeExperienceView(element) {
    [...document.getElementsByClassName('timeline-event')].forEach((e) => {
      e.classList.remove('is-active');
    });
    document.getElementById(element.id).classList.add('is-active');
    let width = document.getElementsByClassName('experience')[0].scrollWidth;
    let elementNumber = +element.id.substring(element.id.indexOf('-') + 1, element.id.length);
    document.getElementById('experience-list').scrollTo({ left: width * elementNumber - width });
  }
}

window.customElements.define('resume-page', resumePage);
