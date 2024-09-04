import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaMoon } from "react-icons/fa";
import { useContext } from "react";
import { authContext } from "../AuthContext/AuthContext";

export default function NavBar() {
  const navigate = useNavigate()
  const { token, setToken } = useContext(authContext)
  function loguserOut() {
    setToken(null)
    localStorage.removeItem('tkn')
    navigate('/login')

  }
  return (
    <>
      <nav className="bg-slate-950 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link>
            <div className="flex items-center gap-2">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8"
                alt="Flowbite Logo"
              />

              <h1 className="text-3xl px-1 text-white font-bold">NoteApp</h1>
            </div>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-slate-950 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {token ? (
                <li>
                  <NavLink
                    to="/"
                    className="block py-2 px-3 text-white  rounded  md:text-white dark:text-white md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
              ) : null}
              {token ? null : (
                <li>
                  <NavLink
                    to="/register"
                    className="block py-2 px-3 text-white  rounded  md:text-white dark:text-white md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Register
                  </NavLink>
                </li>
              )}
              {token ? null : (
                <li>
                  <NavLink
                    to="/login"
                    className="block py-2 px-3 text-white  rounded  md:text-white dark:text-white md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Login
                  </NavLink>
                </li>
              )}
              {token ? (
                <li>
                  <span
                    onClick={loguserOut}
                    className="block py-2 px-3 text-white cursor-pointer hover:bg-blue-500 transition-all  rounded  md:text-white dark:text-white md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Log Out
                  </span>
                </li>
              ) : null}
              <li>
                <h2
                  className="block py-2 px-3 cursor-pointer  hover:bg-blue-500 transition-all text-white text-xl  rounded  md:text-white dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  <FaMoon />
                </h2>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
