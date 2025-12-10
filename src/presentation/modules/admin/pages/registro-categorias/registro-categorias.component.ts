import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../../../../core/data/repositories/categoria.service';
import { Categoria } from '../../../../../core/domain/entities/categoria.models';
import { SwalDirective, SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import Swal from 'sweetalert2';
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";

@Component({
  selector: 'app-registro-categorias',
  standalone: true,
  imports: [RouterLink, MatTableModule, MatPaginatorModule, MatButtonModule, CommonModule, SwalDirective, SweetAlert2Module, LoadingComponent],
  templateUrl: './registro-categorias.component.html',
  styleUrl: './registro-categorias.component.css'
})
export class RegistroCategoriasComponent implements AfterViewInit {
  categoriaService = inject(CategoriaService);
  categorias?: Categoria[];

  dataSource = new MatTableDataSource<Categoria>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  columnasAMostrar = ['ID', 'Descripcion', 'Acciones'];

  constructor() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.obtenerTodos().subscribe(categorias => {
      console.log('Categorías cargadas:', categorias);
      this.categorias = categorias;
      this.dataSource.data = categorias;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      } else {
        setTimeout(() => { if (this.paginator) this.dataSource.paginator = this.paginator; }, 0);
      }
    }, error => {
      console.error('Error al cargar categorías:', error);
    });
  }

  borrar(id: number) {
    this.categoriaService.borrar(id).subscribe(() => {
      Swal.fire("Exitoso", "El registro ha sido borrado exitosamente ", 'success');
      this.cargarCategorias();
    });
  }

  ngAfterViewInit(): void {
    if (this.paginator) this.dataSource.paginator = this.paginator;
  }
}

