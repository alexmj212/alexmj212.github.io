import React from "react";
import ContactList from "./ContactList";
import { Link } from "react-scroll";
import { Pages } from "../App";
import { Disclosure, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const user = {
  name: "Alex Johnson",
  email: "alexmj212@gmail.com",
  imageUrl: "/img/portrait.jpg",
};

const Navbar = () => {
  return (
    <Disclosure as="nav" className="w-full sticky top-0 z-20 md:px-4">
      {({ open }) => (
        <>
          <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-6 bg-accent1 dark:bg-accent1-dark shadow-2xl md:rounded-md md:mt-4">
            <div className="flex flex-1 items-center justify-between h-16">
              <div className="flex items-center">
                <h2 className="flex-shrink-0 m-0">
                  <Link to={Pages["HOME"].id} smooth className={`text-white dark:text-white-dark hover:text-white dark:hover:text-white-dark cursor-pointer`} aria-current={Pages["HOME"].current ? "page" : undefined}>
                    alexmj212.dev
                  </Link>
                </h2>
                <div className="hidden md:block">
                  <div className="ml-4 lg:ml-8 flex items-baseline space-x-0">
                    {Object.keys(Pages)
                      .map((key) => Pages[key])
                      .filter((page) => !page.disabled)
                      .map((item) => {
                        if (item.href) {
                          return (
                            <a key={item.name} href={item.href} className={`text-white hover:underline hover:text-white dark:hover:text-white-dark px-3 py-2 rounded text-sm cursor-pointer`}>
                              {item.name}
                            </a>
                          );
                        }
                        return (
                          <Link
                            key={item.name}
                            to={item.id}
                            smooth
                            spy={true}
                            className={`text-white hover:underline hover:text-white dark:hover:text-white-dark px-3 py-2 rounded text-sm cursor-pointer`}
                            aria-current={item.current ? "page" : undefined}
                            onClick={() => (item.current = false)}
                          >
                            {item.name}
                          </Link>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-0 flex items-center lg:ml-6">
                  <ContactList></ContactList>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-white dark:text-white-dark hover:text-white focus:outline-none focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <div className="flex justify-center items-center h-6 w-6 text-2xl" aria-hidden="true">
                      <FontAwesomeIcon icon={faTimes} />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center h-6 w-6 text-2xl" aria-hidden="true">
                      <FontAwesomeIcon icon={faBars} />
                    </div>
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel static className="md:hidden bg-accent1 dark:bg-accent1-dark shadow-2xl">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {Object.keys(Pages)
                  .map((key) => Pages[key])
                  .filter((page) => !page.disabled)
                  .map((item) => {
                    if (item.href) {
                      return (
                        <Disclosure.Button key={item.name} className={"block w-full pb-2 px-2 text-left"} aria-current={item.current ? "page" : undefined}>
                        <a
                          key={item.name}
                          href={item.href}
                          className={`flex flex-1 text-white px-3 py-2 rounded text-sm cursor-pointer`}
                        >
                          {item.name}
                        </a>
                      </Disclosure.Button>
                      )
                    }
                    return (
                      <Disclosure.Button key={item.name} className={"block w-full pb-2 px-2 text-left"} aria-current={item.current ? "page" : undefined}>
                        <Link
                          key={item.name}
                          to={item.id}
                          smooth
                          spy={true}
                          activeClass={`bg-accent2 text-white dark:bg-accent2-dark`}
                          className={`flex flex-1 text-white px-3 py-2 rounded text-sm cursor-pointer`}
                          aria-current={item.current ? "page" : undefined}
                          onClick={() => (item.current = false)}
                        >
                          {item.name}
                        </Link>
                      </Disclosure.Button>
                    );
                  })}
              </div>
              <div className="pt-4 pb-3">
                <div className="flex items-center px-6">
                  <div className="flex-shrink-0">
                    <img className={`header-portrait h-16 w-16 m-0`} src={user.imageUrl} alt="" />
                  </div>
                  <div className="ml-4">
                    <div className="text-white">{user.name}</div>
                    <div className="text-sm text-gray-400">{user.email}</div>
                  </div>
                </div>
                <div className={`px-2 py-4`}>
                  <ContactList className={`flex justify-evenly text-4xl w-full`}></ContactList>
                </div>
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
