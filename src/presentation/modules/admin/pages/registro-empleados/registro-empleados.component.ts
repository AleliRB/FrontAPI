import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmpleadoService } from '../../../../../core/data/repositories/empleado.service';
import { Empleado } from '../../../../../core/domain/entities/empleado.models';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SwalDirective, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-registro-empleados',
  standalone: true,
  imports: [RouterLink, MatTableModule, MatPaginatorModule, MatButtonModule, CommonModule, SwalDirective,SweetAlert2Module, LoadingComponent],
  templateUrl: './registro-empleados.component.html',
  styleUrl: './registro-empleados.component.css'
})
export class RegistroEmpleadosComponent implements AfterViewInit {
  empleadoService = inject(EmpleadoService);
  empleados?: Empleado[];

  dataSource = new MatTableDataSource<Empleado>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

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
      console.log('Empleados cargados:', empleados);
      this.empleados = empleados;
      this.dataSource.data = empleados;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      } else {
        setTimeout(() => { if (this.paginator) this.dataSource.paginator = this.paginator; }, 0);
      }
    }, error => {
      console.error('Error al cargar empleados:', error); 
    });
  }

  borrar(id: number) {
    this.empleadoService.borrar(id).subscribe(() => {
      Swal.fire("Exitoso", "El registro ha sido borrado exitosamente ", 'success')
      this.cargarEmpleados();
    });
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}

