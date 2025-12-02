import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {  RouterLink } from '@angular/router';
import { EmpleadoService } from '../../../empleado.service';
import { Empleado, EmpleadoCreacion } from '../../../models/empleado.models';

@Component({
  selector: 'app-formulario-empleado',
   imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './formulario-empleado.component.html',
  styleUrl: './formulario-empleado.component.css'
})
export class FormularioEmpleadoComponent implements OnInit {
private readonly formBuilder =inject(FormBuilder);
empleadoService =inject(EmpleadoService);
@Input({required:true})
titulo!: string;

@Input()
modelo?:Empleado

@Output()
posteoFormulario=new EventEmitter<EmpleadoCreacion>();

ngOnInit(): void {
  if(this.modelo!==undefined){
    this.form.patchValue(this.modelo);
  }
}


form= this.formBuilder.group({
  nombre:[''],
  apellido:[''],
  dni:[''],
  telefono:[''],
  email:[''],
  direccion:['']
})
guardarCambios(){
  let empleado=this.form.value as EmpleadoCreacion;
  this.posteoFormulario.emit(empleado);
}
}
