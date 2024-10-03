import { Route, Routes } from "react-router-dom";
import { Login, Signup, VerifyOtp } from "./pages";
import Home from "./pages/Home/Home";
import AdminHome from "./pages/Admin/AdminHome";
import AdminLogin from "./pages/Admin/AdminLogin";
import TutorialScreen from "./pages/TutorialScreen/TutorialScreen";
import HealthInfo from "./pages/HealthInfo/HealthInfo";
import Profile from "./pages/Profile/Profile";
import Post from "./pages/Post/Post";
import DonationPage  from "./pages/DonationPage/DonationPage";
import BloodBankPage from "./pages/BloodBankPage/BloodBankPage";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TutorialScreen />} />  {/* Updated Home route to start with TutorialScreen */}
        <Route path="/home" element={<Home />} />  {/* Added a separate route for the main Home page */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp-verify" element={<VerifyOtp />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/hi" element={<HealthInfo />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post" element={<Post />} />
        <Route path="/donations" element={<DonationPage />} />
      <Route path="/blood-banks" element={<BloodBankPage />} />

      </Routes>
    </div>
  );
}

export default App;
