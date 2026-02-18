const DocumentHeader = () => {
  return (
    <header className="relative">
      {/* Gradient accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent1 to-accent2 print:hidden"></div>

      <hgroup className="pt-2">
        {/* Name and title */}
        <h1>Alex Johnson</h1>

        <h2>Senior Frontend Engineer</h2>
      </hgroup>

      {/* Contact info */}
      <address className="not-italic">
        <ul className="flex flex-wrap list-none items-center m-0">
          <li>
            <a href="mailto:alexmj212@gmail.com" className="flex items-center px-2 py-1 rounded-md hover:bg-blue-50 transition-colors text-gray-700">
              <span className="block mr-2">
                <i className="fas fa-envelope text-blue-500" aria-hidden="true"></i>
              </span>
              <span className="font-medium">alexmj212@gmail.com</span>
            </a>
          </li>

          <li>
            <a href="https://alexmj212.dev" className="flex items-center px-2 py-1 rounded-md hover:bg-blue-50 transition-colors text-gray-700">
              <span className="block mr-2">
                <i className="fas fa-globe text-green-500" aria-hidden="true"></i>
              </span>
              <span className="font-medium">alexmj212.dev</span>
            </a>
          </li>

          <li>
            <a href="https://linkedin.com/in/alexmj212" className="flex items-center px-2 py-1 rounded-md hover:bg-blue-50 transition-colors text-gray-700">
              <span className="block mr-2">
                <i className="fab fa-linkedin text-blue-600" aria-hidden="true"></i>
              </span>
              <span className="font-medium">linkedin.com/in/alexmj212</span>
            </a>
          </li>

          <li>
            <a href="https://github.com/alexmj212" className="flex items-center px-2 py-1 rounded-md hover:bg-blue-50 transition-colors text-gray-700">
              <span className="block mr-2">
                <i className="fab fa-github text-gray-800" aria-hidden="true"></i>
              </span>
              <span className="font-medium">github.com/alexmj212</span>
            </a>
          </li>
        </ul>
      </address>
    </header>
  );
};

export default DocumentHeader;
