import React, { useState } from "react";
import Logo from "../components/logo";
import Card from "../components/card";
import HomePageNavBar from "../components/homePageNavBar";
import NavBar from "../components/navBar";
import HomePageSearch from "../components/homePageSearch";
import HomePageUser from "../components/homePageUser";
import PrimaryButton from "../components/primaryButton";
import SecondaryButton from "../components/secondaryButton";
import WalletBalance from "../components/walletBalance";
import Explore from "../components/explore";
import HomePageSidebar from "../components/homePageSidebar";

const HomePage = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const toggleSideBar = () => {
    setOpenSideBar(openSideBar => !openSideBar)
  };
    // setOpenSidebar((prev) => !prev);

  return (
    <div className="w-full h-[100%] lg:flex lg:flex-row md:items">
      {/* SideBar */}

      {openSideBar ?
      <>
    <div className="w-[18%] hidden md:hidden lg:block bg-[#EEEFEC] ">
        <HomePageSidebar
          toggleSideBar = {toggleSideBar}
        
        />
      </div>


      <div className="w-full flex-1 flex-col items-center mb-7 gap-2 pl-4 pr-6">
        <HomePageNavBar
         
          toggleSideBar = {toggleSideBar}
          
          
          
        />

        {/* Search */}
        <div className="mt-4 flex flex-row items-center justify-center  md:w-full  md:flexx md:items-center md:justify-end md:mt-6">
          {" "}
          <HomePageSearch />
        </div>

        {/* welcome message */}
        <div className="w-full p-2 flex flex-col items-center justify-center  mt-5 md:w-full md:flex  md:flex-row md:items-center md:justify-between  ">
          <HomePageUser />
          <div className="mt-5 flex flex-row justify-center items-center  md:flex md:flex-row md:items-center  md:justify-between md:mt-0 ">
            {/*  */}
            <PrimaryButton
              buttonText="Request Pickup"
              buttonColor=" border-none  mr-5  cursor-pointer shadow-sm hover:shadow-md text-sm font-bold text-white bg-[#159212] hover:bg-[#6CBF4B]"
            />

            <SecondaryButton
              buttonColor="p-3 border border-2-[#B673CE] text-sm font-bold rounded-md cursor-pointer hover:shadow-md"
              buttonText="View History"
            />
          </div>
        </div>

        {/* wallet balance */}
        <section className="w-full flex flex-col rounded-sm pb-7  shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] mt-5 pr-7 pl-3 bg-[#EEEFEC]">
          <WalletBalance />
        </section>

        {/* Explore */}
        <div className="mt-8 md:w-full md:flex flex md:flex-row md:items-center md:justify-self-start">
          <Explore />
        </div>

        {/* Card */}
        <div className="w-full border-t-[0.5px] flex flex-col items-center gap-6 lg:flex-row md:flex-row md:justify-between md:items-stretch pb-2 md:gap-6 ">
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
</>
      :
      <div className="w-full flex-1 flex-col items-center mb-7 gap-2 pl-4 pr-6">
        <HomePageNavBar
        
          toggleSideBar = {toggleSideBar}
        />

        {/* Search */}
        <div className="mt-4 flex flex-row items-center justify-center  md:w-full  md:flexx md:items-center md:justify-end md:mt-6">
          {" "}
          <HomePageSearch />
        </div>

        {/* welcome message */}
        <div className="w-full p-2 flex flex-col items-center justify-center  mt-5 md:w-full md:flex  md:flex-row md:items-center md:justify-between  ">
          <HomePageUser />
          <div className="mt-5 flex flex-row justify-center items-center  md:flex md:flex-row md:items-center  md:justify-between md:mt-0 ">
            {/*  */}
            <PrimaryButton
              buttonText="Request Pickup"
              buttonColor=" border-none  mr-5  cursor-pointer shadow-sm hover:shadow-md text-sm font-bold text-white bg-[#159212] hover:bg-[#6CBF4B]"
            />

            <SecondaryButton
              buttonColor="p-3 border border-2-[#B673CE] text-sm font-bold rounded-md cursor-pointer hover:shadow-md"
              buttonText="View History"
            />
          </div>
        </div>

        {/* wallet balance */}
        <section className="w-full flex flex-col rounded-sm pb-7  shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] mt-5 pr-7 pl-3 bg-[#EEEFEC]">
          <WalletBalance />
        </section>

        {/* Explore */}
        <div className="mt-8 md:w-full md:flex flex md:flex-row md:items-center md:justify-self-start">
          <Explore />
        </div>

        {/* Card */}
        <div className="w-full border-t-[0.5px] flex flex-col items-center gap-6 lg:flex-row md:flex-row md:justify-between md:items-stretch pb-2 md:gap-6 ">
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

      }
    </div>
  );
};

export default HomePage;
