import { Component, inject, OnInit } from '@angular/core';
import { FormularioProveedorComponent } from "../formulario-proveedor/formulario-proveedor.component";
import { ProveedorService } from '../../../../../../core/data/repositories/proveedor.service';
import { ProveedorCreacion } from '../../../../../../core/domain/entities/proveedor.models';
import { Router } from '@angular/router';
import { ProductoService } from '../../../../../../core/data/repositories/producto.service';

@Component({
  selector: 'app-crear-proveedor',
  imports: [FormularioProveedorComponent],
  templateUrl: './crear-proveedor.component.html',
  styleUrl: './crear-proveedor.component.css'
})
export class CrearProveedorComponent implements OnInit {
  listaProductos: any[] = [];
  router = inject(Router);
  proveedorService = inject(ProveedorService);
  productoService = inject(ProductoService);

  ngOnInit(): void {
    this.productoService.obtenerTodos().subscribe({
      next: productos => {
        console.log('Productos cargados:', productos);
        this.listaProductos = productos;
      },
      error: err => console.error("Error cargando productos:", err)
    });
  }

  guardarCambios(proveedor: ProveedorCreacion) {
    console.log('Guardando proveedor:', proveedor);
    this.proveedorService.crear(proveedor).subscribe({
      next: () => {
        this.router.navigate(["/registro-proveedores"]);
      },
      error: err => console.error("Error al crear proveedor:", err)
    });
  }
}
