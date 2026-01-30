import ContactList from './ContactList';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full z-10 py-24 text-white gradient-primary border-t-2 border-accent2 dark:border-accent2">
      <div className="container max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Alex Johnson</h2>
        <div className="flex justify-center items-center mx-auto w-full max-w-screen-sm">
          <ContactList 
            className="flex justify-center space-x-4" 
            styleVariant="footer" 
            showLabel={false}
          />
        </div>

        {/* Built with */}
        <div className="mt-8 text-center text-sm text-white dark:text-white-dark opacity-75">
          Built with{' '}
          <a 
            href="https://reactjs.org/" 
            className="hover:text-gray-200 dark:hover:text-gray-300 underline"
          >
            React
          </a>
          {' '}and{' '}
          <a 
            href="https://tailwindcss.com/" 
            className="hover:text-gray-200 dark:hover:text-gray-300 underline"
          >
            TailwindCSS
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-center text-sm text-white dark:text-white-dark opacity-75">
          © {currentYear} Alex Johnson. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;