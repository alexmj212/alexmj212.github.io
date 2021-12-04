import './header.scss';
import '../sidebar/Sidebar';
import { Sidebar } from '../sidebar/Sidebar';

export class headerPage extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    let res = await fetch('header.html');
    let parser = new DOMParser();
    parser
      .parseFromString(await res.text(), 'text/html')
      .querySelectorAll('header')
      .forEach((element) => {
        this.appendChild(element);
      });
    Array.from(document.getElementsByClassName('nav-item')).forEach((item) => {
      item.addEventListener('click', (event) => Sidebar.navigate(event.currentTarget));
    });
  }
}

window.customElements.define('header-page', headerPage);

document.addEventListener('scroll', (event) => {
  document.documentElement.style.setProperty('--hero-bg-offset', 200 - document.documentElement.scrollTop * 0.1 + 'vw');
});
