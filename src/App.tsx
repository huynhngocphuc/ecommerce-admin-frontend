import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar"; // Import the Navbar component
import Sidebar from "./components/Sidebar"; // Import the Sidebar component
import Footer from "./components/Footer"; // Import the Footer component
import './assets/styles/main.scss'; // Import the main SCSS file

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const isAuthenticated = (): boolean => {
  // Implement your authentication logic here
  return false; // Change this to your actual authentication check
};

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/dashboard"
            element={
              isAuthenticated() ? <DashboardPage /> : <Navigate to="/" />
            }
          />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer />
    </Router>
  );
};

export default App;
