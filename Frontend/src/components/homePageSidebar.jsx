import React from "react";
import Logo from "./logo";
import { Link } from "react-router-dom";

const HomePageSidebar = ({toggleSideBar}) => {
  return (
    <div className="h-[100%] flex flex-col justify-between pb-8 pl-1  ">
      <nav className="flex flex-col gap-5">
        <div className="w-full flex flex-row items-center ">           <img onClick={toggleSideBar} className=" pl-2 cursor-pointer" src="/hambuger.png" alt=""  />
          <Logo />
        </div>

        <Link to='/'  className="w-full ml-2 flex flex-row items-center cursor-pointer">
          <img src="/home.png" alt="Home image" />
          <p className="pl-4">Home</p>
        </Link>

        <Link to='/schedulePage' className="w-full ml-1 flex flex-row items-center cursor-pointer">
          <img src="/schedule.png" alt="Schedule" />
          <p className="pl-3">Schedule</p>
        </Link>

        <Link to='/chatPage' className="w-full ml-2 flex flex-row items-center cursor-pointer">
          <img src="/chat.png" alt="Chat image" />
          <p className="pl-3">Chat</p>
        </Link>

        <Link to='/walletPage' className="w-full ml-1 flex flex-row items-center cursor-pointer">
          <img src="/wallet.png" alt="Wallet image" />
          <p className="pl-3"> Wallet</p>
        </Link>

        <Link to='/educationalHubPage' className="w-full ml-1 flex flex-row items-center cursor-pointerw-f">
          <img src="/graduation-cap.png" alt="Graduation-cap icon" />
          <p className="pl-3">Educational Hub</p>
        </Link>

        <Link to='/historyPage' className="w-full ml-1 flex flex-row items-center cursor-pointer">
          <img src="/history.png" alt="History icon" />
          <p className="pl-3">History</p>
        </Link>

        <Link to='/profilePage' className="w-full ml-1 flex flex-row items-center cursor-pointer">
          <img src="/profile.png" alt="Profile icon" />
          <p className="pl-3"> Profile</p>
        </Link>

        <Link to='/settings' className="w-full ml-1 flex flex-row items-center cursor-pointer">
          <img src="/settings.png" alt="Setting icon" />
          <p className="pl-3">settings</p>
        </Link>

        <Link to='/about-us' className="w-full ml-1 flex flex-row items-center cursor-pointer">
          <img src="/about-us.png" alt="Abouts-us icon" />
          <p className="pl-3">About us</p>
        </Link>

        <Link to='/contact-us' className="w-full ml-1 flex flex-row items-center cursor-pointer">
          <img src="/phone.png" alt="Contact-us icon" />
          <p className="pl-3">Contact us</p>
        </Link>
      </nav>

      {/* Log Out */}

      <div className="">
        <div className="flex flex-row w-full ml-1 items-center cursor-pointer">
          <img src="log-out.png" alt="Log out" />
          <button className="ml-3   text-sm cursor-pointer ">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePageSidebar;
