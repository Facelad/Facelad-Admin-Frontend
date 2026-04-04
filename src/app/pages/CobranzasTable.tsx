import React, { useState } from "react";

interface Cobranza {
  id: string;
  cliente: string;
  monto: number;
  fecha: string;
  estado: "pendiente" | "pagado";
}

export function CobranzasTable() {
  const [cobranzas, setCobranzas] = useState<Cobranza[]>([]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Cobranzas Registradas</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Cliente</th>
            <th className="border px-4 py-2">Monto</th>
            <th className="border px-4 py-2">Fecha</th>
            <th className="border px-4 py-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {cobranzas.map((c) => (
            <tr key={c.id}>
              <td className="border px-4 py-2">{c.cliente}</td>
              <td className="border px-4 py-2">${c.monto.toLocaleString("es-CL")}</td>
              <td className="border px-4 py-2">{c.fecha}</td>
              <td className="border px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    c.estado === "pagado"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {c.estado}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
