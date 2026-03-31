import React, { useState } from "react";

interface Cliente {
  rutEmpresa: string;
  rutCliente: string;
  nombre: string;
  correo: string;
  telefono: string;
}

interface Props {
  onSave: (cliente: Cliente) => void;
}

const ClienteForm: React.FC<Props> = ({ onSave }) => {
  const [form, setForm] = useState<Cliente>({
    rutEmpresa: "",
    rutCliente: "",
    nombre: "",
    correo: "",
    telefono: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validaciones simples
    if (!form.correo.includes("@")) {
      alert("Correo inválido");
      return;
    }
    onSave(form);
    setForm({ rutEmpresa: "", rutCliente: "", nombre: "", correo: "", telefono: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <input name="rutEmpresa" value={form.rutEmpresa} onChange={handleChange} placeholder="RUT Empresa" className="border p-2 w-full" />
      <input name="rutCliente" value={form.rutCliente} onChange={handleChange} placeholder="RUT Cliente" className="border p-2 w-full" />
      <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" className="border p-2 w-full" />
      <input name="correo" value={form.correo} onChange={handleChange} placeholder="Correo" className="border p-2 w-full" />
      <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" className="border p-2 w-full" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Guardar</button>
    </form>
  );
};

export default ClienteForm;
