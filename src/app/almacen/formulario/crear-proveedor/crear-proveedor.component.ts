import { Component, inject } from '@angular/core';
import { FormularioProveedorComponent } from "../formulario-proveedor/formulario-proveedor.component";
import { ProveedorService } from '../../../proveedor.service';
import { ProveedorCreacion } from '../../../models/proveedor.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-proveedor',
  imports: [FormularioProveedorComponent],
  templateUrl: './crear-proveedor.component.html',
  styleUrl: './crear-proveedor.component.css'
})
export class CrearProveedorComponent {
  router = inject(Router);
  proveedorService = inject(ProveedorService);
  guardarCambios(proveedor: ProveedorCreacion) {
      this.proveedorService.crear(proveedor).subscribe(() => {
        this.router.navigate(["/registro-proveedores"]);
      });
    }

}
