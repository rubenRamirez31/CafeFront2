"use client"
import Link from "next/link";
import { IProducto } from "../../models/IProducto";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

const ProductosPage = () => {
  const { data: session, status } = useSession();
  const [productos, setProductos] = useState<IProducto[]>([]);

  useEffect(() => {
    if (session?.user.token) {
      fetch('http://localhost:8080/Productos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.token}`,
        },
      })
        .then(response => response.json())
        .then(json => setProductos(json))
        .catch(error => console.error('Error fetching products:', error));
    }
  }, [session]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <>
      <p className="mt-4">
        <Link href="/Productos/Agregar" className='btn btn-success me-4'>Agregar nuevo</Link>
        <button onClick={() => signOut()} className="btn btn-danger">Cerrar Sesión</button>
      </p>

      <div className="card-container mt-3">
        {productos.map((producto: IProducto) => (
          <div className="card" style={{ width: '18rem' }} key={producto.idProducto}>
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
        ))}
      </div>
    </>
  );
}

export default ProductosPage

