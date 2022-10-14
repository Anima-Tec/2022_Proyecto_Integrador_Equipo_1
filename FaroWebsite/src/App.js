import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import "./App.css";
import AdminLogIn from "./admin/adminLogIn";
import DatabaseFiller from "./pages/DatabaseFiller";
import AboutPage from "./pages/AboutPage";
import SupportPage from "./pages/SupportPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AdminLogIn />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/support" element={<SupportPage />} />

      <Route path="/database-fillerr" element={<DatabaseFiller />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/database-filler" element={<DatabaseFiller />} />
      </Route>
    </Routes>
  );
}

export default App;
