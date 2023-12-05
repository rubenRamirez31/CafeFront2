// models/IProductoCarrito.ts
export interface IProductoCarrito {
  idProductoCarrito: number;
  cantidad: number;
  producto: IProducto;
  carrito: ICarrito;
}

export interface IProducto {
  idProducto: number;
  nombre: string;
  precio: number;
  peso: number;
  descripcion: string;
  categoria: ICategoria;
}

export interface ICategoria {
  idCategoria: number;
  nombre: string;
}

export interface ICarrito {
  idCarrito: number;
  usuario: IUsuario;
  total: number;
}

export interface IUsuario {
  idUsuario: number;
  nombre: string;
  apePat: string;
  apeMat: string | null;
  correo: string;
  pwd: string;
  rol: IRol;
  numTelefono: string;
}

export interface IRol {
  idRol: number;
  nombre: string;
}
