import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { FormularioProveedorComponent } from "../formulario-proveedor/formulario-proveedor.component";
import { ProveedorService } from '../../../../../../core/data/repositories/proveedor.service';
import { Proveedor, ProveedorCreacion } from '../../../../../../core/domain/entities/proveedor.models';
import { Router } from '@angular/router';
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";
import { ProductoService } from '../../../../../../core/data/repositories/producto.service';

@Component({
  selector: 'app-editar-proveedor',
  imports: [FormularioProveedorComponent, LoadingComponent],
  templateUrl: './editar-proveedor.component.html',
  styleUrl: './editar-proveedor.component.css'
})
export class EditarProveedorComponent implements OnInit {
  @Input({ transform: numberAttribute })
  id!: number;

  proveedorService = inject(ProveedorService);
  productoService = inject(ProductoService);
  router = inject(Router);
  modelo?: Proveedor;
  listaProductos: any[] = [];

  ngOnInit(): void {
    // Cargar productos
    this.productoService.obtenerTodos().subscribe({
      next: productos => {
        this.listaProductos = productos;
        console.log('Productos cargados para editar:', productos);
      },
      error: err => console.error("Error cargando productos:", err)
    });

    // Cargar proveedor
    this.proveedorService.obtenerPorId(this.id).subscribe({
      next: proveedor => {
        console.log('Proveedor cargado:', proveedor);
        this.modelo = proveedor;
      },
      error: err => console.error("Error cargando proveedor:", err)
    });
  }

  guardarCambios(proveedor: ProveedorCreacion) {
    console.log('Actualizando proveedor:', proveedor);
    this.proveedorService.actualizar(this.id, proveedor).subscribe({
      next: () => {
        this.router.navigate(['/registro-proveedores']);
      },
      error: err => {
        console.error("Error al actualizar proveedor:", err);
        console.error("Detalles:", err.error);
      }
    });
  }
}
