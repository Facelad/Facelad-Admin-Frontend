import React, { useEffect, useState } from "react";

const DashboardScenario: React.FC = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://facelad-admin-backend-core.onrender.com/example/ping", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message || "Sin respuesta"))
      .catch(() => setMessage("Error al conectar con el backend"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg text-gray-700">Respuesta del backend: {message}</p>
    </div>
  );
};

export default DashboardScenario;
