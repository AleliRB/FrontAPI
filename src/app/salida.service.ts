import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { Salida, SalidaCreacion } from './models/salida.models';

@Injectable({
  providedIn: 'root'
})
export class SalidaService {

  constructor() { }
  private http = inject(HttpClient);
  private URLbase = environment.apiURL + 'api/salidas';

  public obtenerTodos(): Observable<Salida[]> {
    return this.http.get<Salida[]>(this.URLbase);
  }

  public obtenerPorId(id: number): Observable<Salida> {
    return this.http.get<Salida>(`${this.URLbase}/${id}`);
  }

  public obtenerPorEmpleado(idEmp: number): Observable<Salida[]> {
    return this.http.get<Salida[]>(`${this.URLbase}/empleado/${idEmp}`);
  }

  public obtenerPendientes(): Observable<Salida[]> {
    return this.http.get<Salida[]>(`${this.URLbase}/pendientes`);
  }

  public crear(salida: SalidaCreacion) {
    return this.http.post(this.URLbase, salida);
  }

  public actualizar(id: number, salida: SalidaCreacion) {
    return this.http.put(`${this.URLbase}/${id}`, salida);
  }

  public registrarDevolucion(id: number, fechaDevolucion: Date) {
    return this.http.patch(`${this.URLbase}/${id}/devolucion`, fechaDevolucion);
  }

  public borrar(id: number) {
    return this.http.delete(`${this.URLbase}/${id}`);
  }
}
