import React from "react";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/Register/Register";
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import RoomChoice from "./components/RoomChoice/RoomChoice";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
