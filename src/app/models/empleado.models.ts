export interface EmpleadoCreacion{
    nombre: string;
    apellido:string;
    dni:string;
    telefono:string;
    email:string;
    direccion:string;
}
export interface Empleado extends EmpleadoCreacion {
    idEmp: number;  // Solo agrega el ID adicional
}