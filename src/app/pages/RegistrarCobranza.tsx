import React, { useState } from "react";
import { mockClientes } from "../data/mockClientes";

export function RegistrarCobranza() {
  const [clienteSeleccionado, setClienteSeleccionado] = useState<string>("");
  const [monto, setMonto] = useState<string>("");
  const [fecha, setFecha] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clienteSeleccionado || !monto || !fecha) return;
    alert(`Cobranza registrada para ${clienteSeleccionado}`);
  };

  const isFormValid = clienteSeleccionado && monto && fecha;

  return (
    <form onSubmit={handleSubmit} className="p-6 border rounded space-y-4">
      <h2 className="text-xl font-bold">Registrar Cobranza</h2>

      {/* Selector de cliente */}
      <select
        value={clienteSeleccionado}
        onChange={(e) => setClienteSeleccionado(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      >
        <option value="">Seleccione un cliente</option>
        {mockClientes.map((cliente) => (
          <option key={cliente.id} value={cliente.nombre}>
            {cliente.nombre} - {cliente.rutEmpresa || cliente.rutCliente}
          </option>
        ))}
      </select>

      {/* Monto */}
      <input
        type="number"
        placeholder="Monto"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />

      {/* Fecha */}
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />

      {/* Botón Guardar */}
      <button
        type="submit"
        disabled={!isFormValid}
        className={`px-4 py-2 rounded text-white ${
          isFormValid ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Guardar
      </button>
    </form>
  );
}
