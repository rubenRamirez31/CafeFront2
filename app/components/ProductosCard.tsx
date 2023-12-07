// components/ProductosCard.js
import Link from "next/link";
import { IStockProducto } from "../models/IStockProducto";

const ProductosCard = ({ stockProducto, agregarAlCarrito }: { stockProducto: IStockProducto, agregarAlCarrito: (idStockProducto: number) => void }) => {
  const { producto, stock, tienda } = stockProducto;

  return (
    <div className="col-md-4 mb-4">
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body ">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text">{producto.descripcion}</p>
          <p className="card-text">Precio: {producto.precio}</p>
          <p className="card-text">Peso: {producto.peso}</p>
          <p className="card-text">Categoría: {producto.categoria?.nombre}</p>
          <p className="card-text">Stock disponible: {stock}</p>
          <p className="card-text">Tienda: {tienda.nombre}</p>

          {/* Botón para agregar al carrito */}
          <button onClick={() => agregarAlCarrito(stockProducto.idStockProducto)}>Agregar al Carrito</button>
        </div>
      </div>
    </div>
  );
}

export default ProductosCard;
