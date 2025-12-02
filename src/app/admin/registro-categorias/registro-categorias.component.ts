import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../categoria.service';
import { Categoria } from '../../models/categoria.models';

@Component({
  selector: 'app-registro-categorias',
  standalone: true,
  imports: [RouterLink, MatTableModule, CommonModule],
  templateUrl: './registro-categorias.component.html',
  styleUrl: './registro-categorias.component.css'
})
export class RegistroCategoriasComponent {
  categoriaService = inject(CategoriaService);
  categorias?: Categoria[];
  
  columnasAMostrar = ['ID', 'Descripcion', 'Acciones'];

  constructor() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.obtenerTodos().subscribe(categorias => {
      console.log('Categorías cargadas:', categorias);
      this.categorias = categorias;
    }, error => {
      console.error('Error al cargar categorías:', error);
    });
  }

  borrar(id: number) {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.categoriaService.borrar(id).subscribe(() => {
        this.cargarCategorias();
      }, error => {
        console.error('Error al borrar:', error);
        alert('No se puede eliminar la categoría porque tiene productos asociados');
      });
    }
  }
}