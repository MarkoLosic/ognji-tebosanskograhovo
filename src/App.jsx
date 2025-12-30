import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ContentProvider } from "./context/ContentContext.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Planine from "./pages/Planine.jsx";
import Sela from "./pages/Sela.jsx";
import Gallery from "./pages/Gallery.jsx";
import Admin from "./pages/Admin.jsx";
import Login from "./pages/Login.jsx";

export default function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/planine" element={<Planine />} />
            <Route path="/sela" element={<Sela />} />
            <Route path="/galerija" element={<Gallery />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ContentProvider>
    </AuthProvider>
  );
}
