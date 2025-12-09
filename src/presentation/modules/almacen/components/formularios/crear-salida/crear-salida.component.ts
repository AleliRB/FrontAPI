import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SalidaCreacion } from '../../../../../../core/domain/entities/salida.models';
import { SalidaService } from '../../../../../../core/data/repositories/salida.service';
import { FormularioSalidaComponent } from '../formulario-salida/formulario-salida.component';

@Component({
  selector: 'app-crear-salida',
  imports: [FormularioSalidaComponent],
  templateUrl: './crear-salida.component.html',
  styleUrl: './crear-salida.component.css'
})
export class CrearSalidaComponent {
 router = inject(Router);
  salidaService = inject(SalidaService);

  guardarCambios(salida: SalidaCreacion) {
    this.salidaService.crear(salida).subscribe(() => {
      this.router.navigate(["/registro-salidas"]);
    });
  }
}

