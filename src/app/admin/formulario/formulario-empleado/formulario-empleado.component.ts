import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmpleadoService } from '../../../empleado.service';
import { Empleado, EmpleadoCreacion } from '../../../models/empleado.models';
import { CommonModule } from '@angular/common';
import { TipoEmpleadoService } from '../../../tipo-empleado.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-formulario-empleado',
  imports: [ReactiveFormsModule, RouterLink, CommonModule,MatFormFieldModule,
  MatInputModule],
  templateUrl: './formulario-empleado.component.html',
  styleUrl: './formulario-empleado.component.css'
})
export class FormularioEmpleadoComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  empleadoService = inject(EmpleadoService);
  tipoEmpleadoService = inject(TipoEmpleadoService);

  @Input({ required: true })
  titulo!: string;

  @Input()
  modelo?: Empleado;

  @Output()
  posteoFormulario = new EventEmitter<EmpleadoCreacion>();

  tiposEmpleado: any[] = [];

  ngOnInit(): void {
    // Cargar tipos de empleado desde la API
    this.tipoEmpleadoService.obtenerTodos().subscribe(tipos => {
      this.tiposEmpleado = tipos.map(t => ({
        id: t.idTipEmp,
        nombre: t.nombre
      }));
    });

    // Si hay un modelo (editar), cargar los datos
    if (this.modelo !== undefined) {
      this.form.patchValue({
        nombre: this.modelo.nombre,
        apellido: this.modelo.apellido,
        dni: this.modelo.dni,
        telefono: this.modelo.telefono,
        email: this.modelo.email,
        direccion: this.modelo.direccion,
        idTipEmp: this.modelo.idTipEmp
      });
    }
  }
obtenerErrorCampo(campoNombre: string): string {
  const campo = this.form.get(campoNombre);

  if (!campo) return "";

  if (campo.hasError('required')) {
    return `El campo ${campoNombre} es requerido`;
  }

  if (campo.hasError('pattern')) {
    if (campoNombre === 'dni') return "El DNI debe tener exactamente 8 dígitos";
    if (campoNombre === 'telefono') return "El teléfono debe tener 9 dígitos";
  }

  if (campo.hasError('email')) {
    return "Debe ingresar un correo electrónico válido";
  }

  return "";
}

mostrarErrorCampo(campoNombre: string): boolean {
  const campo = this.form.get(campoNombre);
  return campo ? campo.invalid && campo.touched : false;
}



  form = this.formBuilder.group({
    nombre: ['',{validators: [Validators.required]}],
    apellido: ['',{validators: [Validators.required]}],
    dni: [0,{validators: [Validators.required, Validators.pattern(/^\d{8}$/)]}],
    telefono: [0,{validators: [Validators.required, Validators.pattern(/^\d{9}$/)]}],
    email: ['',{validators: [Validators.required]}],
    direccion: ['',{validators: [Validators.required]}],
    idTipEmp: [1,{validators: [Validators.required]}]
  });

  guardarCambios() {
    let empleado = this.form.value as EmpleadoCreacion;
    this.posteoFormulario.emit(empleado);
  }
}