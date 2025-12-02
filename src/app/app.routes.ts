import { Routes } from '@angular/router';
import { RegistroAdminComponent } from './admin/registro-admin/registro-admin.component';
import { MenuComponent } from './menu/menu.component';
import { InicioComponent } from './admin/inicio/inicio.component';
import { RegistroEmpleadosComponent } from './admin/registro-empleados/registro-empleados.component';
import { CrearEmpleadoComponent } from './admin/formulario/crear-empleado/crear-empleado.component';

import { EditarEmpleadoComponent } from './admin/formulario/editar-empleado/editar-empleado.component';
import { RegistroCategoriasComponent } from './admin/registro-categorias/registro-categorias.component';
import { CrearCategoriaComponent } from './admin/formulario/crear-categoria/crear-categoria.component';
import { EditarCategoriaComponent } from './admin/formulario/editar-categoria/editar-categoria.component';
import { RegistroProveedorComponent } from './almacen/registro-proveedor/registro-proveedor.component';


export const routes: Routes = [
    {
        
        path:'registro-admin', component:RegistroAdminComponent
    },
    {
        path:'', component:InicioComponent
    },
   
    {
        path:'crear-empleado', component:CrearEmpleadoComponent
    },
    {
        path:'registro-empleados', component:RegistroEmpleadosComponent
    },
    {
        path:'registro-empleados/editar/:id', component:EditarEmpleadoComponent
    },
    {
        path:'registro-categorias', component:RegistroCategoriasComponent
    },
    {
        path:'crear-categoria', component:CrearCategoriaComponent
    },
   {
    path:'categorias/editar/:id', component:EditarCategoriaComponent
   },
   {
    path:'registro-proveedores', component:RegistroProveedorComponent
   },
   {
    path:'crear-proveedor', 
   }
];
