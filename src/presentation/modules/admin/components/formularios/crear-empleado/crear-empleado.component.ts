import { Component, inject} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { EmpleadoService } from '../../../../../../core/data/repositories/empleado.service';
import { Empleado, EmpleadoCreacion } from '../../../../../../core/domain/entities/empleado.models';
import { FormularioEmpleadoComponent } from "../formulario-empleado/formulario-empleado.component";
import { extraerErrores } from '../../../../../shared/components/funciones/extraerErrores';
import { MostrarErroresComponent } from "../../../../../shared/components/mostrar-errores/mostrar-errores.component";
@Component({
  selector: 'app-crear-empleado',
  imports: [FormularioEmpleadoComponent, MostrarErroresComponent, ReactiveFormsModule],
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


