import { Link } from "react-router-dom";

function GetStartedText() {
  return (
    <article className="flex flex-col gap-6 items-center-safe px-8 leading-4">
      <div className="flex flex-col items-center gap-3">
        <h1 className="font-extrabold text-[30px] font-serif text-center leading  md:font-bold md:w-[75%] md:text-[50px] md:text-center md:leading-14 leading-9">
          Clean Communities, Better Tomorrow.
        </h1>
        <p className="font-mono text-[14px] text-center md:text-[17px]">
          Join us to reduce waste, earn rewards and find nearby hubs.
        </p>
      </div>
      <div className="flex md:gap-8 gap-5">
        <Link to='/signup' className="cursor-pointer bg-green-800 font-semibold text-white px-6 py-3 rounded-2xl hover:font-bold duration-500">
          Get Started
        </Link>
        <button className="cursor-pointer font-semibold px-6 py-3 border-3 border-gray-300 rounded-2xl hover:font-bold duration-500">
          View History
        </button>
      </div>
    </article>
  );
}

export default GetStartedText;
