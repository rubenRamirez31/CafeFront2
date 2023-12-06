// pages/Tiendas/Ver/[idTienda].tsx
"use client"
// pages/Tiendas/Ver/[idTienda].tsx
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { IStockProducto } from '../../models/IStockProducto';
import { ICarrito } from "../../models/ICarrito";
import ProductosCard from '../../components/ProductosCard';
import styles from "../../styles.module.css";

const TiendaVerPage = () => {
  const { data: session, status } = useSession();
  const [carrito, setCarrito] = useState<ICarrito>({ idCarrito: 0, idUsuario: 0, productos: [] });
  const [productosTienda, setProductosTienda] = useState<IStockProducto[]>([]);
  const [busqueda, setBusqueda] = useState<string>('');

  useEffect(() => {
    if (session?.user.token) {
      const urlParams = new URLSearchParams(window.location.search);
      const idTiendaFromUrl = urlParams.get('idTienda');

      fetch(`http://localhost:8080/stock-productos/tienda/${idTiendaFromUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.token}`,
        },
      })
        .then(response => response.json())
        .then(json => setProductosTienda(json))
        .catch(error => console.error('Error fetching store products:', error));
    }
  }, [session]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  const agregarAlCarrito = async (idStockProducto: number) => {
    try {
      if (!session?.user?.token) {
        console.error('Token de sesión no disponible');
        return;
      }

      // Obtener el carrito actual del usuario
      const carritoResponse = await fetch(`http://localhost:8080/carritos/usuario/${session.user.idUsuario}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.token}`,
        },
      });

      if (!carritoResponse.ok) {
        console.error('Error al obtener el carrito del usuario:', carritoResponse.statusText);
        return;
      }

      const listaCarritos = await carritoResponse.json();
      const carritoActual = listaCarritos[0];

      // Preparar la solicitud para agregar al carrito
      const carritoProductoData = {
        carrito: {
          idCarrito: carritoActual.idCarrito,
        },
        producto: {
          idProducto: idStockProducto,
        },
      };

      const response = await fetch('http://localhost:8080/carrito-productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.token}`,
        },
        body: JSON.stringify(carritoProductoData),
      });

      if (response.ok) {
        console.log('Producto agregado al carrito con éxito');
        // Actualiza el estado de carrito en tu aplicación si es necesario
      } else {
        console.error('Error al agregar producto al carritoo:', carritoActual.idCarrito);
      }
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
    }
  };

  const handleBusquedaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value);
  };

  const productosFiltrados = productosTienda.filter(
    stockProducto =>
      stockProducto.producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section className={styles.Productos}>
      <div>
        <h1>Productos Disponibles</h1>
        <input
          type="text"
          placeholder="Buscar productos..."
          className={styles.searchInput}
          value={busqueda}
          onChange={handleBusquedaChange}
        />
        <button className={styles.searchButton}>Buscar</button>

        <div className={styles.scrollContainer}>
          <div className="row">
            {productosFiltrados.map((stockProducto: IStockProducto) => (
              <ProductosCard
                key={stockProducto.idStockProducto}
                stockProducto={stockProducto}
                agregarAlCarrito={() => agregarAlCarrito(stockProducto.producto.idProducto)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TiendaVerPage;
