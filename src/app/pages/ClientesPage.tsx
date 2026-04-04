import React, { useState, useEffect } from "react";
import ClienteForm from "./ClienteForm";
import ClientesTable from "./ClientesTable";

interface Cliente {
  id: number;
  rutEmpresa: string;
  rutCliente: string;
  nombre: string;
  correo: string;
  telefono: string;
  estado: "activo" | "desactivado";
}

const ClientesPage: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    // Cargar clientes desde backend
    fetch("https://facelad-admin-backend-core.onrender.com/clientes")
      .then((res) => res.json())
      .then((data) => setClientes(data));
  }, []);

  const handleSave = async (cliente: Omit<Cliente, "id" | "estado">) => {
    const response = await fetch("https://facelad-admin-backend-core.onrender.com/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    });
    if (response.ok) {
      const nuevo = await response.json();
      setClientes([...clientes, nuevo]);
    }
  };

  const handleEdit = async (cliente: Cliente) => {
    const response = await fetch(`https://facelad-admin-backend-core.onrender.com/clientes/${cliente.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    });
    if (response.ok) {
      setClientes(clientes.map((c) => (c.id === cliente.id ? cliente : c)));
    }
  };

  const handleDelete = async (cliente: Cliente) => {
    const response = await fetch(`https://facelad-admin-backend-core.onrender.com/clientes/${cliente.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setClientes(clientes.map((c) => (c.id === cliente.id ? { ...c, estado: "desactivado" } : c)));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Clientes</h1>
      <ClienteForm onSave={handleSave} />
      <div className="mt-6">
        <ClientesTable clientes={clientes} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default ClientesPage;
