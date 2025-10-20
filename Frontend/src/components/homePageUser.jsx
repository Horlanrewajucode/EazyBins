import React, { useState, useEffect } from "react";

const HomePageUser = () => {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user && user.firstName) {
          setUserName(user.firstName);
        }
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
      }
    }
  }, []);

  return (
    <div>
      <h1 className="text-3xl pr-3 pl-14 font-[800] border-t-4 border-b-4 border-r-60 border-[#F0E1F5]">
        Welcome Back, {userName}
      </h1>
    </div>
  );
};

export default HomePageUser;