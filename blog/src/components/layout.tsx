import React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  return (
    <div className="app-container">
      <div className="w-full px-0 md:px-4 pb-8">
        <nav className="flex items-center w-full max-w-screen-lg mx-auto h-16 sm:px-6 px-4 mb-8 bg-accent1 dark:bg-accent1-dark shadow-2xl md:rounded-md md:mt-4">
          <div className="flex items-center">
            <h2 className="flex-shrink-0 m-0 text-white dark:text-white-dark">
              <Link
                to={"/"}
                className="text-white dark:text-white-dark hover:text-white dark:hover:text-white-dark"
              >
                Alex Johnson
              </Link>
            </h2>
          </div>
        </nav>
        <main className="w-full max-w-4xl mx-auto px-2">{children}</main>
        <footer className="w-full max-w-4xl mx-auto sm:px-6 px-4 mt-8 text-sm text-gray-400">
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </div>
  )
}

export default Layout
