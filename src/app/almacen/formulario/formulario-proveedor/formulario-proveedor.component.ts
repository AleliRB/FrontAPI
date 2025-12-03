import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Proveedor, ProveedorCreacion } from '../../../models/proveedor.models';

@Component({
  selector: 'app-formulario-proveedor',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './formulario-proveedor.component.html',
  styleUrl: './formulario-proveedor.component.css'
})
export class FormularioProveedorComponent {
 private readonly formBuilder = inject(FormBuilder);

  @Input({ required: true })
  titulo!: string;

  @Input()
  modelo?: Proveedor;

  @Output()
  posteoFormulario = new EventEmitter<ProveedorCreacion>();

  ngOnInit(): void {
    if (this.modelo !== undefined) {
      this.form.patchValue({
        razonSocial: this.modelo.razonSocial,
        direccion: this.modelo.direccion,
        telefono: this.modelo.telefono,
        email: this.modelo.email,
        estado: this.modelo.estado
      });
    }
  }

  form = this.formBuilder.group({
    razonSocial: ['',{validators: [Validators.required]}],
    direccion: ['',{validators: [Validators.required]}],
    telefono: [0,{validators: [Validators.required]}],
    email: ['',{validators: [Validators.required]}],
    estado: ['Activo']
  });

  guardarCambios() {
    let proveedor = this.form.value as ProveedorCreacion;
    this.posteoFormulario.emit(proveedor);
  }
}
