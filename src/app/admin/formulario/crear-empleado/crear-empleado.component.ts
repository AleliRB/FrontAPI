import { Component, inject} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { EmpleadoService } from '../../../empleado.service';
import { Empleado, EmpleadoCreacion } from '../../../models/empleado.models';
import { FormularioEmpleadoComponent } from "../formulario-empleado/formulario-empleado.component";
@Component({
  selector: 'app-crear-empleado',
  imports: [FormularioEmpleadoComponent],
  templateUrl: './crear-empleado.component.html',
  styleUrl: './crear-empleado.component.css'
})
export class CrearEmpleadoComponent  {
router= inject(Router);
empleadoService =inject(EmpleadoService);
guardarCambios(empleado: EmpleadoCreacion){
  
  this.empleadoService.crear(empleado).subscribe(()=>{
    this.router.navigate(["registro-empleados"])
  });
}
}

