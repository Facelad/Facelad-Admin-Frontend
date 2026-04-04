import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { mockClientes, mockServicios, mockCobros } from "../data/mockData";
import {
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#54EBA3", "#3B82F6", "#F59E0B", "#EF4444"];

export function Dashboard() {
  const clientesActivos = mockClientes.filter((c) => c.estado === "activo").length;
  const serviciosActivos = mockServicios.filter((s) => s.estado === "activo").length;
  const ingresosMensuales = mockServicios
    .filter((s) => s.estado === "activo")
    .reduce((sum, s) => sum + s.precioMensual, 0);
  const cobrosPendientes = mockCobros.filter(
    (c) => c.estado === "pendiente" || c.estado === "vencido"
  ).length;

  const serviciosPorTipo = [
    { id: "hosting", name: "Hosting", value: mockServicios.filter((s) => s.tipoServicio === "hosting_dominios").length },
    { id: "marketing", name: "Marketing", value: mockServicios.filter((s) => s.tipoServicio === "marketing_rrss").length },
    { id: "desarrollo", name: "Desarrollo", value: mockServicios.filter((s) => s.tipoServicio === "desarrollo_software").length },
    { id: "soporte", name: "Soporte TI", value: mockServicios.filter((s) => s.tipoServicio === "soporte_ti").length },
  ].filter(item => item.value > 0);

  const ingresosPorMes = [
    { mes: "Ene", ingresos: 750000 },
    { mes: "Feb", ingresos: 800000 },
    { mes: "Mar", ingresos: 900000 },
    { mes: "Abr", ingresos: 850000 },
    { mes: "May", ingresos: 950000 },
    { mes: "Jun", ingresos: 1000000 },
  ];

  const cobrosRecientes = mockCobros.slice(0, 5);

  return (
    <div className="p-8">
      <h1 className="mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Bienvenido al panel de administración de servicios digitales
      </p>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle className="text-sm">Clientes Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientesActivos}</div>
            <p className="text-xs text-muted-foreground">Total de {mockClientes.length} clientes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle className="text-sm">Servicios Activos</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serviciosActivos}</div>
            <p className="text-xs text-muted-foreground">De {mockServicios.length} servicios totales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle className="text-sm">Ingresos Mensuales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${ingresosMensuales.toLocaleString("es-CL")}</div>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +12% vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle className="text-sm">Cobros Pendientes</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cobrosPendientes}</div>
            <p className="text-xs text-orange-600">Requieren atención</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader><CardTitle>Ingresos Mensuales</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ingresosPorMes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => {
                    if (Array.isArray(value)) {
                      return [value.join(", "), name];
                    }
                    if (typeof value === "number") {
                      return [`$${value.toLocaleString("es-CL")}`, name];
                    }
                    return [value ?? "", name];
                  }}
                />
                <Line type="monotone" dataKey="ingresos" stroke="#54EBA3" strokeWidth={2} dot={true} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Servicios por Tipo</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviciosPorTipo}
                  cx="50%" cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name ?? ""} ${(percent ? percent * 100 : 0).toFixed(0)}%`
                  }
                  outerRadius={80}
                  dataKey="value"
                  nameKey="id"
                >
                  {serviciosPorTipo.map((entry, index) => (
                    <Cell key={entry.id} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Cobros recientes */}
      <Card>
        <CardHeader><CardTitle>Actividad Reciente de Cobros</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cobrosRecientes.map((cobro) => (
              <div key={cobro.id} className="flex justify-between border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{cobro.clienteNombre}</p>
                  <p className="text-sm text-gray-500">{cobro.tipoServicio}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${cobro.monto.toLocaleString("es-CL")}</p>
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    cobro.estado === "pagado"
                      ? "bg-green-100 text-green-800"
                      : cobro.estado === "pendiente"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {cobro.estado.charAt(0).toUpperCase() + cobro.estado.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
