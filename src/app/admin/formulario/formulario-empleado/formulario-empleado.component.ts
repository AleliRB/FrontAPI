import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmpleadoService } from '../../../empleado.service';
import { Empleado, EmpleadoCreacion } from '../../../models/empleado.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-empleado',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './formulario-empleado.component.html',
  styleUrl: './formulario-empleado.component.css'
})
export class FormularioEmpleadoComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  empleadoService = inject(EmpleadoService);
  
  @Input({ required: true })
  titulo!: string;

  @Input()
  modelo?: Empleado;

  @Output()
  posteoFormulario = new EventEmitter<EmpleadoCreacion>();

  tiposEmpleado = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Secretario' },
    { id: 3, nombre: 'Almacenero' },
    { id: 4, nombre: 'Vendedor' }
  ];

  form = this.formBuilder.group({
    nombre: [''],
    apellido: [''],
    dni: [0],
    telefono: [0],
    email: [''],
    direccion: [''],
    idTipEmp: [1]
  });

  ngOnInit(): void {
    if (this.modelo !== undefined) {
      this.form.patchValue({
        nombre: this.modelo.nombre,
        apellido: this.modelo.apellido,
        dni: this.modelo.dni,
        telefono: this.modelo.telefono,
        email: this.modelo.email,
        direccion: this.modelo.direccion,
        idTipEmp: this.modelo.idTipEmp // ← Ahora sí funciona
      });
    }
  }

  guardarCambios() {
    const empleado = this.form.value as EmpleadoCreacion;
    this.posteoFormulario.emit(empleado);
  }
}