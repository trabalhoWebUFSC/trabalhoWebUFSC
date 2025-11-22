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
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  useEffect(() => {
    loadTokenFromStorage();
  }, []);

  return (
    <div className="App">
      <Navbar />

      <main>
        <Routes>
          {/* Rotas Públicas (Qualquer um acessa) */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage mode="register" />} />
          
          {/* Rotas Privadas (Requer Login) */}
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <RegisterPage mode="view" />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/profile/edit" 
            element={
              <PrivateRoute>
                <RegisterPage mode="edit" />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/portal" 
            element={
              <PrivateRoute>
                <PortalPage />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/profile/my-reservations" 
            element={
              <PrivateRoute>
                <MyReservations />
              </PrivateRoute>
            } 
          />
        </Routes>
      </main>

      <div id="contact">
        <Footer />
      </div>
    </div>
  );
}

export default App;
