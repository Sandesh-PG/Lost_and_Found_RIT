import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Navbar from "./layout/Navbar.jsx";
import PrivateRoute from "./components/privateRoutes.jsx";
import OAuthCallback from "./pages/OAuthCallback.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/oauth-callback" element={<OAuthCallback />} />
      </Routes>
    </>
  );
}

export default App;
