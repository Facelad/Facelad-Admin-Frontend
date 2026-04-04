import React from "react";

interface Props {
  estadoFiltro: string;
  setEstadoFiltro: (value: string) => void;
  clienteFiltro: string;
  setClienteFiltro: (value: string) => void;
}

export function FiltroDeudas({
  estadoFiltro,
  setEstadoFiltro,
  clienteFiltro,
  setClienteFiltro,
}: Props) {
  return (
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
  );
}
