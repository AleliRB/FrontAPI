import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { EmpleadoCreacion } from './models/empleado.models';
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor() { }


  private http = inject(HttpClient);
  private URLbase =environment.apiURL +'api/empleados';

  public crear(empleado:EmpleadoCreacion){
    return this.http.post(this.URLbase, empleado);
  }

}
