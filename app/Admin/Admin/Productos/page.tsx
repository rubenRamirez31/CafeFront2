'use client'
import Link from "next/link";
import { IProducto } from "../../models/IProducto";
import ProductosCard from "@/app/components/ProductosCard";
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

      <div className="row">
        {productos.map((producto: IProducto) => (
          <ProductosCard key={producto.idProducto} producto={producto} />
        ))}
      </div>
    </>
  );
}

export default ProductosPage