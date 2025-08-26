import React from "react";
import Logo from "../components/logo";
import Card from "../components/card";

const HomePage = () => {
  return (
    <div className="w-full h-screen bg-white pl-4 pr-10">
      {/* Header */}
      <header className="w-full flex flex-col pr-9">
        <nav className=" w-100% bg-white flex flex-row items-center justify-between pl-2 pt-4 pr-2 ">
          {/* Logo */}
          <div className="flex flex-row items-center pl-5">
            <div className="cursor-pointer">
              {" "}
              <img src="/Vectorhome.png" alt="" />
            </div>

            <div className="logo cursor-pointer">
              {<Logo />}
              {/* <img src="/Eazybins-logo.svg" alt="" /> */}
            </div>
          </div>

          {/* Links */}
          <ul className="links list-none space-x-15 flex flex-row justify-between items-center mr-5 ">
            <li className="cursor-pointer text-sm font-bold">Chat</li>
            <li className="cursor-pointer text-sm font-bold">Wallet</li>
            <li className="cursor-pointer text-sm font-bold">Schedule</li>
            <li className="cursor-pointer text-sm font-bold">
              Educational Hub
            </li>
          </ul>

          <div className="flex flex-row items-center justify-between ">
            <div>
              <img
                className="mr-7 cursor-pointer"
                src="/noti.png"          
              />
            </div>
            <div>
              <img className="cursor-pointer" src="/profile.png" alt="profile-img" />
            </div>
          </div>
        </nav>

        {/* search */}

        <div className="mt-8">
          <div className="w-[550px] bg-[#EEEFEC] pl-2 text-sm rounded-md flex justify-self-end items-center justify-between pr-4">
            <input
              className="w-full p-1 focus:outline-none "
              type="text"
              placeholder="Search"
            />
            <img className="ml-2 cursor-pointer" src="/dropdown.png" alt="" />
          </div>
        </div>
      </header>

      {/* welcome message */}
      <div className="w-full mt-5 flex pl-1 flex-row items-center justify-between">
        <h1
          className="text-3xl pr-3 pl-14 font-[800] border-t-4
        border-b-4 border-r-60 border-[#F0E1F5]"
        >
          Welcome Back, User{" "}
        </h1>
        <div className="flex flex-row items-center justify-end mr-10">
          <button className="pt-2 pb-2 pl-4 pr-4 mt-2 mb-2 mr-3 rounded-md border-none cursor-pointer shadow-sm hover:shadow-md text-sm font-bold text-white bg-[#159212] hover:bg-[#6CBF4B]">
            Request Pickup
          </button>
          <span className="p-3 border text-[#B673CE] border-2-[#F0E1F5] text-sm font-bold rounded-md cursor-pointer">
            View History
          </span>
        </div>
      </div>

      {/* wallet balance */}
      <section className="w-full flex flex-col rounded-sm pb-7  shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] mt-5 pr-7 pl-3 bg-[#EEEFEC]">
        <div className="flex flex-row items-center mt-2 pr-12 justify-between">
          <div className="flex flex-row items-center pb-2 pt-2">
            <img src="/tdesign_money.png" alt="" />
            <p className="text-sm text-[#101010] ml-2">WALLET BALANCE</p>
          </div>

          <img className="cursor-pointer" src="/eye.png" alt="" />
        </div>

        <div className="mt-4">
          <p className="text-2xl font-bold p-1 text-[#6CBF4B]">#0.00</p>
        </div>

        <div className="flex mt-42flex-row items-center justify-center">
          <button className="text-[15px] text-[#B673CE] p-2">
            View History
          </button>
        </div>
      </section>

      {/* Explore */}
      <div className="mt-5">
        <p className="text-[#101010] text-sm font-semibold ml-2">Explore</p>
      </div>

      {/* Cards grid grid-cols-1 gap-9 mb-5  md:grid-cols-2 lg:grid-cols-3*/}
      <div   className=" flex flex-col lg:flex-row justify-between items-stretch pb-9 pt-9 gap-6" >
        <Card
          title="Convenient Pickups"
          images="/card-img1.png"
          desc="Earn points for recycling and redeem them for exciting rewards"
          buttonText="Request Pickup"
      buttonColor="border-none cursor-pointer shadow-sm hover:shadow-md text-sm font-bold text-white bg-[#159212] hover:bg-[#6CBF4B]"
        />

          <Card
          title="Convenient Pickups"
          images="/card-img2.png"
          desc="Earn points for recycling and redeem them for exciting rewards"
          buttonText="Request Pickup"
         buttonColor="border-none cursor-pointer shadow-sm hover:shadow-md text-sm font-bold text-white bg-[#159212] hover:bg-[#6CBF4B]"
        />

         <Card
          title="Convenient Pickups"
          images="/card-img3.png"
          desc="Monitor your watse disposal and see the difference you are making"
          buttonText="Request Pickup"
          buttonColor="border-none cursor-pointer shadow-sm hover:shadow-md text-sm font-bold text-white bg-[#159212] hover:bg-[#6CBF4B]"
        />

       
      </div>
    </div>
  );
};

export default HomePage;