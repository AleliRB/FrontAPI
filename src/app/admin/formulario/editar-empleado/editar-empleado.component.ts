import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { transform } from 'typescript';
import { EmpleadoService } from '../../../empleado.service';
import { Empleado, EmpleadoCreacion } from '../../../models/empleado.models';
import { FormularioEmpleadoComponent } from "../formulario-empleado/formulario-empleado.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-empleado',
  imports: [FormularioEmpleadoComponent],
  templateUrl: './editar-empleado.component.html',
  styleUrl: './editar-empleado.component.css'
})
export class EditarEmpleadoComponent implements OnInit {
@Input({transform: numberAttribute})
id!: number


empleadoService=inject(EmpleadoService);
router= inject(Router);
modelo?: Empleado;
ngOnInit(): void {
  this.empleadoService.obtenerPorId(this.id).subscribe(empleado=>{
    this.modelo=empleado;
  });
}

guardarCambios(empleado: EmpleadoCreacion){
  this.empleadoService.actualizar(this.id, empleado).subscribe(()=>{
    this.router.navigate(['/registro-empleados']);
})
}
}