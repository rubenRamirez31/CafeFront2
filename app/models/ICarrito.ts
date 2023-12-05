// ICarrito.ts
export interface ICarrito {
    idCarrito: number;
    idUsuario: number; 
    total: number; // ya se hace con el arrglo
    idProductoCarrito: number;
    usuario: IUsuario;
    productoCarrito: IProductoCarrito;//arreglo 
  }
  
  export interface IUsuario {
    idUsuario: number;
    nombre: string;
    apePat: string;
    apeMat: string | null;
    correo: string;
    rol: IRol;
    numTelefono: string;
  }
  
  export interface IRol {
    idRol: number;
    nombre: string;
  }
  
  export interface IProductoCarrito {
    idProductoCarrito: number;
    cantidad: number;
    idProducto: number;
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
  