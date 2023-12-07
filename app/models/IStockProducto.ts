// models/IStockProducto.ts

interface IProducto {
  idProducto: number;
  nombre: string;
  precio: number;
  peso: number;
  descripcion: string;
  categoria: {
    idCategoria: number;
    nombre: string;
  };
}

interface ITienda {
  idTienda: number;
  nombre: string;
  descripcion: string;
  latitud: number;
  urlImagenLogo: string;
  longitud: number;
  vendedor: {
    idVendedor: number;
    usuario: {
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
    };
    razonSocial: string;
    rfc: string;
    imagenINE: string;
  };
  direccion: string | null;
}

export interface IStockProducto {
  idStockProducto: number;
  producto: IProducto;
  stock: number;
  tienda: ITienda;
}

export default IStockProducto;
