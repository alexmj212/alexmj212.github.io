import React from "react";
import { Link } from "gatsby";
import Pages from "../../../src/App";

const Layout = ({ location, title, children }) => {
  return (
    <div className="app-container h-full">
      <div className="w-full h-full px-0 md:px-4 pb-8">
        <header className="w-full max-w-screen-lg h-16 mx-auto md:mt-4 md:rounded-md shadow-2xl px-4 sm:px-6 mb-8 text-white dark:text-white-dark bg-accent1 dark:bg-accent1-dark flex flex-row items-center">
          <h2 className="m-0">alexmj212.dev/blog</h2>
        </header>
        <main className="w-full max-w-4xl mx-auto px-2">{children}</main>
        <footer className="w-full max-w-4xl mx-auto sm:px-6 px-4 mt-8 text-sm text-gray-400">
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
