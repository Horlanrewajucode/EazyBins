import { useState } from "react";
import Logo from "./logo";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleNavBar() {
    setIsOpen((prev) => !prev);
  }
  return (
    <header className="md:flex flex items-center justify-between px-5 md:items-center md:justify-between md:px-20 fixed top-0 left-0 w-full bg-white h-20">
      <Logo />
      {!isOpen && (
        <div
          onClick={toggleNavBar}
          className="cursor-pointer md:hidden lg:hidden"
        >
          <HiMenu size={30} color="green" />
        </div>
      )}
      {isOpen && (
        <div
          onClick={toggleNavBar}
          className="cursor-pointer md:hidden lg:hidden z-20"
        >
          <IoClose size={30} color="green" />
        </div>
      )}

      {isOpen ? (
        <nav className="overflow-y-hidden fixed z-10 top-0 left-0 w-screen min-h-screen flex flex-col justify-center items-center gap-10 duration-300 ease-in py-8 text-[1.3rem] bg-white">
          <a
            href="#"
            className="hover:border-b-3 hover:border-green-600 duration-200 hover:font-bold"
          >
            Home
          </a>
          <a
            href="#"
            className="hover:border-b-3 hover:border-green-600 duration-200 hover:font-bold"
          >
            About
          </a>
          <a
            href="#"
            className="hover:border-b-3 hover:border-green-600 duration-200 hover:font-bold"
          >
            How it Works
          </a>
          <a
            href="#"
            className="hover:border-b-3 hover:border-green-600 duration-200 hover:font-bold"
          >
            Hubs Near You
          </a>
          <a
            href="#"
            className="hover:border-b-3 hover:border-green-600 duration-200 hover:font-bold"
          >
            Educational Hub
          </a>
          <a href="#" className="flex items-center gap-4">
            <img src="./line-md_bell-loop.svg" alt="Notification-icon" />
            Notification
          </a>
          <a href="#" className="flex items-center gap-4">
            <img src="./profile.svg" alt="Profile-icon" />
            Profile
          </a>

          <button className="bg-green-600 text-white py-2 px-5 rounded-2xl md:flex cursor-pointer hover:font-bold hover:bg-green-800 duration-500">
            Sign in
          </button>
        </nav>
      ) : (
        <nav className="overflow-y-hidden fixed z-10 top-0 left-[-150%] w-screen min-h-screen flex flex-col justify-center items-center gap-10 duration-300 ease-in"></nav>
      )}
      <nav className="md:flex md:gap-15 hidden text-[1.2rem]">
        <a
          href="#"
          className="hover:border-b-3 hover:border-green-600 duration-200 hover:font-bold"
        >
          Home
        </a>
        <a
          href="#"
          className="hover:border-b-3 hover:border-green-600 duration-200 hover:font-bold"
        >
          About
        </a>
        <a
          href="#"
          className="hover:border-b-3 hover:border-green-600 duration-200 hover:font-bold"
        >
          How it Works
        </a>
        <a
          href="#"
          className="hover:border-b-3 hover:border-green-600 duration-200 hover:font-bold"
        >
          Hubs Near You
        </a>
        <a
          href="#"
          className="hover:border-b-3 hover:border-green-600 duration-200 hover:font-bold"
        >
          Educational Hub
        </a>
      </nav>
      <div className="hidden md:flex items-center gap-6">
        <span className="cursor-pointer">
          <img src="./line-md_bell-loop.svg" alt="Notification-icon" />
        </span>
        <Link
          to="/signup"
          className="bg-green-600 text-white py-2 px-5 rounded-2xl hidden md:flex cursor-pointer hover:font-bold hover:bg-green-800 duration-500"
        >
          Sign in
        </Link>
        <span className="cursor-pointer">
          <img src="./profile.svg" alt="Profile-icon" />
        </span>
      </div>
    </header>
  );
}

export default NavBar;
