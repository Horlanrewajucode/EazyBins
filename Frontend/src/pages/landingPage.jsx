import { Outlet } from "react-router-dom";
import Features from "../components/features";
import Footer from "../components/footer";
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
      <Footer />
    </div>
  );
}

export default LandingPage;
