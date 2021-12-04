import './sidebar.scss';
import * as DarkMode from '../dark-mode.js';

export class sidebar extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    let res = await fetch('sidebar.html');
    var parser = new DOMParser();
    parser
      .parseFromString(await res.text(), 'text/html')
      .querySelectorAll('aside')
      .forEach((element) => {
        this.appendChild(element);
      });
    Array.from(document.getElementsByClassName('nav-item')).forEach((item) => {
      item.addEventListener('click', (event) => sidebar.navigate(event.currentTarget));
    });
    document.getElementById('theme-control').addEventListener('click', (event) => {
      DarkMode.toggleTheme();
    });
  }

  static navigate(navItem) {
    var page = navItem.id.substring(0, navItem.id.lastIndexOf('-'));
    //document.getElementsByTagName(page)[0].scrollIntoView({ behavior: "smooth", block: "center" });

    var headerOffset = 50;
    var elementPosition = document.getElementsByTagName(page)[0].getBoundingClientRect().top + window.pageYOffset;
    var offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}

window.customElements.define('sidebar-element', sidebar);
