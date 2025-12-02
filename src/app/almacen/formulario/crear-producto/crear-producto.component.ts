import { Component, inject } from '@angular/core';
import { FormularioProductoComponent } from "../formulario-producto/formulario-producto.component";
import { ProductoService } from '../../../producto.service';
import { ProductoCreacion } from '../../../models/producto.models';
import { Router } from '@angular/router';
import { CategoriaService } from '../../../categoria.service';
import { Categoria } from '../../../models/categoria.models';

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
  

  categorias: Categoria[] = [];

  constructor() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.obtenerTodos().subscribe({
      next: categorias => this.categorias = categorias,
      error: e => console.error("Error cargando categorías", e)
    });
  }
  guardarCambios(producto: ProductoCreacion) {
    this.productoService.crear(producto).subscribe(() => {
      this.router.navigate(["/registro-productos"]);
    });
  }
}
