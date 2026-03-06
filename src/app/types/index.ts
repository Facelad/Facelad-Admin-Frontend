export interface Cliente {
  id: string;
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  direccion: string;
  fechaRegistro: string;
  estado: "activo" | "inactivo";
}

export interface Servicio {
  id: string;
  clienteId: string;
  clienteNombre: string;
  tipoServicio:
    | "hosting_dominios"
    | "marketing_rrss"
    | "desarrollo_software"
    | "soporte_ti";
  descripcion: string;
  precioMensual: number;
  fechaInicio: string;
  fechaVencimiento: string;
  estado: "activo" | "pendiente" | "suspendido" | "cancelado";
}

export interface PlantillaCobranza {
  id: string;
  nombre: string;
  tipoServicio: string;
  frecuencia: "mensual" | "trimestral" | "anual";
  monto: number;
  diasAnticipacion: number;
  mensaje: string;
  activo: boolean;
}

export interface Cobro {
  id: string;
  servicioId: string;
  clienteNombre: string;
  tipoServicio: string;
  monto: number;
  fechaEmision: string;
  fechaVencimiento: string;
  estado: "pendiente" | "pagado" | "vencido" | "cancelado";
  metodoPago?: string;
  referencia?: string;
}

export const TIPOS_SERVICIO = [
  { value: "hosting_dominios", label: "Hosting y Dominios" },
  { value: "marketing_rrss", label: "Marketing y RRSS" },
  { value: "desarrollo_software", label: "Desarrollo de Software" },
  { value: "soporte_ti", label: "Soporte TI y Consultoría" },
];

export const ESTADOS_SERVICIO = [
  { value: "activo", label: "Activo" },
  { value: "pendiente", label: "Pendiente" },
  { value: "suspendido", label: "Suspendido" },
  { value: "cancelado", label: "Cancelado" },
];

export const FRECUENCIAS = [
  { value: "mensual", label: "Mensual" },
  { value: "trimestral", label: "Trimestral" },
  { value: "anual", label: "Anual" },
];
