import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginScenario: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://facelad-admin-backend-auth.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        alert("Login exitoso");
        navigate("/dashboard");
      } else if (response.status === 401) {
        alert("Credenciales inválidas");
      } else {
        alert("Error en el login");
      }
    } catch {
      alert("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
        <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 mb-4 border rounded" required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 mb-4 border rounded" required />
        <button type="submit" disabled={loading} className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
          {loading ? "Ingresando..." : "Ingresar"}
        </button>

        {/* Botón para ir al registro */}
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="w-full mt-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          ¿No tienes cuenta? Regístrate aquí
        </button>
      </form>
    </div>
  );
};

export default LoginScenario;
