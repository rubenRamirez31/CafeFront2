'use client'
// pages/Tiendas/Ver/[idTienda].tsx
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { IStockProducto } from '../../models/IStockProducto';
import { ICarrito } from "@/app/models/ICarrito";
import ProductosCard from '../../components/ProductosCard';
import { useRouter } from 'next/router';
import styles from "../../styles.module.css";
import { Session } from "next-auth";
const TiendaVerPage = () => {

  const { data: session, status } = useSession();

  const [carrito, setCarrito] = useState<ICarrito[]>([]);
  const [productosTienda, setProductosTienda] = useState<IStockProducto[]>([]);
  const [busqueda, setBusqueda] = useState<string>('');
  //const router = useRouter();

  ;
  //const { idTienda } = router.query;
  useEffect(() => {
    if (session?.user.token) {

      // const idTienda = router.query.idTienda; // Obtén el idTiend

      const urlParams = new URLSearchParams(window.location.search);
      const idTiendaFromUrl = urlParams.get('idTienda');
      // Obtener productos de la tienda
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

  const agregarAlCarrito = async (idStockProducto: IStockProducto) => {
    try {
      const carritoActivo = carrito ; // Asegúrate de que carritos esté disponible
      if (!session?.user?.token) {
        console.error('token de sesión no disponible');
        return;
      }
  
      const response = await fetch('http://localhost:8080/productos-carrito', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.token}`,
        },
        body: JSON.stringify({
          
          cantidad: 1,
          idProducto: idStockProducto.idStockProducto,
          carrito: null,
          idProductoCarrito: 1,
        }),
      });
  
      if (response.ok) {
        console.log('Producto agregado al carrito con éxito');
        // Actualiza el estado de carrito en tu aplicación
      } else {
        console.error('Error al agregar producto al carrito:', response.statusText);
      }
    } catch (error) {
      console.error('Error al agregar producto al carrito:');
    }
  };
  
  const handleBusquedaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value);
  };

  const productosFiltrados = productosTienda.filter(
    stockProducto =>
      stockProducto.producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );
  const seleccionarCarritoActivo = (carritos: ICarrito[] = []): ICarrito => {
    return carritos[1] || {} as ICarrito; // Si no hay carritos, se devuelve un objeto vacío como valor predeterminado
  };
  

  const carritoActivo: ICarrito = seleccionarCarritoActivo(carrito);

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
                agregarAlCarrito={() => agregarAlCarrito(stockProducto)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TiendaVerPage;