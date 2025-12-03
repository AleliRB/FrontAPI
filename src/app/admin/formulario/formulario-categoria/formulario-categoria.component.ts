import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Categoria, CategoriaCreacion } from '../../../models/categoria.models';
import { MatError } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-formulario-categoria',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule,MatFormFieldModule,
  MatInputModule],
  templateUrl: './formulario-categoria.component.html',
  styleUrl: './formulario-categoria.component.css'
})
export class FormularioCategoriaComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);

  @Input({ required: true })
  titulo!: string;

  @Input()
  modelo?: Categoria;

  @Output()
  posteoFormulario = new EventEmitter<CategoriaCreacion>();

  ngOnInit(): void {
    if (this.modelo !== undefined) {
      this.form.patchValue({
        descripcion: this.modelo.descripcion
      });
    }
  }
//ESTO PARA VALIDAR
  form = this.formBuilder.group({
    descripcion: ['',{validators: [Validators.required]}]
  });

    obtenerErroresCampoDescripcion(): string{
      let nombre = this.form.controls.descripcion;
      if(nombre.hasError('required')){
        return "El campo nombre es requerido";
      }
      return "";
    }
  mostrarErrorDescripcion(): boolean {
    const campo = this.form.controls.descripcion;
    return campo.invalid && campo.touched;
  }

  guardarCambios() {
    let categoria = this.form.value as CategoriaCreacion;
    this.posteoFormulario.emit(categoria);
  }
}