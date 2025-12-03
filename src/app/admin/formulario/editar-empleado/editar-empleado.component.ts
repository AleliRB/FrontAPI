import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { transform } from 'typescript';
import { EmpleadoService } from '../../../empleado.service';
import { Empleado, EmpleadoCreacion } from '../../../models/empleado.models';
import { FormularioEmpleadoComponent } from "../formulario-empleado/formulario-empleado.component";
import { Router } from '@angular/router';
import { LoadingComponent } from "../../../compartidos/componentes/loading/loading.component";
import { extraerErrores } from '../../../compartidos/componentes/funciones/extraerErrores';
import { MostrarErroresComponent } from "../../../compartidos/componentes/mostrar-errores/mostrar-errores.component";

@Component({
  selector: 'app-editar-empleado',
  imports: [FormularioEmpleadoComponent, LoadingComponent, MostrarErroresComponent],
  templateUrl: './editar-empleado.component.html',
  styleUrl: './editar-empleado.component.css'
})
export class EditarEmpleadoComponent implements OnInit {
@Input({transform: numberAttribute})
id!: number


empleadoService=inject(EmpleadoService);
router= inject(Router);
modelo?: Empleado;
errores: string[]=[];
ngOnInit(): void {
  this.empleadoService.obtenerPorId(this.id).subscribe(empleado=>{
    this.modelo=empleado;
  });
}

guardarCambios(empleado: EmpleadoCreacion){
  this.empleadoService.actualizar(this.id, empleado).subscribe((
    {
      next:()=>{
        this.router.navigate(['/registro-empleados']);
      },error: err=>{
        const errores = extraerErrores(err);
                  this.errores=errores;
      }
        
    }
  ));
}
}