import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { Categoria, CategoriaCreacion } from './models/categoria.models';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor() { }
  private http = inject(HttpClient);
  private URLbase = environment.apiURL + 'api/categoria';

  public obtenerTodos(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.URLbase);
  }

  public obtenerPorId(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.URLbase}/${id}`);
  }

  public crear(categoria: CategoriaCreacion) {
    return this.http.post(this.URLbase, categoria);
  }

  public actualizar(id: number, categoria: CategoriaCreacion) {
    return this.http.put(`${this.URLbase}/${id}`, categoria);
  }

  public borrar(id: number) {
    return this.http.delete(`${this.URLbase}/${id}`);
  }
}
