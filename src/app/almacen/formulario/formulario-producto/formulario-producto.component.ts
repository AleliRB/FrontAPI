import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Producto, ProductoCreacion } from '../../../models/producto.models';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../../models/categoria.models';
import { MatSelectModule } from '@angular/material/select';

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
  categorias: Categoria[] = [];


  @Output()
  posteoFormulario = new EventEmitter<ProductoCreacion>();

  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    nombre: ['', Validators.required],
    ubicacion: [''],
    descripcion: [''],
    idCat: [null],
    stockTotal: [0, Validators.required],
    stockActual: [0, Validators.required],
    idCategoria: [0, Validators.required],
    idProveedor: [0, Validators.required]
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
