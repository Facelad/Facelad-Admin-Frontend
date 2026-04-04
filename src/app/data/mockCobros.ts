export interface Cobro {
  id: string;
  clienteNombre: string;
  tipoServicio: string;
  monto: number;
  estado: "pendiente" | "vencido" | "pagado";
  fechaPago: string;
}

export const mockCobros: Cobro[] = [
  {
    id: "c1",
    clienteNombre: "Empresa Alfa",
    tipoServicio: "Hosting",
    monto: 120000,
    estado: "vencido",
    fechaPago: "2026-03-15",
  },
  {
    id: "c2",
    clienteNombre: "Cliente Beta",
    tipoServicio: "Marketing RRSS",
    monto: 250000,
    estado: "pendiente",
    fechaPago: "2026-04-10",
  },
  {
    id: "c3",
    clienteNombre: "Startup Gamma",
    tipoServicio: "Desarrollo Software",
    monto: 500000,
    estado: "pagado",
    fechaPago: "2026-03-20",
  },
  {
    id: "c4",
    clienteNombre: "Consultora Delta",
    tipoServicio: "Soporte TI",
    monto: 180000,
    estado: "vencido",
    fechaPago: "2026-03-25",
  },
  {
    id: "c5",
    clienteNombre: "Cliente Épsilon",
    tipoServicio: "Hosting",
    monto: 95000,
    estado: "pendiente",
    fechaPago: "2026-04-05",
  },
];
