import React from "react";

interface Cliente {
  id: number;
  rutEmpresa: string;
  rutCliente: string;
  nombre: string;
  correo: string;
  telefono: string;
  estado: "activo" | "desactivado";
}

interface Props {
  clientes: Cliente[];
  onEdit: (cliente: Cliente) => void;
  onDelete: (cliente: Cliente) => void;
}

const ClientesTable: React.FC<Props> = ({ clientes, onEdit, onDelete }) => {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-gray-200">
          <th>Empresa</th>
          <th>Cliente</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Teléfono</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((c) => (
          <tr key={c.id} className="border-b">
            <td>{c.rutEmpresa}</td>
            <td>{c.rutCliente}</td>
            <td>{c.nombre}</td>
            <td>{c.correo}</td>
            <td>{c.telefono}</td>
            <td>{c.estado}</td>
            <td>
              <button onClick={() => onEdit(c)} className="text-blue-600 mr-2">Editar</button>
              <button onClick={() => onDelete(c)} className="text-red-600">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientesTable;
