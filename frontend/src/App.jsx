import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import CreateUser from "./components/CreateUser";
import InvoicePage from "./pages/InvoicePage";
import UserPage from "./pages/UserPage";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./pages/DashBoard";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* DEFAULT PAGE → LOGIN */}
          <Route path="/" element={<Login />} />

          {/* SIGNUP PAGE */}
          <Route path="/signup" element={<CreateUser />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/invoices" element={<InvoicePage />} />
          <Route path="/users" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
