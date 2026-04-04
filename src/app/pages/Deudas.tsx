import React, { useState } from "react";
import { mockCobros } from "../data/mockCobros"; // asegúrate de tener este archivo

export function Deudas() {
  const [estadoFiltro, setEstadoFiltro] = useState<string>("");
  const [clienteFiltro, setClienteFiltro] = useState<string>("");

  // Filtrado dinámico: Estado + Cliente
  const filteredDeudas = mockCobros.filter((cobro) => {
    const matchEstado = estadoFiltro
      ? cobro.estado.toLowerCase() === estadoFiltro.toLowerCase()
      : true;
    const matchCliente = clienteFiltro
      ? cobro.clienteNombre.toLowerCase().includes(clienteFiltro.toLowerCase())
      : true;
    return matchEstado && matchCliente;
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Listado de Deudas</h2>

      {/* Filtros dinámicos */}
      <div className="flex gap-4 mb-4">
        <select
          value={estadoFiltro}
          onChange={(e) => setEstadoFiltro(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Todos</option>
          <option value="vencido">Vencido</option>
          <option value="pendiente">Pendiente</option>
          <option value="pagado">Pagado</option>
        </select>

        <input
          type="text"
          placeholder="Buscar por cliente"
          value={clienteFiltro}
          onChange={(e) => setClienteFiltro(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      {/* Tabla de deudas */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Cliente</th>
            <th className="border px-4 py-2">Servicio</th>
            <th className="border px-4 py-2">Monto</th>
            <th className="border px-4 py-2">Estado</th>
            <th className="border px-4 py-2">Fecha de Pago</th>
          </tr>
        </thead>
        <tbody>
          {filteredDeudas.map((cobro) => (
            <tr key={cobro.id}>
              <td className="border px-4 py-2">{cobro.clienteNombre}</td>
              <td className="border px-4 py-2">{cobro.tipoServicio}</td>
              <td className="border px-4 py-2">
                ${cobro.monto.toLocaleString("es-CL")}
              </td>
              <td className="border px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    cobro.estado === "pagado"
                      ? "bg-green-100 text-green-800"
                      : cobro.estado === "pendiente"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {cobro.estado.charAt(0).toUpperCase() + cobro.estado.slice(1)}
                </span>
              </td>
              <td className="border px-4 py-2">{cobro.fechaPago}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
