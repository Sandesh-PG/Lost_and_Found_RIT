import { Routes, Route } from "react-router-dom"; // Note: BrowserRouter is removed
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import OAuthCallback from "./pages/OAuthCallback";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PrivateRoute from "./components/privateRoutes";
import LostPage from "./components/lost/LostPage";
import Navbar from "./layout/Navbar";
import ReportLost from "./components/lost/ReportLost";
import Profile from "./components/profile/Profile";
import { Toaster } from "react-hot-toast";
import ReportFound from "./pages/ReportFound";
import FoundItemsPage from "./pages/FoundItems";
import LostItemsPage from "./pages/LostItemsPage";
import FoundItemDetailPage from "./pages/FoundItemDetails";

export default function App() {
  return (
    // The <BrowserRouter> has been removed from this file.
    // It should be in your main.jsx file.
    <>
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/oauth-callback" element={<OAuthCallback />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/lost" element={<LostItemsPage />} />
        <Route path="/report-lost" element={<ReportLost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/report-found" element={<ReportFound />} />
        <Route path="/found" element={<FoundItemsPage />} />
        <Route path="/found/:id" element={<FoundItemDetailPage />} />{" "}
        {/* <-- ADD THIS LINE */}
        {/* --- Private Routes --- */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}
