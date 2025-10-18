import { React, useState } from "react";
import Logo from "./logo";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import HomePage from "../pages/homePage";

const HomePageNavBar = ({ toggleSideBar, openSideBar }) => {
  const [isOpen, setIsOpen] = useState(false);
  function toggleNavBar() {
    setIsOpen((prev) => !prev);
  }

  return (
    <header className="w-full md:flex flex items-center justify-between  md:items-center md:justify-between md:px-2 md:w-full bg-white h-20">
      <div className="flex flex-row items-center justify-center">
        
      

        {!openSideBar ? 
        (
          <img
            onClick={toggleSideBar}
            className="hidden md:block mr-5 cursor-pointer"
            src="/hambuger.png"
            alt=""
          />
        ) : ''}


        {isOpen && (
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
        <Logo />
      </div>

      <img className="w-12 md:hidden lg:hidden" src="/bc.png" alt="BC image" />

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
      <nav className="md:flex mr-1 md:gap-8 hidden text-[1.2rem] md:text-[1.2rem]">
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
      <div className="hidden md:flex items-center gap-8">
        <span className="cursor-pointer">
          <img src="/noti.png" alt="Notification-icon" />
        </span>

        <span className="cursor-pointer">
          <img className="w-12" src="/bc.png" alt="BC-icon" />
        </span>
      </div>
    </header>
  );
};

export default HomePageNavBar;
