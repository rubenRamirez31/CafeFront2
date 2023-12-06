"use client"
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import ProductosCard from '../components/ProductosCard';
import { IStockProducto } from '../models/IStockProducto'; // Importa el modelo IStockProducto
const Categorias = () => {
  const { data: session, status } = useSession();
  const [stockProductos, setStockProductos] = useState<IStockProducto[]>([]); // Cambia el estado y el tipo a IStockProducto
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('');
  const [busqueda, setBusqueda] = useState<string>('');

  useEffect(() => {
    if (session?.user.token) {
      fetch('http://localhost:8080/stock-productos', { // Cambia la URL
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((json) => setStockProductos(json))
        .catch((error) => console.error('Error fetching stock products:', error));
    }
  }, [session]);

  const handleCategoriaChange = (categoria: string) => {
    setCategoriaSeleccionada(categoria);
  };

  const handleBusquedaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value);
  };

  const productosFiltrados = stockProductos.filter( // Cambia 'productos' a 'stockProductos'
    (stockProducto) =>
      (categoriaSeleccionada === '' || stockProducto.producto.categoria?.nombre === categoriaSeleccionada) &&
      (busqueda === '' ||
        stockProducto.producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        (stockProducto.producto.categoria?.nombre &&
          stockProducto.producto.categoria.nombre.toLowerCase().includes(busqueda.toLowerCase()))
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
        {productosFiltrados.map((stockProducto) => (
          <ProductosCard key={stockProducto.idStockProducto} stockProducto={stockProducto} />
        ))}
      </div>
    </>
  );
};

export default Categorias;