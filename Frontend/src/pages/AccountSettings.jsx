import { useState } from "react";
import HomePageNavBar from "../components/homePageNavBar";

const AccountSettings = () => {
  // Load from localStorage directly if available
  const storedData = JSON.parse(localStorage.getItem("profileData")) || {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    location: "",
  };

  const storedImage = localStorage.getItem("profileImage") || null;

  const [formData, setFormData] = useState(storedData);
  const [profileImage, setProfileImage] = useState(storedImage);

  const states = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "FCT Abuja",
  ];

  const handleChange = (e) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);
    localStorage.setItem("profileData", JSON.stringify(updated)); // save live
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Updated Info:", formData);
    alert("Profile updated successfully!");

    localStorage.removeItem("profileData");
    localStorage.removeItem("profileImage");

    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      address: "",
      location: "",
    });
    setProfileImage(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      localStorage.setItem("profileImage", reader.result);
    };
    reader.readAsDataURL(file);
  };
  const toggleSideBar = () => {
    setOpenSideBar((openSideBar) => !openSideBar);
  };

  return (
    <div className="min-h-screen py-10 container mx-auto px-4 sm:px-6 md:px-[65px]">
      <HomePageNavBar />

      <h1
        className="text-3xl font-semibold text-gray-800 mb-10 mt-10
      "
      >
        Account Settings
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-start gap-10">
        {/* LEFT FORM SECTION */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-3/5 rounded-2xl p-8 bg-transparent"
        >
          {/* Inputs */}
          <div>
            {[
              { label: "First Name", name: "firstName", type: "text" },
              { label: "Last Name", name: "lastName", type: "text" },
              { label: "Username", name: "username", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone", name: "phone", type: "tel" },
              { label: "Address", name: "address", type: "text" },
            ].map((field) => (
              <div key={field.name} className="flex items-center mb-4">
                <label className="text-sm font-medium text-gray-700 w-1/7">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-[calc(100%-10px)] border-none border-b border-gray-200 rounded-lg p-2.5 bg-[#f8f9f8] focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            ))}

            {/* Location dropdown */}
            <div className="flex items-center mb-4">
              <label className="text-sm font-medium text-gray-700 w-1/7">
                Location
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-[calc(100%-10px)] border-none border-b border-gray-200 rounded-lg p-2.5 bg-[#f8f9f8] focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select your state</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Update Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 font-bold text-white px-13 py-2 rounded-lg transition-all duration-200"
            >
              Update
            </button>
          </div>
        </form>

        {/* RIGHT PROFILE SECTION */}
        <div className="flex flex-col items-center w-full md:w-1/3">
          <div className="w-40 h-40 rounded-full bg-green-300 flex items-center justify-center overflow-hidden text-4xl  text-green-800 font-bold">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                {formData.firstName.charAt(0).toUpperCase()}
                {formData.lastName.charAt(0).toUpperCase()}
              </>
            )}
          </div>

          <label
            htmlFor="profile-upload"
            className="mt-4 border border-black-700 text-black-800 font-bold px-4 py-2 rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
          >
            Change profile picture
          </label>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>
      <div className="">
        <div className="flex flex-row w-full ml-1 items-center cursor-pointer">
          <img src="log-out.png" alt="Log out" />
          <button className="ml-3   text-sm cursor-pointer ">Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
