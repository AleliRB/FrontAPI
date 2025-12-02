import { Component, inject } from '@angular/core';
import { Proveedor } from '../../models/proveedor.models';
import { ProveedorService } from '../../proveedor.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro-proveedor',
  imports: [RouterLink, MatTableModule, CommonModule],
  templateUrl: './registro-proveedor.component.html',
  styleUrl: './registro-proveedor.component.css'
})
export class RegistroProveedorComponent {
 proveedorService = inject(ProveedorService);
  proveedores?: Proveedor[];
  
  columnasAMostrar = [
  
    'RazonSocial',
    'Direccion',
    'Telefono',
    'Email',
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
    if (confirm('¿Estás seguro de eliminar este proveedor?')) {
      this.proveedorService.borrar(id).subscribe(() => {
        this.cargarProveedores();
      }, error => {
        console.error('Error al borrar:', error);
        alert('No se puede eliminar el proveedor porque tiene productos asociados');
      });
    }
}
}
