function EducationalSnippet() {
  return (
    <main className="flex flex-col items-center gap-8 bg-white shadow-2xl shadow-stone-400 w-[21rem] md:w-[40rem] px-10 py-6 rounded-2xl">
      <h1 className="text-2xl md:text-3xl font-semibold">
        Educational Snippet
      </h1>
      <h3 className="text-[16px] md:text-2xl">Why Waste Management Matters</h3>
      <div className="flex flex-col gap-2 text-[14px] md:text-[17px] text-center">
        <li>
          Protect Our Health: Improper Waste Disposal Can Pollute The Air...
        </li>
        <li>
          Protect Our Health: Improper Waste Disposal Can Pollute The Air...
        </li>
        <li>
          Protect Our Health: Improper Waste Disposal Can Pollute The Air...
        </li>
      </div>
      <button className="border-pink-300 border-2 rounded-2xl px-8 py-3 text-[18px] font-semibold cursor-pointer hover:bg-pink-400 hover:text-white hover:duration-600">
        View History
      </button>
    </main>
  );
}

export default EducationalSnippet;
