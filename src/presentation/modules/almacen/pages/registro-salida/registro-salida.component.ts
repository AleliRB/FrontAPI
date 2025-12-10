import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-salida',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registro-salida.component.html',
  styleUrls: ['./registro-salida.component.css']
})
export class RegistroSalidaComponent {
  
  currentYear = new Date().getFullYear();

  }




