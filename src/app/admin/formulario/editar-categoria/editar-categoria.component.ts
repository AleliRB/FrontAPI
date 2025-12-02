import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';

import { FormularioCategoriaComponent } from "../formulario-categoria/formulario-categoria.component";
import { Router } from '@angular/router';
import { CategoriaService } from '../../../categoria.service';
import { Categoria, CategoriaCreacion } from '../../../models/categoria.models';

@Component({
  selector: 'app-editar-categoria',
  standalone: true,
  imports: [FormularioCategoriaComponent],
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.css'
})
export class EditarCategoriaComponent implements OnInit {
  @Input({ transform: numberAttribute })
  id!: number;

  categoriaService = inject(CategoriaService);
  router = inject(Router);
  modelo?: Categoria;

  ngOnInit(): void {
    this.categoriaService.obtenerPorId(this.id).subscribe(categoria => {
      this.modelo = categoria;
    });
  }

  guardarCambios(categoria: CategoriaCreacion) {
    this.categoriaService.actualizar(this.id, categoria).subscribe(() => {
      this.router.navigate(['/registro-categorias']);
    });
  }
}