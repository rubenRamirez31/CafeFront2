// components/ProductosCard.js
import Link from "next/link";
import { IProducto } from "../models/IProducto";

const ProductosCard = ({ producto }: { producto: IProducto }) => {
  return (
    <div className="col-md-4 mb-4"> {/* Utiliza una clase de columna Bootstrap para especificar el ancho de la carta */}
      <div className="card" style={{ width: '18rem' }}>
        {/* <img src={producto.imagenUrl} className="card-img-top" alt={producto.nombre} /> */}
        <div className="card-body">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text">{producto.descripcion}</p>
          <p className="card-text">Precio: {producto.precio}</p>
          <p className="card-text">Peso: {producto.peso}</p>
          <p className="card-text">Categoría: {producto.categoria?.nombre}</p>
          <Link href={`/Productos/Actualizar/${producto.idProducto}`} className="btn btn-warning">Agregar al carrito</Link>
        </div>
      </div>
    </div>
  );
}

export default ProductosCard;
