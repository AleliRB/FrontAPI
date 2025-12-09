import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';

import { FormularioCategoriaComponent } from "../formulario-categoria/formulario-categoria.component";
import { Router } from '@angular/router';
import { CategoriaService } from '../../../../../../core/data/repositories/categoria.service';
import { Categoria, CategoriaCreacion } from '../../../../../../core/domain/entities/categoria.models';
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";
import { extraerErrores } from '../../../../../shared/components/funciones/extraerErrores';
import { MostrarErroresComponent } from "../../../../../shared/components/mostrar-errores/mostrar-errores.component";

@Component({
  selector: 'app-editar-categoria',
  standalone: true,
  imports: [FormularioCategoriaComponent, LoadingComponent, MostrarErroresComponent],
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.css'
})
export class EditarCategoriaComponent implements OnInit {
  @Input({ transform: numberAttribute })
  id!: number;

  categoriaService = inject(CategoriaService);
  router = inject(Router);
  modelo?: Categoria;
 errores: string[]=[];
  ngOnInit(): void {
    this.categoriaService.obtenerPorId(this.id).subscribe(categoria => {
      this.modelo = categoria;
    });
  }

  guardarCambios(categoria: CategoriaCreacion) {
    this.categoriaService.actualizar(this.id, categoria).subscribe((
      {
        next:()=>{
          this.router.navigate(['/registro-categorias']);
        }, error: err=>{
          const errores = extraerErrores(err);
          this.errores=errores;
        }
      }
    ) 
    );
  }
}
