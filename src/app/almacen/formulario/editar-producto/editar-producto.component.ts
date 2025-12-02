import { Component, inject, Input, numberAttribute } from '@angular/core';
import { FormularioProductoComponent } from "../formulario-producto/formulario-producto.component";
import { ProductoService } from '../../../producto.service';
import { Producto, ProductoCreacion } from '../../../models/producto.models';
import { Router } from '@angular/router';
import { CategoriaService } from '../../../categoria.service';
import { Categoria } from '../../../models/categoria.models';

@Component({
  selector: 'app-editar-producto',
  imports: [FormularioProductoComponent],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent {
 @Input({ transform: numberAttribute })
  id!: number;

  productoService = inject(ProductoService);
  categoriaService = inject(CategoriaService);
  router = inject(Router);
  modelo?: Producto;

  categorias: Categoria[] = [];
    
  ngOnInit(): void {
    // Cargar producto
    this.productoService.obtenerPorId(this.id).subscribe(producto => {
      this.modelo = producto;
    });
     // Cargar categorías
    this.categoriaService.obtenerTodos().subscribe(cats => {
      this.categorias = cats;
    });
  }

  guardarCambios(producto: ProductoCreacion) {
    this.productoService.actualizar(this.id, producto).subscribe(() => {
      this.router.navigate(['/registro-productos']);
    });
  }
}
