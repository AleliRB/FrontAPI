export interface SalidaCreacion {
  destinoSalida: string;
  fechaSalida: Date;
  fechaDevolucion?: Date;
  responsableDevol: string;
  generadorSalida: string;
  idEmp: number;
}

export interface Salida {
  idSalida: number;
  destinoSalida: string;
  fechaSalida: Date;
  fechaDevolucion?: Date;
  responsableDevol: string;
  generadorSalida: string;
  idEmp: number;
  empleadoNombre: string;
  detalles?: DetalleSalidaInfo[];
}

export interface DetalleSalidaInfo {
  idProducto: number;
  productoNombre: string;
  codProducto: string;
  stockSalida: number;
}