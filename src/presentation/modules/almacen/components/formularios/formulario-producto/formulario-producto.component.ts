import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Producto, ProductoCreacion } from '../../../../../../core/domain/entities/producto.models';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../../../../../core/domain/entities/categoria.models';
import { MatSelectModule } from '@angular/material/select';
import { Proveedor } from '../../../../../../core/domain/entities/proveedor.models';

@Component({
  selector: 'app-formulario-producto',
  imports: [ReactiveFormsModule, RouterLink, CommonModule,MatSelectModule],
  templateUrl: './formulario-producto.component.html',
  styleUrl: './formulario-producto.component.css'
})
export class FormularioProductoComponent implements OnInit {

  @Input({ required: true })
  titulo!: string;

  @Input()
  modelo?: Producto;
  
  @Input()
  proveedores: Proveedor[] = [];

  @Input()
  categorias: Categoria[] = [];


  @Output()
  posteoFormulario = new EventEmitter<ProductoCreacion>();


  obtenerErrorCampo(campoNombre: string): string {
  const campo = this.form.get(campoNombre);

  if (!campo) return "";

  if (campo.hasError('required')) {
    return `El campo ${campoNombre} es requerido`;
  }

  if (campo.hasError('pattern')) {
    if (campoNombre === 'stockTotal') return "El Total debe ser mayor que 0 y mayor que el Stock Actual";
  }

  return "";
}

mostrarErrorCampo(campoNombre: string): boolean {
  const campo = this.form.get(campoNombre);
  return campo ? campo.invalid && campo.touched : false;
}

  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    nombre: ['', {validators: [Validators.required]}],
    ubicacion: ['',{validators: [Validators.required]}],
    descripcion: ['',{validators: [Validators.required]}],
    idCat: [null],
    stockTotal: [0, {validators: [Validators.required]}],
    stockActual: [0, {validators: [Validators.required]}],
    idCategoria: [0, {validators: [Validators.required]}],
   idProveedor: [null as number | null, {validators: [Validators.required]}],

    
  });
  

  ngOnInit(): void {
    if (this.modelo) {
      this.form.patchValue({
        nombre: this.modelo.nombre,
        ubicacion: this.modelo.ubicacion,
        descripcion: this.modelo.descripcion,
        stockTotal: this.modelo.stockTotal,
        stockActual: this.modelo.stockActual,
        idCategoria: this.modelo.idCategoria,
        idProveedor: this.modelo.idProveedor
      });
    }
  }

  guardarCambios() {
    if (this.form.invalid) return;

    const producto = this.form.value as ProductoCreacion;
    this.posteoFormulario.emit(producto);
  }
}

