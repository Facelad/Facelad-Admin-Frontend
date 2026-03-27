import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type IngresoData = {
  mes: string;
  ingresos: number;
};

type UsuarioData = {
  name: string;
  value: number;
};

const ingresosData: IngresoData[] = [
  { mes: "Enero", ingresos: 4000 },
  { mes: "Febrero", ingresos: 3000 },
  { mes: "Marzo", ingresos: 5000 },
  { mes: "Abril", ingresos: 2000 },
];

const usuariosData: UsuarioData[] = [
  { name: "Activos", value: 320 },
  { name: "Inactivos", value: 120 },
];

const COLORS = ["#0088FE", "#FF8042"];

const Reportes: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 Reportes</h1>

      {/* Gráfico de barras */}
      <div className="bg-white p-6 rounded shadow h-96">
        <h2 className="text-xl font-semibold mb-4">Ingresos Mensuales</h2>
        <ResponsiveContainer>
          <BarChart data={ingresosData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip
              formatter={(value: unknown) => {
                if (typeof value === "number") {
                  return `$${value}`;
                }
                return "";
              }}
            />
            <Bar dataKey="ingresos" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico circular */}
      <div className="bg-white p-6 rounded shadow h-96">
        <h2 className="text-xl font-semibold mb-4">Usuarios</h2>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={usuariosData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ percent }) =>
                percent !== undefined ? `${(percent * 100).toFixed(0)}%` : ""
              }
            >
              {usuariosData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: unknown) => {
                if (typeof value === "number") {
                  return `${value}`;
                }
                return "";
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reportes;
