import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { ProductoService } from '../../../../../core/data/repositories/producto.service';
import { Producto } from '../../../../../core/domain/entities/producto.models';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { SwalDirective, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-registro-productos',
  standalone: true,
  imports: [RouterLink, MatTableModule, MatPaginatorModule, MatButtonModule,SwalDirective, CommonModule, SweetAlert2Module, LoadingComponent],
  templateUrl: './registro-productos.component.html',
  styleUrl: './registro-productos.component.css'
})
export class RegistroProductosComponent implements AfterViewInit {
 productoService = inject(ProductoService);
  productos?: Producto[];

  dataSource = new MatTableDataSource<Producto>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  
  columnasAMostrar = [
    'Nombre',
    'Ubicacion',
    'Descripcion',
    'Categoria',
    'Proveedor',
    'Stock',
    'Acciones'
  ];

  constructor() {
    this.cargarProductos();
  }

 cargarProductos() {
    this.productoService.obtenerTodos().subscribe(productos => {
      console.log('Productos cargados:', productos);
      this.productos = productos;
      this.dataSource.data = productos;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      } else {
        setTimeout(() => { if (this.paginator) this.dataSource.paginator = this.paginator; }, 0);
      }
    }, error => {
      console.error('Error al cargar productos:', error);
    });
  }
  borrar(id: number) {
      this.productoService.borrar(id).subscribe(() => {
        Swal.fire("Exitoso", "El registro ha sido borrado exitosamente ", 'success')
        this.cargarProductos();
      });
    }

  ngAfterViewInit(): void {
    if (this.paginator) this.dataSource.paginator = this.paginator;
  }
  }


