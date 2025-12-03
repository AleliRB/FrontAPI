import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../categoria.service';
import { Categoria } from '../../models/categoria.models';
import { SwalDirective, SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import Swal from 'sweetalert2';
import { LoadingComponent } from "../../compartidos/componentes/loading/loading.component";

@Component({
  selector: 'app-registro-categorias',
  standalone: true,
  imports: [RouterLink, MatTableModule, CommonModule, SwalDirective, SweetAlert2Module, LoadingComponent],
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
    
      this.categoriaService.borrar(id).subscribe(() => {

        Swal.fire("Exitoso", "El registro ha sido borrado exitosamente ", 'success')
        this.cargarCategorias();
      });
    }
  }
