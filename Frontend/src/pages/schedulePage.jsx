import React, { useState } from "react";
import HomePageSidebar from "../components/homePageSidebar";
import HomePageNavBar from "../components/homePageNavBar";
import { Check } from "@mui/icons-material";

const SchedulePage = () => {
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [paymentType, setPaymentType] = useState("subscription");
  const [showSuccess, setShowSuccess] = useState(false);
  const [recentSchedules, setRecentSchedules] = useState([
    {
      time: "8:00am",
      date: "Monday, 4th February 2025",
      status: "Completed +10 points",
    },
    {
      time: "2:00pm",
      date: "Monday, 4th February 2025",
      status: "Completed +10 points",
    },
  ]);

  const handleConfirmPickup = () => {
    if (!selectedTime || !selectedDate) {
      alert("Please select both a date and time!");
      return;
    }

    const newSchedule = {
      time: selectedTime,
      date: new Date(selectedDate).toDateString(),
      status: "Scheduled",
    };

    setRecentSchedules((prev) => [newSchedule, ...prev]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleCancel = () => {
    setSelectedTime("");
    setSelectedDate("");
  };

  const timeSlots = [
    { id: 1,
      first: "8:00am",
      second: "9:00am",
       third: "10:00am",
     
    },
    {id: 2,
      first: "10:30am",
       second: "11:00am",
       third: "11:30am",
    },
    {id: 3,
      first: "12:00mm",
       second: "12:30pm",
       third: "1:00pm",
    },
    {id: 4,
      first: "1:30pm",
       second: "2:00pm",
       third: "2:30pm",
    },
    {id: 5,
      first: "3:00pm",
       second: "3:30pm",
         third: "4:00pm",
    },
    {id: 6,
      first: "4:30pm",
       second: "5:00pm",
       third: "5:30pm"
    },
    {id: 7,
      first: "6:00pm",
       second: "6:30pm",
        third: "7:00pm"
    },
  ];

  console.log(timeSlots[0]);

  const [openSideBar, setOpenSideBar] = useState(false);

  const toggleSideBar = () => {
    setOpenSideBar((openSideBar) => !openSideBar);
  };

  return (
    // className="w-full min-h-screen lg:flex lg:flex-row md:items"
    <div className="w-full min-h-screen pl-5 md:flex md:flex-row justify-between">
      {openSideBar ? (
        <>
          <aside className="w-[15%] h-screen hidden md:hidden lg:block bg-[#EEEFEC]">
            <HomePageSidebar toggleSideBar={toggleSideBar} />
          </aside>

          <main className="w-full flex-1 flex-col items-center mb-7 gap-2 pl-4 pr-6">
            <HomePageNavBar
              toggleSideBar={toggleSideBar}
              openSideBar={openSideBar}
            />

            <h2 className="text-2xl font-semibold mb-2">Hello, User</h2>
            <p className="text-gray-600 mb-6">
              Pick a date, we’ll take the weight!
            </p>

            <div className="flex space-x-2 mb-6">
              <button
                onClick={() => setPaymentType("subscription")}
                className={`px-4 py-2 rounded ${
                  paymentType === "subscription"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Subscription
              </button>
              <button
                onClick={() => setPaymentType("one-time")}
                className={`px-4 py-2 rounded ${
                  paymentType === "one-time"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                One-Time Payment
              </button>
            </div>
{/* Time + Date Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Time Slots */}
          <div>
            <h3 className="mb-3 font-medium">Select Time Slot</h3>
            {timeSlots.map((time) => (
              <div key={time.id} className="mb-8 cursor-pointer">
                {/* First time */}
                <div
                  onClick={() => setSelectedTime(time.first)}
                  className={`w-full border-b-1 mb-1 pb-5  rounded-lg transition-all ${
                    selectedTime === time.first
                      ? "bg-green-500 text-white font-semibold"
                      : "hover:bg-green-50"
                  }`}
                >
                  {time.first}
                </div>

                {/* Second time */}
                <div
                  onClick={() => setSelectedTime(time.second)}
                  className={`w-full border-b-1 mb-4 pb-5  rounded-lg transition-all ${
                    selectedTime === time.second
                      ? "bg-green-500 text-white font-semibold"
                      : "hover:bg-green-50"
                  }`}
                >
                  {time.second}
                </div>

                {/* Third time with right line */}
                <div className="flex items-center">
                  <div
                    onClick={() => setSelectedTime(time.third)}
                    className={`border-1 p-2 rounded-xl w-[50%] text-center cursor-pointer transition-all ${
                      selectedTime === time.third
                        ? "bg-green-500 text-white font-semibold"
                        : "hover:bg-green-50"
                    }`}
                  >
                    {time.third}
                  </div>
                  <div className="flex w-[50%]">
                    <div className="inline-block flex-1 border-t-1 mt-0 border-gray-300"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Pick a Date
                </label>
                <input
                  type="date"
                  className="w-full border rounded-lg mb-68 p-2"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />

                <div className="flex mt-6 space-x-4">
                  <button
                    onClick={handleConfirmPickup}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Confirm Pickup
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>

                <div className="mt-8">
              <p className="text-gray-700">
                <strong>Address:</strong> 23 Palm Street, Ikeja, Lagos
              </p>
              <p className="text-gray-500 text-sm">
                <strong>Note:</strong> Near Community Hall, pick around 8 AM.
              </p>
            </div>
              </div>
            </div>

           

            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-3">Recent Schedule</h3>
              <table className="w-full border-collapse bg-white shadow rounded-lg">
                <thead>
                  <tr className="bg-green-100 text-left">
                    <th className="p-3">Time</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSchedules.map((item, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="p-3">{item.time}</td>
                      <td className="p-3">{item.date}</td>
                      <td className="p-3 text-green-600">{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>

          {showSuccess && (
            <div className=" max-w-[250px] h-[200px] my-auto mx-auto shadow-lg fixed inset-0 bg-white bg-opacity-40 flex flex-col items-center justify-center">
              <div className=" w-[120px] h-[120px] bg-green-500 text-white text-center rounded-full   ">
                <div className="text-center text-white text-6xl mt-8">✓</div>
   
              </div>
                <p className="text-xl font-semibold mt-2">Successful!</p>
            </div>
          )}
        </>
      ) : (
        <main className="w-full flex-1 flex-col items-center mb-7 gap-2 pl-4 pr-6">
          <HomePageNavBar toggleSideBar={toggleSideBar} />

          <h2 className="text-2xl font-semibold mb-2">Hello, User</h2>
          <p className="text-gray-600 mb-6">
            Pick a date, we’ll take the weight!
          </p>

          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setPaymentType("subscription")}
              className={`px-4 py-2 rounded ${
                paymentType === "subscription"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Subscription
            </button>
            <button
              onClick={() => setPaymentType("one-time")}
              className={`px-4 py-2 rounded ${
                paymentType === "one-time"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              One-Time Payment
            </button>
          </div>

       
            {/* Time + Date Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Time Slots */}
          <div>
            <h3 className="mb-3 font-medium">Select Time Slot</h3>
            {timeSlots.map((time) => (
              <div key={time.id} className="mb-8 cursor-pointer">
                {/* First time */}
                <div
                  onClick={() => setSelectedTime(time.first)}
                  className={`w-full border-b-1 mb-1 pb-5  rounded-lg transition-all ${
                    selectedTime === time.first
                      ? "bg-green-500 text-white font-semibold"
                      : "hover:bg-green-50"
                  }`}
                >
                  {time.first}
                </div>

                {/* Second time */}
                <div
                  onClick={() => setSelectedTime(time.second)}
                  className={`w-full border-b-1 mb-4 pb-5  rounded-lg transition-all ${
                    selectedTime === time.second
                      ? "bg-green-500 text-white font-semibold "
                      : "hover:bg-green-50"
                  }`}
                >
                  {time.second}
                </div>

                {/* Third time with right line */}
                <div className="flex items-center">
                  <div
                    onClick={() => setSelectedTime(time.third)}
                    className={`border-1 p-2 rounded-xl w-[50%] text-center cursor-pointer transition-all ${
                      selectedTime === time.third
                        ? "bg-green-500 text-white font-semibold"
                        : "hover:bg-green-50"
                    }`}
                  >
                    {time.third}
                  </div>
                  <div className="flex w-[50%]">
                    <div className="inline-block flex-1 border-t-1 mt-0 border-gray-400"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

            <div className="w-50%">
              <label className="block text-sm font-medium mb-2">
                Pick a Date
              </label>
              <input
                type="date"
                className="w-full border rounded-lg mb-68 p-2"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />

              <div className="flex mt-6 space-x-4">
                <button
                  onClick={handleConfirmPickup}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Confirm Pickup
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>

              <div className="mt-8">
              <p className="text-gray-700">
                <strong>Address:</strong> 23 Palm Street, Ikeja, Lagos
              </p>
              <p className="text-gray-500 text-sm">
                <strong>Note:</strong> Near Community Hall, pick around 8 AM.
              </p>
            </div>
            </div>

            
          </div>

         

          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-3">Recent Schedule</h3>
            <table className="w-full border-collapse bg-white shadow rounded-lg">
              <thead>
                <tr className="bg-green-100 text-left">
                  <th className="p-3">Time</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentSchedules.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-3">{item.time}</td>
                    <td className="p-3">{item.date}</td>
                    <td className="p-3 text-green-600">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showSuccess && (
            <div className=" max-w-[250px] h-[200px] my-auto mx-auto shadow-lg fixed inset-0 bg-white bg-opacity-40 flex flex-col items-center justify-center">
              <div className=" w-[120px] h-[120px] bg-green-500 text-white text-center rounded-full   ">
                <div className="text-center text-white text-6xl mt-8">✓</div>
   
              </div>
                <p className="text-xl font-semibold mt-2">Successful!</p>
            </div>
          )}
        </main>
      )}
    </div>
  );
};

export default SchedulePage;


