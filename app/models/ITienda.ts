// models/ITienda.ts

interface IUsuario {
    idUsuario: number;
    nombre: string;
    apePat: string;
    apeMat: string | null;
    correo: string;
    pwd: string;
    rol: {
      idRol: number;
      nombre: string;
    };
    numTelefono: string;
    token: string | null;
  }
  
  interface IVendedor {
    idVendedor: number;
    usuario: IUsuario;
    razonSocial: string;
    rfc: string;
    imagenINE: string;
  }
  
  export interface ITienda {
    idTienda: number;
    nombre: string;
    descripcion: string;
    latitud: number;
    urlImagenLogo: string;
    longitud: number;
    vendedor: IVendedor;
    direccion: string | null;
  }
  
  export default ITienda;
  