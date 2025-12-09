import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioCreacion } from '../../../../../../core/domain/entities/usuario.models';
import { UsuarioService } from '../../../../../../core/data/repositories/usuario.service';
import { FormularioUsuarioComponent } from '../formulario-usuario/formulario-usuario.component';

@Component({
  selector: 'app-crear-usuario',
  imports: [FormularioUsuarioComponent],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent {
router = inject(Router);
  usuarioService = inject(UsuarioService);

  guardarCambios(usuario: UsuarioCreacion) {
    this.usuarioService.crear(usuario).subscribe(() => {
      this.router.navigate(["/registro-usuarios"]);
    }, error => {
      console.error('Error al crear usuario:', error);
      alert('Error: ' + error.error);
    });
  }
}
