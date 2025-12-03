import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpleadoService } from '../../../empleado.service';
import { Salida, SalidaCreacion } from '../../../models/salida.models';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-formulario-salida',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './formulario-salida.component.html',
  styleUrl: './formulario-salida.component.css'
})
export class FormularioSalidaComponent implements OnInit{
private readonly formBuilder = inject(FormBuilder);
  empleadoService = inject(EmpleadoService);

  @Input({ required: true })
  titulo!: string;

  @Input()
  modelo?: Salida;

  @Output()
  posteoFormulario = new EventEmitter<SalidaCreacion>();

  empleados: any[] = [];

  ngOnInit(): void {
    // Cargar empleados
    this.empleadoService.obtenerTodos().subscribe(empleados => {
      this.empleados = empleados;
    });

    // Si hay modelo (editar), cargar los datos
    if (this.modelo !== undefined) {
      this.form.patchValue({
        destinoSalida: this.modelo.destinoSalida,
        fechaSalida: this.modelo.fechaSalida,
  
        idEmp: this.modelo.idEmp
      });
    }
  }

  form = this.formBuilder.group({
    destinoSalida: ['',{validators: [Validators.required]}],
    fechaSalida: [new Date()],
    idEmp: [0, {validators: [Validators.required]}]
  });

  guardarCambios() {
    let salida = this.form.value as SalidaCreacion;
    this.posteoFormulario.emit(salida);
  }
}
