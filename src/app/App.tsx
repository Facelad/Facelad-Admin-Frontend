import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginScenario from "./pages/LoginScenario";
import RegisterScenario from "./pages/RegisterScenario";
import DashboardScenario from "./pages/DashboardScenario";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScenario />} />
        <Route path="/register" element={<RegisterScenario />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardScenario />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
