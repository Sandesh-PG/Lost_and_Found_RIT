import { Routes, Route } from 'react-router-dom'; // Note: BrowserRouter is removed
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import OAuthCallback from './pages/OAuthCallback';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PrivateRoute from './components/privateRoutes'; 

<<<<<<< HEAD
export default function App() {
  return (
    // The <BrowserRouter> has been removed from this file.
    // It should be in your main.jsx file.
    <Routes>
      {/* --- Public Routes --- */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/oauth-callback" element={<OAuthCallback />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* --- Private Routes --- */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
=======
function App() {
  return <h1 className="text-3xl">Yashwath how </h1>;
>>>>>>> origin
}
