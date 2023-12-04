export interface IProducto {
    idProducto?: number;
    nombre: string;
    precio: number;
    peso: number;
    descripcion: string;
    categoria: Categoria;  // Deberías agregar esta línea para referenciar la interfaz Categoria
    idCategoria: number;
}

export interface Categoria {
    idCategoria: number;
    nombre: string;
}
