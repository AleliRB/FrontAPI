import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { Proveedor, ProveedorCreacion } from './models/proveedor.models';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor() { }
   private http = inject(HttpClient);
  private URLbase = environment.apiURL + 'api/proveedores';

  public obtenerTodos(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.URLbase);
  }

  public obtenerActivos(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.URLbase}/activos`);
  }

  public obtenerPorId(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.URLbase}/${id}`);
  }

  public crear(proveedor: ProveedorCreacion) {
    return this.http.post(this.URLbase, proveedor);
  }

  public actualizar(id: number, proveedor: ProveedorCreacion) {
    return this.http.put(`${this.URLbase}/${id}`, proveedor);
  }

  public cambiarEstado(id: number, estado: string) {
    return this.http.patch(`${this.URLbase}/${id}/estado`, estado);
  }

  public borrar(id: number) {
    return this.http.delete(`${this.URLbase}/${id}`);
  }
}
