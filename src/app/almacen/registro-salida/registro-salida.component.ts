import { Component, inject } from '@angular/core';
import { Salida } from '../../models/salida.models';
import { SalidaService } from '../../salida.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { LoadingComponent } from "../../compartidos/componentes/loading/loading.component";

@Component({
  selector: 'app-registro-salida',
  imports: [RouterLink, MatTableModule, CommonModule, SweetAlert2Module, LoadingComponent],
  templateUrl: './registro-salida.component.html',
  styleUrl: './registro-salida.component.css'
})
export class RegistroSalidaComponent {
  salidaService = inject(SalidaService);
  salidas?: Salida[];
  
  columnasAMostrar = [
    'ID',
    'Destino',
    'FechaSalida',
    'Empleado',
    'Acciones'
  ];

  constructor() {
    this.cargarSalidas();
  }

  cargarSalidas() {
    this.salidaService.obtenerTodos().subscribe(salidas => {
      console.log('Salidas cargadas:', salidas);
      this.salidas = salidas;
    }, error => {
      console.error('Error al cargar salidas:', error);
    });
  }


  borrar(id: number) {
      this.salidaService.borrar(id).subscribe(() => {
       Swal.fire("Exitoso", "El registro ha sido borrado exitosamente ", 'success')
       this.cargarSalidas();
      });
    }
  }




