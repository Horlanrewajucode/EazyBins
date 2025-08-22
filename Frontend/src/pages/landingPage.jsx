import Features from "../components/features";
import GetStarted from "../components/getStarted";
import NavBar from "../components/navBar";
import Search from "../components/search";

function LandingPage() {
  return (
    <div>
      <NavBar />
      <Search />
      <GetStarted />
      <Features />
    </div>
  );
}

export default LandingPage;
