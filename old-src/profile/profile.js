import './profile.scss';

import { Modal } from '../modal/modal.js';

export let modalContent = {
  header: 'Contact Me',
  form: `
        <form>
            <div class="form-field">
                <label>Name</label>
                <input id="contact-name" type="text"></input>
            </div>
            <div class="form-field">
                <label>Company / Organization</label>
                <input id="contact-org" type="text"></input>
            </div>
            <div class="form-field">
                <label>Reason for Contact</label>
                <textarea id="contact-reason" type="text" rows="1"></textarea>
            </div>
        </form>
        <div id="submit-contact" class="hero-button">Tell me something good</div>
        <p><strong>Other ways to reach me</strong></p>
        <ul>
            <li><a href="mailto:alexmj212@gmail.com" title="Email"><i class="fas fa-envelope"></i>alexmj212@gmail.com</a>
            </li>
            <li><a href="tel:8596636843" title="Phone"><i class="fas fa-phone-alt"></i>859-663-6843</a></li>
            <li><a href="https://www.linkedin.com/in/alex-johnson-077b3564/" title="LinkedIn" target="_blank">
                    <i class="fab fa-linkedin"></i>LinkedIn</a></li>
            <li><a href="https://www.github.com/alexmj212" title="GitHub" target="_blank"><i class="fab fa-github"></i>GitHub</a>
            </li>
        </ul>
    `,
};

export class profilePage extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    let res = await fetch('profile.html');
    let parser = new DOMParser();
    parser
      .parseFromString(await res.text(), 'text/html')
      .querySelectorAll('section')
      .forEach((element) => {
        this.appendChild(element);
      });
    document.getElementById('contact-button').addEventListener('click', (event) => {
      this.openContactModal(event.currentTarget);
    });
  }

  openContactModal() {
    let modal = new Modal();
    modal.openModal(Modal.CONTACT_MODAL, modalContent);
  }
}

window.customElements.define('profile-page', profilePage);
