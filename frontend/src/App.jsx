import Navbar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import AboutPage from "./pages/About/About.js";
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/Register/Register";
import PortalPage from "./pages/Portal/Portal"
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/portal" element={<PortalPage />} />
      </Routes>

      <div id="contact">
        <Footer />
      </div>
    </div>
  );
}

export default App;
