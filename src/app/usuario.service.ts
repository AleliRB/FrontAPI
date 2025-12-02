import { inject, Injectable } from '@angular/core';
import { Usuario, UsuarioCreacion } from './models/usuario.models';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }
  private http = inject(HttpClient);
  private URLbase = environment.apiURL + 'api/usuarios';

  public obtenerTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.URLbase);
  }

  public obtenerPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.URLbase}/${id}`);
  }

  public obtenerPorEmpleado(idEmp: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.URLbase}/empleado/${idEmp}`);
  }

  public crear(usuario: UsuarioCreacion) {
    return this.http.post(this.URLbase, usuario);
  }

  public actualizar(id: number, usuario: UsuarioCreacion) {
    return this.http.put(`${this.URLbase}/${id}`, usuario);
  }

  public cambiarEstado(id: number, estado: boolean) {
    return this.http.patch(`${this.URLbase}/${id}/estado`, estado);
  }

  public borrar(id: number) {
    return this.http.delete(`${this.URLbase}/${id}`);
  }
}
