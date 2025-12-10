import { Routes } from '@angular/router';

import { MenuComponent } from '../../../presentation/layouts/menu.component';
import { InicioComponent } from '../../../presentation/modules/admin/pages/inicio/inicio.component';
import { RegistroEmpleadosComponent } from '../../../presentation/modules/admin/pages/registro-empleados/registro-empleados.component';
import { CrearEmpleadoComponent } from '../../../presentation/modules/admin/components/formularios/crear-empleado/crear-empleado.component';
import { EditarEmpleadoComponent } from '../../../presentation/modules/admin/components/formularios/editar-empleado/editar-empleado.component';
import { RegistroCategoriasComponent } from '../../../presentation/modules/admin/pages/registro-categorias/registro-categorias.component';
import { CrearCategoriaComponent } from '../../../presentation/modules/admin/components/formularios/crear-categoria/crear-categoria.component';
import { EditarCategoriaComponent } from '../../../presentation/modules/admin/components/formularios/editar-categoria/editar-categoria.component';
import { RegistroProveedorComponent } from '../../../presentation/modules/almacen/pages/registro-proveedor/registro-proveedor.component';
import { CrearProveedorComponent } from '../../../presentation/modules/almacen/components/formularios/crear-proveedor/crear-proveedor.component';
import { EditarProveedorComponent } from '../../../presentation/modules/almacen/components/formularios/editar-proveedor/editar-proveedor.component';
import { RegistroProductosComponent } from '../../../presentation/modules/almacen/pages/registro-productos/registro-productos.component';
import { EditarProductoComponent } from '../../../presentation/modules/almacen/components/formularios/editar-producto/editar-producto.component';
import { CrearProductoComponent } from '../../../presentation/modules/almacen/components/formularios/crear-producto/crear-producto.component';
import { RegistroUsuariosComponent } from '../../../presentation/modules/admin/pages/registro-usuarios/registro-usuarios.component';
import { CrearUsuarioComponent } from '../../../presentation/modules/admin/components/formularios/crear-usuario/crear-usuario.component';
import { RegistroSalidaComponent } from '../../../presentation/modules/almacen/pages/registro-salida/registro-salida.component';
import { CrearSalidaComponent } from '../../../presentation/modules/almacen/components/formularios/crear-salida/crear-salida.component';
import { EditarSalidaComponent } from '../../../presentation/modules/almacen/components/formularios/editar-salida/editar-salida.component';


export const routes: Routes = [
    
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
    path:'crear-proveedor', component:CrearProveedorComponent
   },
   {
    path:'proveedores/editar/:id', component:EditarProveedorComponent   
   },
   {
    path:'registro-productos', component:RegistroProductosComponent
   },
   {
    path:'productos/editar/:id', component:EditarProductoComponent
   },
    {
    path:'crear-producto', component:CrearProductoComponent
   },
   // USUARIOS
  { path: 'registro-usuarios', component: RegistroUsuariosComponent },
  { path: 'crear-usuario', component: CrearUsuarioComponent },
  // SALIDAS
  { path: 'registro-salidas', component: RegistroSalidaComponent },
  { path: 'crear-salida', component: CrearSalidaComponent },
  { path: 'salidas/editar/:id', component: EditarSalidaComponent }
];
