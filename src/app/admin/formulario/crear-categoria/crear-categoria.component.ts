import { Component, inject } from '@angular/core';
import { Router } from "@angular/router";

import { FormularioCategoriaComponent } from "../formulario-categoria/formulario-categoria.component";
import { CategoriaService } from '../../../categoria.service';
import { CategoriaCreacion } from '../../../models/categoria.models';
import { extraerErrores } from '../../../compartidos/componentes/funciones/extraerErrores';
import { MostrarErroresComponent } from "../../../compartidos/componentes/mostrar-errores/mostrar-errores.component";

@Component({
  selector: 'app-crear-categoria',
  standalone: true,
  imports: [FormularioCategoriaComponent, MostrarErroresComponent],
  templateUrl: './crear-categoria.component.html',
  styleUrl: './crear-categoria.component.css'
})
export class CrearCategoriaComponent {
  router = inject(Router);
  categoriaService = inject(CategoriaService);
  errores: string[]=[];


  guardarCambios(categoria: CategoriaCreacion) {
    this.categoriaService.crear(categoria).subscribe({next: ()=>{
        this.router.navigate(["/registro-categorias"]);
      },
      error: err=>{
        const errores= extraerErrores(err);
        this.errores=errores;
        

      }
    });
  }
}