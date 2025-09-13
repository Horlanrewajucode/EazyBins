function EducationalHub() {
  return (
    <section className="flex flex-col items-center gap-8 bg-white shadow-2xl shadow-stone-400 w-[21rem] px-10 py-6 rounded-2xl">
      <h2 className="text-2xl md:text-3xl font-semibold">Educational Hub</h2>
      <img src="./educational-icon.svg" alt="Educational-hub-icon" />
      <div className="flex flex-col gap-2 text-[12px]">
        <p>How to Sort Waste properly For Disposal </p>
        <p>How to Sort Waste properly For Disposal </p>
        <p>How to Sort Waste properly For Disposal </p>
        <p>How to Sort Waste properly For Disposal </p>
      </div>
      <button className="border-pink-300 border-2 rounded-2xl px-8 py-3 text-[18px] font-semibold cursor-pointer hover:bg-pink-400 hover:text-white hover:duration-600">
        View Hub
      </button>
    </section>
  );
}

export default EducationalHub;
