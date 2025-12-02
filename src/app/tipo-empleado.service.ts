import { inject, Injectable } from '@angular/core';
import { TipoEmpleado } from './models/tipo-empleado.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoEmpleadoService {

  constructor() { }

  private http = inject(HttpClient);
  private URLbase = environment.apiURL + 'api/tiposempleado';

  public obtenerTodos(): Observable<TipoEmpleado[]> {
    return this.http.get<TipoEmpleado[]>(this.URLbase);
  }

  public obtenerPorId(id: number): Observable<TipoEmpleado> {
    return this.http.get<TipoEmpleado>(`${this.URLbase}/${id}`);
  }

  public crear(tipoEmpleado: TipoEmpleado) {
    return this.http.post(this.URLbase, tipoEmpleado);
  }

  public actualizar(id: number, tipoEmpleado: TipoEmpleado) {
    return this.http.put(`${this.URLbase}/${id}`, tipoEmpleado);
  }

  public borrar(id: number) {
    return this.http.delete(`${this.URLbase}/${id}`);
  }
}
