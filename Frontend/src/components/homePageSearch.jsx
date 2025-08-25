import React from "react";

const HomePageSearch = () => {
  return (
    <div>
      <form className="flex w-100 md:w-120  border bg-[#EEEFEC] pl-2 text-sm rounded-md md:flex justify-self-end items-center justify-between pr-4 ">
        {/* flex w-90 border bg-[#EEEFEC] pl-2 text-sm rounded-md md:flex justify-self-end items-center justify-between pr-4  */}
        <input
          className="w-full p-1 focus:outline-none "
          type="text"
          placeholder="Search"
        />
        <img className="ml-2  cursor-pointer" src="/dropdown.png" alt="" />
      </form>
    </div>
  );
};

export default HomePageSearch;
