import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { Proveedor } from '../../../../../core/domain/entities/proveedor.models';
import { ProveedorService } from '../../../../../core/data/repositories/proveedor.service';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { SwalDirective, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";

@Component({
  selector: 'app-registro-proveedor',
  standalone: true,
  imports: [RouterLink, MatTableModule, MatPaginatorModule, MatButtonModule,SwalDirective, CommonModule, SweetAlert2Module, LoadingComponent],
  templateUrl: './registro-proveedor.component.html',
  styleUrl: './registro-proveedor.component.css'
})
export class RegistroProveedorComponent implements AfterViewInit {
 proveedorService = inject(ProveedorService);
  proveedores?: Proveedor[];

  dataSource = new MatTableDataSource<Proveedor>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  
  columnasAMostrar = [
  
    'RazonSocial',
    'Direccion',
    'Telefono',
    'Email',
    'Productos',
    'TotalProductos',
    'Estado',
    'Acciones'
  ];

  constructor() {
    this.cargarProveedores();
  }

  cargarProveedores() {
    this.proveedorService.obtenerTodos().subscribe(proveedores => {
      console.log('Proveedores cargados:', proveedores);
      this.proveedores = proveedores;
      this.dataSource.data = proveedores;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      } else {
        setTimeout(() => { if (this.paginator) this.dataSource.paginator = this.paginator; }, 0);
      }
    }, error => {
      console.error('Error al cargar proveedores:', error);
    });
  }

  cambiarEstado(id: number, estadoActual: string) {
    const nuevoEstado = estadoActual === 'Activo' ? 'Inactivo' : 'Activo';
    this.proveedorService.cambiarEstado(id, nuevoEstado).subscribe(() => {
      this.cargarProveedores();
    });
  }

  borrar(id: number) {
    
      this.proveedorService.borrar(id).subscribe(() => {
        Swal.fire("Exitoso", "El registro ha sido borrado exitosamente ", 'success')
        this.cargarProveedores();
      });
    }

  ngAfterViewInit(): void {
    if (this.paginator) this.dataSource.paginator = this.paginator;
  }
}


