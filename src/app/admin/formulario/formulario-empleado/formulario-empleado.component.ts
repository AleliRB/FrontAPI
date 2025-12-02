import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmpleadoService } from '../../../empleado.service';
import { Empleado, EmpleadoCreacion } from '../../../models/empleado.models';
import { CommonModule } from '@angular/common';
import { TipoEmpleadoService } from '../../../tipo-empleado.service';

@Component({
  selector: 'app-formulario-empleado',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
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

  form = this.formBuilder.group({
    nombre: [''],
    apellido: [''],
    dni: [0],
    telefono: [0],
    email: [''],
    direccion: [''],
    idTipEmp: [1]
  });

  guardarCambios() {
    let empleado = this.form.value as EmpleadoCreacion;
    this.posteoFormulario.emit(empleado);
  }
}