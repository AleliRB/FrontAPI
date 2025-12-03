import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Salida, SalidaCreacion } from '../../../models/salida.models';
import { SalidaService } from '../../../salida.service';
import { FormularioSalidaComponent } from '../formulario-salida/formulario-salida.component';
import { LoadingComponent } from "../../../compartidos/componentes/loading/loading.component";

@Component({
  selector: 'app-editar-salida',
  imports: [FormularioSalidaComponent, LoadingComponent],
  templateUrl: './editar-salida.component.html',
  styleUrl: './editar-salida.component.css'
})
export class EditarSalidaComponent implements OnInit {
 @Input({ transform: numberAttribute })
  id!: number;

  salidaService = inject(SalidaService);
  router = inject(Router);
  modelo?: Salida;

  ngOnInit(): void {
    this.salidaService.obtenerPorId(this.id).subscribe(salida => {
      this.modelo = salida;
    });
  }

  guardarCambios(salida: SalidaCreacion) {
    this.salidaService.actualizar(this.id, salida).subscribe(() => {
      this.router.navigate(['/registro-salidas']);
    });
  }
}
