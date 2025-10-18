import React from "react";
import Logo from "./logo";

const HomePageSidebar = ({ toggleSideBar }) => {
  return (
    <div className="h-[100%] flex flex-col justify-between pb-8 pl-1  ">
      <nav className="flex flex-col gap-5">
        <div className="w-full flex flex-row items-center mt-3 ">
          <img
            onClick={toggleSideBar}
            className="mr-5 cursor-pointer"
            src="/hambuger.png"
            alt=""
          />
          <div className="w-[50%] ml-8">
            <Logo />
          </div>
        </div>

        <div className="w-full ml-2 flex flex-row items-center cursor-pointer">
          <img src="/home.png" alt="Home image" />
          <p className="pl-4">Home</p>
        </div>

        <div className="w-full ml-1 flex flex-row items-center cursor-pointer">
          <img src="/schedule.png" alt="Schedule" />
          <p className="pl-3">Schedule</p>
        </div>

        <div className="w-full ml-2 flex flex-row items-center cursor-pointer">
          <img src="/chat.png" alt="Chat image" />
          <p className="pl-3">Chat</p>
        </div>

        <div className="w-full ml-1 flex flex-row items-center cursor-pointer">
          <img src="/wallet.png" alt="Wallet image" />
          <p className="pl-3"> Wallet</p>
        </div>

        <div className="w-full ml-1 flex flex-row items-center cursor-pointerw-f">
          <img src="/graduation-cap.png" alt="Graduation-cap icon" />
          <p className="pl-3">Educational Hub</p>
        </div>

        <div className="w-full ml-1 flex flex-row items-center cursor-pointer">
          <img src="/history.png" alt="History icon" />
          <p className="pl-3">History</p>
        </div>

        <div className="w-full ml-1 flex flex-row items-center cursor-pointer">
          <img src="/profile.png" alt="Profile icon" />
          <p className="pl-3"> Profile</p>
        </div>

        <div className="w-full ml-1 flex flex-row items-center cursor-pointer">
          <img src="/settings.png" alt="Setting icon" />
          <p className="pl-3">settings</p>
        </div>

        <div className="w-full ml-1 flex flex-row items-center cursor-pointer">
          <img src="/about-us.png" alt="Abouts-us icon" />
          <p className="pl-3">About us</p>
        </div>

        <div className="w-full ml-1 flex flex-row items-center cursor-pointer">
          <img src="/phone.png" alt="Contact-us icon" />
          <p className="pl-3">Contact us</p>
        </div>
      </nav>

      {/* Log Out */}

      <div className="mb-10">
        <div className=" flex flex-row w-full ml-1 items-center cursor-pointer">
          <img src="log-out.png" alt="Log out" />
          <button className="ml-3   text-sm cursor-pointer ">Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default HomePageSidebar;
