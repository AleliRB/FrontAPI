import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpleadoService } from '../../../../../../core/data/repositories/empleado.service';
import { Usuario, UsuarioCreacion } from '../../../../../../core/domain/entities/usuario.models';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-formulario-usuario',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './formulario-usuario.component.html',
  styleUrl: './formulario-usuario.component.css'
})
export class FormularioUsuarioComponent implements OnInit{
  private readonly formBuilder = inject(FormBuilder);
  empleadoService = inject(EmpleadoService);

  @Input({ required: true })
  titulo!: string;

  @Input()
  modelo?: Usuario;

  @Output()
  posteoFormulario = new EventEmitter<UsuarioCreacion>();

  empleadosSinUsuario: any[] = [];
  mostrarPassword = false;

  ngOnInit(): void {
    this.empleadoService.obtenerTodos().subscribe(empleados => {
      this.empleadosSinUsuario = empleados.filter(e => !e.tieneUsuario);
    });

    if (this.modelo !== undefined) {
      this.form.patchValue({
        nombre: this.modelo.nombre,
        contrasenaHash: '',
        tipoUsuario: this.modelo.tipoUsuario,
        idEmp: this.modelo.idEmp
      });
    }
  }

  form = this.formBuilder.group({
    nombre: ['',{validators: [Validators.required]}],
    contrasenaHash: ['', {validators: [Validators.required]}],
    tipoUsuario: ['Administrador', {validators: [Validators.required]}],
    idEmp: [0, {validators: [Validators.required]}]
  });

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  guardarCambios() {
    if (this.form.valid) {
      let usuario = this.form.value as UsuarioCreacion;
      this.posteoFormulario.emit(usuario);
    } else {
      alert('Por favor complete todos los campos');
    }
  }
}
