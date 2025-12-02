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
import { CrearProveedorComponent } from './almacen/formulario/crear-proveedor/crear-proveedor.component';
import { EditarProveedorComponent } from './almacen/formulario/editar-proveedor/editar-proveedor.component';
import { RegistroProductosComponent } from './almacen/registro-productos/registro-productos.component';
import { EditarProductoComponent } from './almacen/formulario/editar-producto/editar-producto.component';
import { CrearProductoComponent } from './almacen/formulario/crear-producto/crear-producto.component';
import { RegistroUsuariosComponent } from './admin/registro-usuarios/registro-usuarios.component';
import { CrearUsuarioComponent } from './admin/formulario/crear-usuario/crear-usuario.component';
import { RegistroSalidaComponent } from './almacen/registro-salida/registro-salida.component';
import { CrearSalidaComponent } from './almacen/formulario/crear-salida/crear-salida.component';
import { EditarSalidaComponent } from './almacen/formulario/editar-salida/editar-salida.component';


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
