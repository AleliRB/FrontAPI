import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Empleado, EmpleadoCreacion } from './models/empleado.models';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor() { }


  private http = inject(HttpClient);
  private URLbase =environment.apiURL +'api/empleados';

  public obtenerTodos(): Observable<Empleado[]>{
    
    return this.http.get<Empleado[]>(this.URLbase);
  }

  public obtenerPorId(id: number):Observable<Empleado>{
    return this.http.get<Empleado>(`${this.URLbase}/${id}`)
  }

  public crear(empleado:EmpleadoCreacion){
    return this.http.post(this.URLbase, empleado);
  }

  public actualizar(id: number, empleado:EmpleadoCreacion){
    return this.http.put(`${this.URLbase}/${id}`, empleado);
  }
  public borrar (id:number){
    return this.http.delete(`${this.URLbase}/${id}`);
  }

}
