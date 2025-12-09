import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Proveedor, ProveedorCreacion } from '../../../models/proveedor.models';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-formulario-proveedor',
  imports: [ReactiveFormsModule, RouterLink, CommonModule,MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './formulario-proveedor.component.html',
  styleUrl: './formulario-proveedor.component.css'
})
export class FormularioProveedorComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);

  @Input({ required: true })
  titulo!: string;

  @Input()
  productos: any[] = [];

  @Input()
  modelo?: Proveedor;

  @Output()
  posteoFormulario = new EventEmitter<ProveedorCreacion>();

  // Array para manejar productos seleccionados
  productosSeleccionados: number[] = [];

  form = this.formBuilder.group({
    razonSocial: ['', { validators: [Validators.required] }],
    direccion: ['', { validators: [Validators.required] }],
    telefono: [0, { validators: [Validators.required] }],
    email: ['', { validators: [Validators.required, Validators.email] }],
    estado: ['Activo']
  });

  ngOnInit(): void {
    if (this.modelo !== undefined) {
      this.form.patchValue({
        razonSocial: this.modelo.razonSocial,
        direccion: this.modelo.direccion,
        telefono: this.modelo.telefono,
        email: this.modelo.email,
        estado: this.modelo.estado
      });
      
      // Cargar productos seleccionados si existen
      if (this.modelo.productos) {
        this.productosSeleccionados = [...this.modelo.productos];
      }
    }
  }

  // Verificar si un producto está seleccionado
  isProductoSeleccionado(productoId: number): boolean {
    return this.productosSeleccionados.includes(productoId);
  }

  // Toggle de selección de producto
  toggleProducto(productoId: number, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    
    if (checkbox.checked) {
      // Agregar si no existe
      if (!this.productosSeleccionados.includes(productoId)) {
        this.productosSeleccionados.push(productoId);
      }
    } else {
      // Remover si existe
      const index = this.productosSeleccionados.indexOf(productoId);
      if (index > -1) {
        this.productosSeleccionados.splice(index, 1);
      }
    }
    
    console.log('Productos seleccionados:', this.productosSeleccionados);
  }

  guardarCambios() {
    if (this.form.invalid) {
      console.error('Formulario inválido');
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control?.invalid) {
          console.error(`Campo ${key} es inválido:`, control.errors);
        }
      });
      return;
    }

    const proveedor: ProveedorCreacion = {
      razonSocial: this.form.value.razonSocial!,
      direccion: this.form.value.direccion!,
      telefono: this.form.value.telefono!,
      email: this.form.value.email!,
      estado: this.form.value.estado!,
      productos: this.productosSeleccionados
    };

    console.log('Proveedor a enviar:', proveedor);
    this.posteoFormulario.emit(proveedor);
  }
}