import { Component, inject} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { EmpleadoService } from '../../../empleado.service';
import { Empleado, EmpleadoCreacion } from '../../../models/empleado.models';
import { FormularioEmpleadoComponent } from "../formulario-empleado/formulario-empleado.component";
import { extraerErrores } from '../../../compartidos/componentes/funciones/extraerErrores';
import { MostrarErroresComponent } from "../../../compartidos/componentes/mostrar-errores/mostrar-errores.component";
@Component({
  selector: 'app-crear-empleado',
  imports: [FormularioEmpleadoComponent, MostrarErroresComponent],
  templateUrl: './crear-empleado.component.html',
  styleUrl: './crear-empleado.component.css'
})
export class CrearEmpleadoComponent  {
router= inject(Router);
empleadoService =inject(EmpleadoService);
errores: string[]=[];

guardarCambios(empleado: EmpleadoCreacion){
  
  this.empleadoService.crear(empleado).subscribe(({
    next:()=>{
      this.router.navigate(["registro-empleados"]);
    },
    error: err=>{
            const errores= extraerErrores(err);
            this.errores=errores;
            
    
          }
  }));
}
}

