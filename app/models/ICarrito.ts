// models/ICarrito.ts
export interface ICarrito {
  idCarrito: number;
  idUsuario: number;
  productos: IProductoCarrito[];
}

export interface IProductoCarrito {
  idProductoCarrito: number;
  cantidad: number;
  producto: IProducto;
}

export interface IProducto {
  idProducto: number;
  nombre: string;
  precio: number;
  peso: number;
  descripcion: string;
  categoria: ICategoria | null;
}

export interface ICategoria {
  idCategoria: number;
  nombre: string;
}
