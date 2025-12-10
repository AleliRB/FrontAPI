import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { Usuario } from '../../../../../core/domain/entities/usuario.models';
import { UsuarioService } from '../../../../../core/data/repositories/usuario.service';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { SwalDirective } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-registro-usuarios',
  standalone: true,
  imports: [RouterLink, MatTableModule, MatPaginatorModule,SwalDirective, MatButtonModule, CommonModule],
  templateUrl: './registro-usuarios.component.html',
  styleUrl: './registro-usuarios.component.css'
})
export class RegistroUsuariosComponent implements AfterViewInit {
  usuarioService = inject(UsuarioService);
  usuarios?: Usuario[];

  // DataSource y paginador de Angular Material
  dataSource = new MatTableDataSource<Usuario>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  columnasAMostrar = [
    'Usuario',
    'Empleado',
    'TipoUsuario',
    'Estado',
    'FechaCreacion',
    'Acciones'
  ];

  constructor() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.obtenerTodos().subscribe(usuarios => {
      this.usuarios = usuarios;
      this.dataSource.data = usuarios;
      // Intentar conectar el paginador; si aún no existe, usar fallback
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      } else {
        // Si el paginador aparece después de la carga, conectarlo con un pequeño retraso
        setTimeout(() => {
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
        }, 0);
      }
    }, error => {
      console.error('Error al cargar usuarios:', error);
    });
  }

  cambiarEstado(id: number, estadoActual: boolean) {
    const nuevoEstado = !estadoActual;
    this.usuarioService.cambiarEstado(id, nuevoEstado).subscribe(() => {
      this.cargarUsuarios();
    });
  }

  borrar(id: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuarioService.borrar(id).subscribe(() => {
        this.cargarUsuarios();
      }, error => {
        console.error('Error al borrar:', error);
      });
    }
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
