export interface EmpleadoCreacion {
    nombre: string;
    apellido: string;
    dni: number; // ← Cambiar a number
    telefono: number; // ← Cambiar a number
    email: string;
    direccion: string;
    idTipEmp: number;
}

export interface Empleado {
    idEmp: number;
    nombre: string;
    apellido: string;
    dni: number; // ← Cambiar a number
    telefono: number; // ← Cambiar a number
    email: string;
    direccion: string;
    tipoEmpleado: string;
    tieneUsuario: boolean;
    idTipEmp: number; // ← Agregar para editar
}