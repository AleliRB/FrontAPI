export interface ProveedorCreacion {
  razonSocial: string;
  direccion: string;
  telefono: number;
  email: string;
  estado: string;
  productos?: number[]; // <-- necesita array de IDs
}

export interface Proveedor {
  id: number;
  razonSocial: string;
  direccion: string;
  telefono: number;
  email: string;
  estado: string;
  productos?: number[]; // <-- necesita array de IDs
  nombresProductos?: string[]; // <-- NUEVO
}