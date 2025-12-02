import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { FormularioProveedorComponent } from "../formulario-proveedor/formulario-proveedor.component";
import { ProveedorService } from '../../../proveedor.service';
import { Proveedor, ProveedorCreacion } from '../../../models/proveedor.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-proveedor',
  imports: [FormularioProveedorComponent],
  templateUrl: './editar-proveedor.component.html',
  styleUrl: './editar-proveedor.component.css'
})
export class EditarProveedorComponent implements OnInit{
    @Input({ transform: numberAttribute })
  id!: number;

  proveedorService = inject(ProveedorService);
  router = inject(Router);
  modelo?: Proveedor;

  ngOnInit(): void {
    this.proveedorService.obtenerPorId(this.id).subscribe(proveedor => {
      this.modelo = proveedor;
    });
  }

  guardarCambios(proveedor: ProveedorCreacion) {
    this.proveedorService.actualizar(this.id, proveedor).subscribe(() => {
      this.router.navigate(['/registro-proveedores']);
    });
  }

}
