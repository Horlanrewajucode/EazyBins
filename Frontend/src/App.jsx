import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import LoginPage from "./pages/Login";
import OtpPage from "./pages/otpPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/homePage";
import ProtectedRoute from "./routes/protectedRoutes";
import PublicRoute from "./routes/publicRoutes";
import SchedulePage from "./pages/schedulePage";

function App() {
  // const Navigate = useNavigate();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/schedulePage" element={<SchedulePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp-page" element={<OtpPage />} />
        <Route path="/homePage" element={<HomePage />} />

        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
