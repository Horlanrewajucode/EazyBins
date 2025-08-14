import { useState } from "react";
import Logo from "./logo";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleNavBar() {
    setIsOpen((prev) => !prev);
  }
  return (
    <header className="md:flex flex items-center justify-between px-5 md:items-center md:justify-between md:px-20">
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
        <nav className="overflow-y-hidden fixed z-10 top-0 left-0 w-screen min-h-screen flex flex-col justify-center items-center gap-10 duration-300 ease-in py-8 text-[1.3rem]">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">How it Works</a>
          <a href="#">Hubs Near You</a>
          <a href="#">Educational Hub</a>
          <button className="bg-green-600 text-white py-2 px-5 rounded-2xl md:flex cursor-pointer">
            Sign in
          </button>
        </nav>
      ) : (
        <nav className="overflow-y-hidden fixed z-10 top-0 left-[-150%] w-screen min-h-screen flex flex-col justify-center items-center gap-10 duration-300 ease-in"></nav>
      )}
      <nav className="md:flex md:gap-15 hidden text-[1.2rem]">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">How it Works</a>
        <a href="#">Hubs Near You</a>
        <a href="#">Educational Hub</a>
      </nav>
      <button className="bg-green-600 text-white py-2 px-5 rounded-2xl hidden md:flex cursor-pointer">
        Sign in
      </button>
    </header>
  );
}

export default NavBar;
