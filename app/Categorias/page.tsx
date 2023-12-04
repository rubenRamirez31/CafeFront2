"use client"
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import ProductosCard from '../components/ProductosCard';
import { IProducto } from '../models/IProducto';

const Categorias = () => {
  const { data: session, status } = useSession();
  const [productos, setProductos] = useState<IProducto[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('');
  const [busqueda, setBusqueda] = useState<string>('');

  useEffect(() => {
    if (session?.user.token) {
      fetch('http://localhost:8080/Productos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          
        },
      })
        .then((response) => response.json())
        .then((json) => setProductos(json))
        .catch((error) => console.error('Error fetching products:', error));
    }
  }, [session]);

  const handleCategoriaChange = (categoria: string) => {
    setCategoriaSeleccionada(categoria);
  };

  const handleBusquedaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value);
  };

  const productosFiltrados = productos.filter(
    (producto) =>
      (categoriaSeleccionada === '' || producto.categoria?.nombre === categoriaSeleccionada) &&
      (busqueda === '' ||
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        (producto.categoria?.nombre &&
          producto.categoria.nombre.toLowerCase().includes(busqueda.toLowerCase()))
      )
  );

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Buscar categoría"
          value={busqueda}
          onChange={handleBusquedaChange}
        />
      </div>

      <div>
        <button onClick={() => handleCategoriaChange('Café en grano')}>Café en grano</button>
        <button onClick={() => handleCategoriaChange('Accesorios')}>Accesorios</button>
        {/* Agrega más botones según tus categorías */}
      </div>

      <div className="row">
        {productosFiltrados.map((producto) => (
          <ProductosCard key={producto.idProducto} producto={producto} />
        ))}
      </div>
    </>
  );
};

export default Categorias;
