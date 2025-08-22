import GetStartedImage from "./getStartedImage";
import GetStartedText from "./getStartedText";

function GetStarted() {
  return (
    <section className="bg-green-400 mt-4 flex gap-16 flex-col-reverse md:flex-row items-center md:justify-between py-15 md:px-30">
      <GetStartedText />
      <GetStartedImage />
    </section>
  ); 
}

export default GetStarted;
