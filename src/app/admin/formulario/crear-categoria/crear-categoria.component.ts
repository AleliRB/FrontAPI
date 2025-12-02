import { Component, inject } from '@angular/core';
import { Router } from "@angular/router";

import { FormularioCategoriaComponent } from "../formulario-categoria/formulario-categoria.component";
import { CategoriaService } from '../../../categoria.service';
import { CategoriaCreacion } from '../../../models/categoria.models';

@Component({
  selector: 'app-crear-categoria',
  standalone: true,
  imports: [FormularioCategoriaComponent],
  templateUrl: './crear-categoria.component.html',
  styleUrl: './crear-categoria.component.css'
})
export class CrearCategoriaComponent {
  router = inject(Router);
  categoriaService = inject(CategoriaService);

  guardarCambios(categoria: CategoriaCreacion) {
    this.categoriaService.crear(categoria).subscribe(() => {
      this.router.navigate(["/registro-categorias"]);
    });
  }
}