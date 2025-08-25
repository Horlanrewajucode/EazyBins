import ClosetHub from "./closetHub";
import EducationalHub from "./educationalHub";
import EducationalSnippet from "./educationalSnippet";
import RedeemPoints from "./redeemPoints";
import RequestPickUp from "./requestPickUp";

function Features() {
  return (
    <main className="m-25">
      <h3 className="text-center mb-10 text-[20px] md:text-3xl font-bold">
        Features Overview
      </h3>
      <div className="flex flex-col md:flex-row items-center gap-18 md:gap-20 md:justify-between px-10">
        <RequestPickUp />
        <EducationalHub />
        <RedeemPoints />
      </div>
      <div className="flex flex-col-reverse items-center md:justify-between gap-20 md:flex-row mt-20 md:mt-25 md:px-10">
        <ClosetHub />
        <EducationalSnippet/>
      </div>
    </main>
  );
}

export default Features;
