import { Routes } from '@angular/router';
import { RegistroAdminComponent } from './admin/registro-admin/registro-admin.component';
import { MenuComponent } from './menu/menu.component';
import { InicioComponent } from './admin/inicio/inicio.component';
import { RegistroEmpleadosComponent } from './admin/registro-empleados/registro-empleados.component';
import { CrearEmpleadoComponent } from './admin/formulario/crear-empleado/crear-empleado.component';


export const routes: Routes = [
    {
        
        path:'registro-admin', component:RegistroAdminComponent
    },
    {
        path:'', component:InicioComponent
    },
   
    {
        path:'crear-admin', component:CrearEmpleadoComponent
    },
    {
        path:'registro-empleados', component:RegistroEmpleadosComponent
    }
    
];
