import React, { useState } from "react";
import { mockClientes } from "../data/mockData";

interface Cliente {
  id: string;
  nombre: string;
  rut: string;
  correo: string;
  telefono: string;
  empresa: string;
  estado: string;
}

export function ClienteForm({ cliente }: { cliente: Cliente }) {
  const [formData, setFormData] = useState(cliente);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!window.confirm("¿Confirmar cambios en el cliente?")) return;

    // Aquí iría la llamada al backend con formData
    console.log("Cliente actualizado:", formData);
    alert("Datos actualizados correctamente");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded">
      <h2 className="text-xl font-bold">Editar Cliente</h2>

      <input
        type="text"
        name="correo"
        value={formData.correo}
        onChange={handleChange}
        placeholder="Correo electrónico"
        className="border rounded px-3 py-2 w-full"
      />

      <input
        type="text"
        name="telefono"
        value={formData.telefono}
        onChange={handleChange}
        placeholder="Teléfono"
        className="border rounded px-3 py-2 w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Guardar Cambios
      </button>
    </form>
  );
}
