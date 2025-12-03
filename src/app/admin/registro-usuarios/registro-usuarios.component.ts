import { Component, inject } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from '../../usuario.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoadingComponent } from "../../compartidos/componentes/loading/loading.component";

@Component({
  selector: 'app-registro-usuarios',
  imports: [RouterLink, MatTableModule, CommonModule, SweetAlert2Module, LoadingComponent],
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
      this.usuarioService.borrar(id).subscribe(() => {
        Swal.fire("Exitoso", "El registro ha sido borrado exitosamente ", 'success')
        this.cargarUsuarios();
      });
    }
  }

