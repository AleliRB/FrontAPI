import { Component, inject, Input, numberAttribute } from '@angular/core';
import { FormularioProductoComponent } from "../formulario-producto/formulario-producto.component";
import { ProductoService } from '../../../producto.service';
import { Producto, ProductoCreacion } from '../../../models/producto.models';
import { Router } from '@angular/router';

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
  router = inject(Router);
  modelo?: Producto;

  ngOnInit(): void {
    this.productoService.obtenerPorId(this.id).subscribe(producto => {
      this.modelo = producto;
    });
  }

  guardarCambios(producto: ProductoCreacion) {
    this.productoService.actualizar(this.id, producto).subscribe(() => {
      this.router.navigate(['/registro-productos']);
    });
  }
}
