import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { EmpleadoService } from '../../../empleado.service';
import { EmpleadoCreacion } from '../../../models/empleado.models';
@Component({
  selector: 'app-crear-empleado',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './crear-empleado.component.html',
  styleUrl: './crear-empleado.component.css'
})
export class CrearEmpleadoComponent {
private readonly formBuilder =inject(FormBuilder);
empleadoService =inject(EmpleadoService);
router= inject(Router);

form= this.formBuilder.group({
  nombre:[''],
  apellido:[''],
  dni:[''],
  telefono:[''],
  email:[''],
  direccion:['']
})
guardarCambios(){
  let empleado=this.form.value as EmpleadoCreacion;
  this.empleadoService.crear(empleado).subscribe(()=>{
    this.router.navigate(["registro-empleados"])
  });
}
}

