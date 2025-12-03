import { Component, inject } from '@angular/core';
import { ProductoService } from '../../producto.service';
import { Producto } from '../../models/producto.models';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoadingComponent } from "../../compartidos/componentes/loading/loading.component";
@Component({
  selector: 'app-registro-productos',
  imports: [RouterLink, MatTableModule, CommonModule, SweetAlert2Module, LoadingComponent],
  templateUrl: './registro-productos.component.html',
  styleUrl: './registro-productos.component.css'
})
export class RegistroProductosComponent {
 productoService = inject(ProductoService);
  productos?: Producto[];
  
  columnasAMostrar = [
    'Nombre',
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
      console.log('Proveedores cargados:', productos);
      this.productos = productos;
    }, error => {
      console.error('Error al cargar proveedores:', error);
    });
  }
  borrar(id: number) {
    
      this.productoService.borrar(id).subscribe(() => {
        Swal.fire("Exitoso", "El registro ha sido borrado exitosamente ", 'success')
        this.cargarProductos();
      
      });
    }
  }

