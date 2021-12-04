import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  return (
    <section className="App h-screen w-full flex justify-center items-center bg-gray-700">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 py-8 pt-8">
        <h1 className="text-center text-xl font-semibold text-gray-800 mb-4">alexmj212.dev</h1>
        <h1 className="text-center text-4xl font-light text-gray-500 mb-8">Hello World</h1>
        <ul className="list-none flex flex-row items-center text-4xl">
          <li className="flex-grow text-center">
            <a className="hover:text-gray-600" href="mailto:alexmj212@gmail.com" title="Email: alexmj212@gmail.com">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </li>
          <li className="flex-grow text-center">
            <a className="hover:text-gray-600" href="tel:8596636843" title="Phone: 859-663-6843">
              <FontAwesomeIcon icon={faPhoneAlt} />
            </a>
          </li>
          <li className="flex-grow text-center">
            <a className="hover:text-gray-600" href="https://www.linkedin.com/in/alex-johnson-077b3564/" title="LinkedIn: Alex Johnson">
              <FontAwesomeIcon icon={faLinkedin}/>
            </a>
          </li>
          <li className="flex-grow text-center">
            <a className="hover:text-gray-600" href="https://www.github.com/alexmj212" title="GitHub: alexmj212">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default App;
