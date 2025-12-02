import { Routes } from '@angular/router';
import { RegistroAdminComponent } from './admin/registro-admin/registro-admin.component';
import { MenuComponent } from './menu/menu.component';
import { InicioComponent } from './admin/inicio/inicio.component';
import { RegistroEmpleadosComponent } from './admin/registro-empleados/registro-empleados.component';
import { CrearEmpleadoComponent } from './admin/formulario/crear-empleado/crear-empleado.component';

import { EditarEmpleadoComponent } from './admin/formulario/editar-empleado/editar-empleado.component';


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
    }
    
];
