import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Empleado, EmpleadoCreacion } from './models/empleado.models';
import { Observable } from 'rxjs';
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

  public crear(empleado:EmpleadoCreacion){
    return this.http.post(this.URLbase, empleado);
  }

}
