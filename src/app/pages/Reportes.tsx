import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { mockClientes, mockServicios, mockCobros } from "../data/mockData";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, DollarSign, Users, ShoppingBag } from "lucide-react";

const COLORS = ["#54EBA3", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"];

export function Reportes() {
  // Datos para reportes
  const clientesActivos = mockClientes.filter((c) => c.estado === "activo").length;
  const serviciosActivos = mockServicios.filter((s) => s.estado === "activo").length;
  const ingresosMensuales = mockServicios
    .filter((s) => s.estado === "activo")
    .reduce((sum, s) => sum + s.precioMensual, 0);

  // Ingresos por mes (últimos 6 meses)
  const ingresosPorMes = [
    { id: "oct-2023", mes: "Octubre", ingresos: 650000, cobros: 8 },
    { id: "nov-2023", mes: "Noviembre", ingresos: 720000, cobros: 9 },
    { id: "dic-2023", mes: "Diciembre", ingresos: 800000, cobros: 10 },
    { id: "ene-2024", mes: "Enero", ingresos: 850000, cobros: 11 },
    { id: "feb-2024", mes: "Febrero", ingresos: 920000, cobros: 12 },
    { id: "mar-2024", mes: "Marzo", ingresos: 1000000, cobros: 13 },
  ];

  // Servicios por tipo
  const serviciosPorTipo = [
    {
      id: "hosting",
      name: "Hosting y Dominios",
      cantidad: mockServicios.filter((s) => s.tipoServicio === "hosting_dominios")
        .length,
      ingresos: mockServicios
        .filter((s) => s.tipoServicio === "hosting_dominios")
        .reduce((sum, s) => sum + s.precioMensual, 0),
    },
    {
      id: "marketing",
      name: "Marketing y RRSS",
      cantidad: mockServicios.filter((s) => s.tipoServicio === "marketing_rrss")
        .length,
      ingresos: mockServicios
        .filter((s) => s.tipoServicio === "marketing_rrss")
        .reduce((sum, s) => sum + s.precioMensual, 0),
    },
    {
      id: "desarrollo",
      name: "Desarrollo Software",
      cantidad: mockServicios.filter((s) => s.tipoServicio === "desarrollo_software")
        .length,
      ingresos: mockServicios
        .filter((s) => s.tipoServicio === "desarrollo_software")
        .reduce((sum, s) => sum + s.precioMensual, 0),
    },
    {
      id: "soporte",
      name: "Soporte TI",
      cantidad: mockServicios.filter((s) => s.tipoServicio === "soporte_ti").length,
      ingresos: mockServicios
        .filter((s) => s.tipoServicio === "soporte_ti")
        .reduce((sum, s) => sum + s.precioMensual, 0),
    },
  ].filter(item => item.cantidad > 0);

  // Estados de cobros
  const estadosCobros = [
    {
      id: "pagados",
      name: "Pagados",
      value: mockCobros.filter((c) => c.estado === "pagado").length,
    },
    {
      id: "pendientes",
      name: "Pendientes",
      value: mockCobros.filter((c) => c.estado === "pendiente").length,
    },
    {
      id: "vencidos",
      name: "Vencidos",
      value: mockCobros.filter((c) => c.estado === "vencido").length,
    },
  ].filter(item => item.value > 0);

  // Top clientes por ingresos
  const topClientes = mockClientes
    .map((cliente) => {
      const serviciosCliente = mockServicios.filter(
        (s) => s.clienteId === cliente.id && s.estado === "activo"
      );
      const totalIngresos = serviciosCliente.reduce(
        (sum, s) => sum + s.precioMensual,
        0
      );
      return {
        nombre: cliente.empresa,
        ingresos: totalIngresos,
        servicios: serviciosCliente.length,
      };
    })
    .sort((a, b) => b.ingresos - a.ingresos)
    .slice(0, 5);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1>Reportería y Analíticas</h1>
        <p className="text-gray-600 mt-2">
          Visualiza el rendimiento de tu negocio de servicios digitales
        </p>
      </div>

      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Ingresos Mensuales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${ingresosMensuales.toLocaleString("es-CL")}
            </div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +18% vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Clientes Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientesActivos}</div>
            <p className="text-xs text-gray-600 mt-1">
              De {mockClientes.length} totales
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Servicios Activos</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serviciosActivos}</div>
            <p className="text-xs text-gray-600 mt-1">En operación</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Tasa de Pago</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((mockCobros.filter((c) => c.estado === "pagado").length /
                mockCobros.length) *
                100).toFixed(1)}
              %
            </div>
            <p className="text-xs text-gray-600 mt-1">De cobros emitidos</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos principales */}
      <Tabs defaultValue="ingresos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ingresos">Ingresos</TabsTrigger>
          <TabsTrigger value="servicios">Servicios</TabsTrigger>
          <TabsTrigger value="cobros">Cobros</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
        </TabsList>

        <TabsContent value="ingresos" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Evolución de Ingresos (6 meses)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={ingresosPorMes} id="reportes-line-ingresos">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) =>
                        `$${value.toLocaleString("es-CL")}`
                      }
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="ingresos"
                      name="Ingresos"
                      stroke="#54EBA3"
                      strokeWidth={3}
                      dot={{ key: (entry: any, index: number) => `dot-ing-${entry.id}` }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ingresos por Tipo de Servicio</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={serviciosPorTipo} id="reportes-bar-ingresos-tipo">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) =>
                        `$${value.toLocaleString("es-CL")}`
                      }
                    />
                    <Bar dataKey="ingresos" fill="#54EBA3">
                      {serviciosPorTipo.map((entry) => (
                        <Cell key={`bar-${entry.id}`} fill="#54EBA3" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="servicios" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Servicios</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart id="reportes-pie-servicios">
                    <Pie
                      data={serviciosPorTipo}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="cantidad"
                      nameKey="id"
                    >
                      {serviciosPorTipo.map((entry, index) => (
                        <Cell
                          key={entry.id}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Servicios por Tipo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviciosPorTipo.map((tipo, index) => (
                    <div key={tipo.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{tipo.name}</span>
                        <span className="text-sm text-gray-600">
                          {tipo.cantidad} servicios
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${(tipo.cantidad / mockServicios.length) * 100}%`,
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Ingresos: ${tipo.ingresos.toLocaleString("es-CL")}/mes
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cobros" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Estado de Cobros</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart id="reportes-pie-cobros">
                    <Pie
                      data={estadosCobros}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="id"
                    >
                      {estadosCobros.map((entry) => (
                        <Cell
                          key={entry.id}
                          fill={
                            entry.name === "Pagados"
                              ? "#54EBA3"
                              : entry.name === "Pendientes"
                              ? "#F59E0B"
                              : "#EF4444"
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Número de Cobros por Mes</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={ingresosPorMes} id="reportes-bar-cobros-mes">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cobros" name="Cobros emitidos" fill="#54EBA3">
                      {ingresosPorMes.map((entry) => (
                        <Cell key={`bar-cobro-${entry.id}`} fill="#54EBA3" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clientes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Clientes por Ingresos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topClientes.map((cliente, index) => (
                  <div key={cliente.nombre}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{cliente.nombre}</p>
                          <p className="text-sm text-gray-500">
                            {cliente.servicios} servicio(s)
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">
                          ${cliente.ingresos.toLocaleString("es-CL")}
                        </p>
                        <p className="text-sm text-gray-500">mensuales</p>
                      </div>
                    </div>
                    {index < topClientes.length - 1 && (
                      <div className="border-b border-gray-100 mt-4" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
