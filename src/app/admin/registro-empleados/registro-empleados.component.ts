import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmpleadoService } from '../../empleado.service';
import { Empleado } from '../../models/empleado.models';
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-registro-empleados',
  imports: [RouterLink,MatTableModule],
  templateUrl: './registro-empleados.component.html',
  styleUrl: './registro-empleados.component.css'
})
export class RegistroEmpleadosComponent {
 empleadoService=inject(EmpleadoService);
 empleados?: Empleado[];
 columnasAMostrar=['ID','Nombre','Apellido','DNI','Telefono','Email','Direccion','Acciones'];
 constructor(){
  this.empleadoService.obtenerTodos().subscribe(empleados=>{
    
    this.empleados= empleados;
  });
 }
}
