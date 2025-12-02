import { Component, inject } from '@angular/core';
import { Salida } from '../../models/salida.models';
import { SalidaService } from '../../salida.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro-salida',
  imports: [RouterLink, MatTableModule, CommonModule],
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



  registrarDevolucion(id: number) {
    const fechaDevolucion = new Date();
    if (confirm('¿Confirmar devolución de esta salida?')) {
      this.salidaService.registrarDevolucion(id, fechaDevolucion).subscribe(() => {
        this.cargarSalidas();
      });
    }
  }

  borrar(id: number) {
    if (confirm('¿Estás seguro de eliminar esta salida?')) {
      this.salidaService.borrar(id).subscribe(() => {
        this.cargarSalidas();
      }, error => {
        console.error('Error al borrar:', error);
      });
    }
  }

  esPendiente(fechaDevolucion?: Date): boolean {
    return !fechaDevolucion || new Date(fechaDevolucion) > new Date();
  }

}
