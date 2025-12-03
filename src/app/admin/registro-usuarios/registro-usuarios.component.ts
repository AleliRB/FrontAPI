import { Component, inject } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from '../../usuario.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro-usuarios',
  imports: [RouterLink, MatTableModule, CommonModule],
  templateUrl: './registro-usuarios.component.html',
  styleUrl: './registro-usuarios.component.css'
})
export class RegistroUsuariosComponent {
usuarioService = inject(UsuarioService);
  usuarios?: Usuario[];
  
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
      console.log('Usuarios cargados:', usuarios);
      this.usuarios = usuarios;
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
}