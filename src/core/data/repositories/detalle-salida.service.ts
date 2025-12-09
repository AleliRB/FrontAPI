import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { DetalleSalida, DetalleSalidaCreacion } from '../../domain/entities/detalle-salida.models';

@Injectable({
  providedIn: 'root'
})
export class DetalleSalidaService {

  constructor() { }

  private http = inject(HttpClient);
  private URLbase = environment.apiURL + 'api/detallessalida';

  public obtenerPorSalida(idSalida: number): Observable<DetalleSalida[]> {
    return this.http.get<DetalleSalida[]>(`${this.URLbase}/salida/${idSalida}`);
  }

  public obtenerDetalle(idSalida: number, idProducto: number): Observable<DetalleSalida> {
    return this.http.get<DetalleSalida>(`${this.URLbase}/${idSalida}/${idProducto}`);
  }

  public crear(detalle: DetalleSalidaCreacion) {
    return this.http.post(this.URLbase, detalle);
  }

  public actualizar(idSalida: number, idProducto: number, detalle: DetalleSalidaCreacion) {
    return this.http.put(`${this.URLbase}/${idSalida}/${idProducto}`, detalle);
  }

  public borrar(idSalida: number, idProducto: number) {
    return this.http.delete(`${this.URLbase}/${idSalida}/${idProducto}`);
  }
}
