import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterScenario: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://facelad-admin-backend-auth.onrender.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          role: "admin"
        }),
      });

      if (response.status === 201) {
        alert("Usuario registrado con éxito. Ahora inicia sesión.");
        navigate("/login");
      } else if (response.status === 400) {
        alert("Error en los datos enviados.");
      } else if (response.status === 422) {
        alert("Datos inválidos. Verifica nombre, correo y contraseña.");
      } else if (response.status === 500) {
        alert("Error interno del servidor. Avísale al equipo backend.");
      }
    } catch {
      alert("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-emerald-600">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Registro de Usuario</h2>
        <input type="text" placeholder="Nombre" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full p-3 mb-4 border rounded" required />
        <input type="text" placeholder="Apellido" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-3 mb-4 border rounded" required />
        <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 mb-4 border rounded" required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 mb-4 border rounded" required />
        <button type="submit" disabled={loading} className="w-full py-2 rounded bg-green-600 text-white hover:bg-green-700">
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
};

export default RegisterScenario;
