import { Component, inject } from '@angular/core';
import { ProductoService } from '../../producto.service';
import { Producto } from '../../models/producto.models';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-registro-productos',
  imports: [RouterLink, MatTableModule, CommonModule],
  templateUrl: './registro-productos.component.html',
  styleUrl: './registro-productos.component.css'
})
export class RegistroProductosComponent {
 productoService = inject(ProductoService);
  productos?: Producto[];
  
  columnasAMostrar = [
    'ID',
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
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.borrar(id).subscribe(() => {
        this.cargarProductos();
      }, error => {
        console.error('Error al borrar:', error);
        alert('No se puede eliminar el producto porque tiene categoria asociado');
      });
    }
  }
}
