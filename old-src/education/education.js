export class educationPage extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    let res = await fetch('education.html');
    let parser = new DOMParser();
    parser
      .parseFromString(await res.text(), 'text/html')
      .querySelectorAll('section')
      .forEach((element) => {
        this.appendChild(element);
      });
  }
}

window.customElements.define('education-page', educationPage);
