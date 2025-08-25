import { useState } from "react";

function ClosetHub() {
  const [searchCloset, setSearchCloset] = useState("");

  function handleSearchCloset(e) {
    setSearchCloset(e.target.value);
  }

  function handleSubmitCloset(e) {
    e.preventDefault();
  }
  return (
    <main className="flex flex-col items-center justify-start gap-8 w-[20rem] md:w-[40rem]">
      <h1 className="text-2xl font-semibold">Find Closet Hub</h1>
      <form
        className=" flex items-center justify-start gap-1 md:w-[80%]"
        onSubmit={handleSubmitCloset}
      >
        <input
          type="text"
          placeholder="Search closet hub here..."
          value={searchCloset}
          onChange={handleSearchCloset}
          className="bg-gray-200 w-[90%]  h-10 outline-0 px-6 placeholder:italic rounded-tl-2xl rounded-bl-2xl focus:outline-2 focus:outline-gray-300"
        />
        <button className="bg-gray-200 text-black h-10 px-4 cursor-pointer rounded-tr-2xl rounded-br-2xl font-sans duration-400 ease-in hover:bg-gray-400 hover:font-semibold">
          Search
        </button>
      </form>
      <img src="./find-closet-icon.svg" alt="find-closet-icon"/>
    </main>
  );
}

export default ClosetHub;
