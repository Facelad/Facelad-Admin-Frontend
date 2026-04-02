import React, { useState } from "react";
import { mockClientes } from "../data/mockData";

export function ClientesTable() {
  const [search, setSearch] = useState("");

  const filteredClientes = mockClientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(search.toLowerCase()) ||
    cliente.rut.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Listado de Clientes</h2>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por nombre o RUT"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-3 py-2 mb-4 w-full"
      />

      {/* Tabla */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Empresa</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">RUT</th>
            <th className="border px-4 py-2">Correo</th>
            <th className="border px-4 py-2">Teléfono</th>
            <th className="border px-4 py-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {filteredClientes.map((cliente) => (
            <tr key={cliente.id}>
              <td className="border px-4 py-2">{cliente.empresa}</td>
              <td className="border px-4 py-2">{cliente.nombre}</td>
              <td className="border px-4 py-2">{cliente.rut}</td>
              <td className="border px-4 py-2">{cliente.correo}</td>
              <td className="border px-4 py-2">{cliente.telefono}</td>
              <td className="border px-4 py-2">
                {cliente.estado === "activo" ? "Activo" : "Desactivado"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
