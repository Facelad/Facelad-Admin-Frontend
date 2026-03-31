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
