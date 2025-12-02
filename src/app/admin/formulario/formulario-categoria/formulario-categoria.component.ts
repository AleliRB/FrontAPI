import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Categoria, CategoriaCreacion } from '../../../models/categoria.models';

@Component({
  selector: 'app-formulario-categoria',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
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

  form = this.formBuilder.group({
    descripcion: ['']
  });

  guardarCambios() {
    let categoria = this.form.value as CategoriaCreacion;
    this.posteoFormulario.emit(categoria);
  }
}