export interface UsuarioCreacion {
  nombre: string;
  contrasenaHash: string;
  tipoUsuario: string;
  idEmp: number;
}

export interface Usuario {
  idUser: number;
  nombre: string;
  tipoUsuario: string;
  estadoUser: boolean;
  fechaCreacion: Date;
  ultimoAcceso?: Date;
  idEmp: number;
  empleadoNombre: string;
}