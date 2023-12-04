export interface IUsuario {
    idUsuario?: number;
    nombre: string;
    apePat: string;
    apeMat: string;
    correo: string;
    pwd: string;  // Deberías agregar esta línea para referenciar la interfaz Categoria
    numTelefono: string;
    rol : Rol;
    token: string;
}

export interface Rol {
    idRol: number;
    nombre: string;
}