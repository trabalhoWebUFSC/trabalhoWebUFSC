import { useEffect } from "react";
import { loadTokenFromStorage } from "./services/api";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import AboutPage from "./pages/About/About";
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/Register/Register";
import PortalPage from "./pages/Portal/Portal";
import Footer from "./components/Footer/Footer";
import MyReservations from "./pages/MyReservations/MyReservations";

function App() {
  useEffect(() => {
    loadTokenFromStorage();
  }, []);

  return (
    <div className="App">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/register" element={<RegisterPage mode="register" />} />
          
          <Route path="/profile" element={<RegisterPage mode="view" />} />
          <Route path="/profile/edit" element={<RegisterPage mode="edit" />} />
          
          <Route path="/portal" element={<PortalPage />} />
          <Route path="/profile/my-reservations" element={<MyReservations />} />
        </Routes>
      </main>

      <div id="contact">
        <Footer />
      </div>
    </div>
  );
}

export default App;
