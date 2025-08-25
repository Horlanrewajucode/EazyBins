import { React, useState } from "react";
import Logo from "./logo";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const HomePageNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  function toggleNavBar() {
    setIsOpen((prev) => !prev);
  }

  return (
    <header className="w-full md:flex flex items-center justify-between  md:items-center md:justify-between md:px-10 md:w-full bg-white h-20">
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
        <nav className="overflow-y-hidden fixed z-10 top-0 left-0 w-screen min-h-screen flex flex-col justify-center items-center gap-10 duration-300 ease-in py-8 text-[1.1rem] bg-white">
          <a
            href="#"
            className="hover:border-b-3 hover:border-green-600 duration-200 hover:font-bold"
          >
            Chat
          </a>
          <a
            href="#"
            className="hover:border-b-3 hover:border-green-600 duration-200 hover:font-bold"
          >
            Wallet
          </a>
          <a
            href="#"
            className="hover:border-b-3 hover:border-green-600 duration-200 hover:font-bold"
          >
            Schedule
          </a>
          <a
            href="#"
            className="hover:border-b-3 hover:border-green-600 duration-200 hover:font-bold"
          >
            Educational Hub
          </a>
      
          <a href="#" className="flex items-center gap-4">
            <img src="/noti.png" alt="Notification-icon" />
            Notification
          </a>
          <a href="#" className="flex items-center gap-4">
            <img src="/profile.png" alt="Profile-icon" />
            Profile
          </a>
        </nav>
      ) : (
        <nav className="overflow-y-hidden fixed z-10 top-0 left-[-150%] w-screen min-h-screen flex flex-col justify-center items-center gap-10 duration-300 ease-in"></nav>
      )}
      <nav className="md:flex md:gap-10 hidden text-[1.2rem]">
       <a
            href="#"
            className="hover:border-b-3 hover:border-green-600 duration-200 hover:font-bold"
          >
            Chat
          </a>
          <a
            href="#"
            className="hover:border-b-3 hover:border-green-600 duration-200 hover:font-bold"
          >
            Wallet
          </a>
          <a
            href="#"
            className="hover:border-b-3 hover:border-green-600 duration-200 hover:font-bold"
          >
            Schedule
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
          <img src="/noti.png" alt="Notification-icon" />
        </span>
  
        <span className="cursor-pointer">
          <img src="/profile.svg" alt="Profile-icon" />
        </span>
      </div>
    </header>
  );
};

export default HomePageNavBar;
