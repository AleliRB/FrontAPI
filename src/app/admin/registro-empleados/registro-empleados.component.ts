import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmpleadoService } from '../../empleado.service';
import { Empleado } from '../../models/empleado.models';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { LoadingComponent } from "../../compartidos/componentes/loading/loading.component";

@Component({
  selector: 'app-registro-empleados',
  imports: [RouterLink, MatTableModule, CommonModule, SweetAlert2Module, LoadingComponent],
  templateUrl: './registro-empleados.component.html',
  styleUrl: './registro-empleados.component.css'
})
export class RegistroEmpleadosComponent {
  empleadoService = inject(EmpleadoService);
  empleados?: Empleado[];
  
  columnasAMostrar = [
    'Nombre',
    'Apellido',
    'DNI',
    'Telefono',
    'Email',
    'Direccion',
    'TipoEmpleado',
    'TieneUsuario',
    'Acciones'
  ];

  constructor() {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.empleadoService.obtenerTodos().subscribe(empleados => {
      console.log('Empleados cargados:', empleados); // ← Para debug
      this.empleados = empleados;
    }, error => {
      console.error('Error al cargar empleados:', error); // ← Para debug
    });
  }

  borrar(id: number) {
      this.empleadoService.borrar(id).subscribe(() => {
        Swal.fire("Exitoso", "El registro ha sido borrado exitosamente ", 'success')
        this.cargarEmpleados();
      });
    }
  }
