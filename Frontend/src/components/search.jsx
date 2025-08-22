import { useState } from "react";

function Search() {
  const [search, setSearch] = useState("");
  function handleSearch(e) {
    setSearch(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <form
      className="mt-20 flex items-center justify-end gap-1 px-6 md:px-18"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search here..."
        className="bg-gray-200 w-[70%] h-10 md:w-[20%] outline-0 px-6 placeholder:italic rounded-tl-2xl rounded-bl-2xl focus:outline-2 focus:outline-gray-300"
      />
      <button className="bg-gray-200 text-black h-10 px-4 cursor-pointer rounded-tr-2xl rounded-br-2xl font-sans duration-400 ease-in hover:bg-gray-400 hover:font-semibold">
        Search
      </button>
    </form>
  );
}

export default Search;
