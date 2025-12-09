import { Component, inject } from '@angular/core';
import { FormularioProductoComponent } from "../formulario-producto/formulario-producto.component";
import { ProductoService } from '../../../../../../core/data/repositories/producto.service';
import { ProductoCreacion } from '../../../../../../core/domain/entities/producto.models';
import { Router } from '@angular/router';
import { CategoriaService } from '../../../../../../core/data/repositories/categoria.service';
import { Categoria } from '../../../../../../core/domain/entities/categoria.models';
import { ProveedorService } from '../../../../../../core/data/repositories/proveedor.service';
import { Proveedor } from '../../../../../../core/domain/entities/proveedor.models';

@Component({
  selector: 'app-crear-producto',
  imports: [FormularioProductoComponent],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent {
 router = inject(Router);
  productoService = inject(ProductoService);
  categoriaService = inject(CategoriaService);
  proveedorService = inject(ProveedorService);

  
 proveedores: Proveedor[] = [];
  categorias: Categoria[] = [];

  constructor() {
    this.cargarCategorias();
  }

cargarCategorias() {
  this.categoriaService.obtenerTodos().subscribe({
    next: categorias => this.categorias = categorias,
    error: e => console.error("Error cargando categorías", e)
  });

  this.proveedorService.obtenerTodos().subscribe({
    next: proveedores => this.proveedores = proveedores, 
    error: e => console.error("Error cargando proveedores", e)
  });
}

  guardarCambios(producto: ProductoCreacion) {
    this.productoService.crear(producto).subscribe(() => {
      this.router.navigate(["/registro-productos"]);
    });
  }
}

