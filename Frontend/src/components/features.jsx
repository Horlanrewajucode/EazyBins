import EducationalHub from "./educationalHub";
import RedeemPoints from "./redeemPoints";
import RequestPickUp from "./requestPickUp";

function Features() {
  return (
    <main className="m-25">
      <h3 className="text-center mb-10 text-2xl md:text-3xl font-bold">Features Overview</h3>
      <div className="flex flex-col md:flex-row items-center gap-20 md:justify-between px-10">
        <RequestPickUp />
        <EducationalHub />
        <RedeemPoints />
      </div>
    </main>
  );
}

export default Features;
