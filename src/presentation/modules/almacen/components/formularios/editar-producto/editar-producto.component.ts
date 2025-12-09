import { Component, inject, Input, numberAttribute } from '@angular/core';
import { FormularioProductoComponent } from "../formulario-producto/formulario-producto.component";
import { ProductoService } from '../../../../../../core/data/repositories/producto.service';
import { Producto, ProductoCreacion } from '../../../../../../core/domain/entities/producto.models';
import { Router } from '@angular/router';
import { CategoriaService } from '../../../../../../core/data/repositories/categoria.service';
import { Categoria } from '../../../../../../core/domain/entities/categoria.models';
import { Proveedor } from '../../../../../../core/domain/entities/proveedor.models';
import { ProveedorService } from '../../../../../../core/data/repositories/proveedor.service';
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";

@Component({
  selector: 'app-editar-producto',
  imports: [FormularioProductoComponent, LoadingComponent],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent {
 @Input({ transform: numberAttribute })
  id!: number;

  productoService = inject(ProductoService);
  categoriaService = inject(CategoriaService);
  proveedorService = inject(ProveedorService);
  router = inject(Router);
  modelo?: Producto;

  categorias: Categoria[] = [];
  proveedores: Proveedor[] = [];
    
  ngOnInit(): void {
    // Cargar producto
    this.productoService.obtenerPorId(this.id).subscribe(producto => {
      this.modelo = producto;
    });
     // Cargar categorías
    this.categoriaService.obtenerTodos().subscribe(cats => {
      this.categorias = cats;
    });
    //Cargar proveedor
    this.proveedorService.obtenerTodos().subscribe(provs=>{
      this.proveedores=provs
    });
  }

  guardarCambios(producto: ProductoCreacion) {
    this.productoService.actualizar(this.id, producto).subscribe(() => {
      this.router.navigate(['/registro-productos']);
    });
  }
}

