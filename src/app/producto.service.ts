import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { Producto, ProductoCreacion } from './models/producto.models';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor() { }
   private http = inject(HttpClient);
  private URLbase = environment.apiURL + 'api/producto';

  public obtenerTodos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.URLbase);
  }

  public obtenerPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.URLbase}/${id}`);
  }

  public obtenerPorCategoria(idCategoria: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.URLbase}/categoria/${idCategoria}`);
  }
  public obtenerPorProveedor(idProveedor: number): Observable<Producto[]> {
  return this.http.get<Producto[]>(`${this.URLbase}/proveedor/${idProveedor}`);
}


  public crear(producto: ProductoCreacion) {
    return this.http.post(this.URLbase, producto);
  }

  public actualizar(id: number, producto: ProductoCreacion) {
    return this.http.put(`${this.URLbase}/${id}`, producto);
  }

  public actualizarStock(id: number, nuevoStock: number) {
    return this.http.patch(`${this.URLbase}/${id}/stock`, nuevoStock);
  }

  public borrar(id: number) {
    return this.http.delete(`${this.URLbase}/${id}`);
  }
}
