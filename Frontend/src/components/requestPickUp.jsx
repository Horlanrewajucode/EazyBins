function RequestPickUp() {
  return (
    <section className="flex flex-col items-center gap-8 bg-white shadow-2xl shadow-stone-400 w-[20rem] px-10 py-6 rounded-2xl">
      <h2 className="text-2xl md:text-3xl font-semibold">Request Pickup</h2>
      <img src="./garbage-truck.svg" alt="garbage-truck-icon" />
      <div className="flex flex-col gap-2 text-[14px]">
        <p>12:00pm 1st September, 2025</p>
        <p>12:00pm 1st September, 2025</p>
        <p>12:00pm 1st September, 2025</p>
        <p>12:00pm 1st September, 2025</p>
      </div>
      <button className="border-pink-300 border-2 rounded-2xl px-8 py-3 text-[18px] font-semibold cursor-pointer hover:bg-pink-400 hover:text-white hover:duration-600">
        Request Pickup
      </button>
    </section>
  );
}

export default RequestPickUp;
