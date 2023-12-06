// models/ICarritoProducto.ts
export interface ICarritoProducto {
    idCarritoProducto: number;
    carrito: {
      idCarrito: number;
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
    };
    producto: {
      idProducto: number;
      nombre: string;
      precio: number;
      peso: number;
      descripcion: string;
      categoria: {
        idCategoria: number;
        nombre: string;
      };
    };
  }
  