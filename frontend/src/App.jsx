import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/Login/LoginPage";
import SignupPage from "./pages/auth/Signup/SignupPage";
import HomePage from "./pages/Home/HomePage";
import NotificationPage from "./pages/notification/NotificationPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import Sidebar from "./components/common/Sidebar.jsx";
import RightPanel from "./components/common/RightPanel.jsx";

function App() {
  return (
    <div className="flex max-w-6xl mx-auto">
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Routes>
      <RightPanel />
    </div>
  );
}

export default App;
