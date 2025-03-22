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
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

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
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<MainLayout />}>
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
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<div>Login page</div>} />
            <Route path="/register" element={<div>Register page</div>} />
          </Route>
        </Routes>
      </Suspense>
      
    </Router>
  );
};

export default App;
