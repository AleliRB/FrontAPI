export interface ProductoCreacion {
  nombre: string;
  ubicacion: string;
  descripcion: string;
  stockTotal: number;
  stockActual: number;
  idCategoria: number;
  idProveedor: number;
}

export interface Producto {
  idProd: number;
  nombre: string;
  ubicacion: string;
  descripcion: string;
  stockTotal: number;
  stockActual: number;
  idCategoria: number;
  categoria: string;
  idProveedor: number;
  proveedor: string;
}
