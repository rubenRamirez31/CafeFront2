// pages/Productos/Ver/[idProducto].tsx
"use client"
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { IStockProducto } from '../models/IStockProducto';
import { ICalificacion } from '../models/ICalificacion';
import styles from '../styles.module.css';
import Swal from 'sweetalert2';
// pages/StockProductos/Ver/[idStockProducto].tsx
const StockProductoVerPage = () => {
  const { data: session, status } = useSession();
  const [stockProducto, setStockProducto] = useState<IStockProducto | null>(null);
  const [calificaciones, setCalificaciones] = useState<ICalificacion[]>([]);


  useEffect(() => {
    if (session?.user.token) {
      const urlParams = new URLSearchParams(window.location.search);
      const idStockProductoFromUrl = urlParams.get('idStockProducto');

      // Obtener información del stock-producto  idStockProductoFromUrl
      fetch(`http://localhost:8080/stock-productos/61`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.token}`,
        },
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error fetching stock product');
          }
        })
        .then(json => setStockProducto(json))
        .catch(error => console.error('Error fetching stock product:', error));

      // Obtener calificaciones asociadas al producto ${stockProducto?.producto.idProducto}
      fetch(`http://localhost:8080/CalificacionProductos/producto/6`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.token}`,
        },
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error fetching product ratings');
          }
        })
        .then(json => setCalificaciones(json))
        .catch(error => console.error('Error fetching product ratings:', error));
    }
  }, [session, stockProducto]);


  
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
        Swal.fire({
          title: "¡Genial!",
          text: "Producto agregado al carrito",
          icon: "success",
      });
        console.log('Producto agregado al carrito con éxito', carritoActual.idCarrito);
        // Actualiza el estado de carrito en tu aplicación si es necesario
      } else {
        console.error('Error al agregar producto al carritoo:', carritoActual.idCarrito);
      }
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
    }
  };


  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!stockProducto) {
    return <p>Stock Producto no encontrado</p>;
  }

  return (
    <section className={styles.StockProductoDetalles}>
      <div className="card">
        <img src="" className="card-img-top" alt={stockProducto.producto.nombre} />
        <div className="card-body">
          <h5 className="card-title">{stockProducto.producto.nombre}</h5>
          <p className="card-text">{stockProducto.producto.descripcion}</p>
          <p className="card-text">Precio: ${stockProducto.producto.precio}</p>
          <button
            className="btn btn-primary"
            onClick={() => agregarAlCarrito(stockProducto.producto.idProducto)}
          >
            Agregar al Carrito
          </button>
        </div>
        <div className="card-footer">
          <h6>Calificaciones del Producto</h6>
          <ul>
            {calificaciones.map((calificacion: ICalificacion) => (
              <li key={calificacion.idCalificacionProducto}>            
                <p>Calificación: {calificacion.polaridad}</p>
                <p>Comentario: {calificacion.comentario}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default StockProductoVerPage;
