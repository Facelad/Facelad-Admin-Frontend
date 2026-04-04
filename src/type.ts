export interface Cliente {
  id: string;
  rutEmpresa: string;
  rutCliente: string;
  nombre: string;
  empresa: string;
  correo: string;
  telefono: string;
  direccion: string;
  fechaRegistro: string;
  estado: "activo" | "inactivo" | "desactivado";
}

export interface Servicio {
  id: string;
  clienteId: string;
  clienteNombre: string;
  tipoServicio: string;
  descripcion: string;
  precioMensual: number;
  fechaInicio: string;
  fechaVencimiento: string;
  estado: "activo" | "inactivo" | "suspendido";
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
  estado: "pendiente" | "pagado" | "vencido";
  metodoPago?: string;
  referencia?: string;
}
