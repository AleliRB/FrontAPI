import { Component, Input, numberAttribute } from '@angular/core';
import { transform } from 'typescript';

@Component({
  selector: 'app-editar-empleado',
  imports: [],
  templateUrl: './editar-empleado.component.html',
  styleUrl: './editar-empleado.component.css'
})
export class EditarEmpleadoComponent {
@Input({transform: numberAttribute})
id!: number
}
