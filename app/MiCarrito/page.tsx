"use client"
// CarritoPage.tsx
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { IStockProducto } from "../models/IStockProducto";
import { ICarritoProducto } from "../models/ICarritoProducto";
import styles from "../styles.module.css";
import Swal from 'sweetalert2';


const CarritoPage = () => {
  const { data: session, status } = useSession();
  const [carritoProductos, setCarritoProductos] = useState<ICarritoProducto[]>([]);
  const [ordenCreada, setOrdenCreada] = useState(false);

  useEffect(() => {
    if (session?.user.token) {
      fetch(`http://localhost:8080/carrito-productos/usuario/${session.user.idUsuario}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.token}`,
        },
      })
        .then(response => response.json())
        .then(json => setCarritoProductos(json))
        .catch(error => console.error('Error fetching carrito productos:', error));
    }
  }, [session]);

  const agruparProductosPorNombre = () => {
    const productosAgrupados: { [key: string]: { cantidad: number; idProducto: number; idCarritoProducto: number; presio: number } } = {};

    carritoProductos.forEach((producto) => {
      const nombreProducto = producto.producto.nombre;
      if (productosAgrupados[nombreProducto]) {
        productosAgrupados[nombreProducto].cantidad += 1;
        productosAgrupados[nombreProducto].presio += producto.producto.precio;
      } else {
        productosAgrupados[nombreProducto] = {
          cantidad: 1,
          idProducto: producto.producto.idProducto,
          idCarritoProducto: producto.idCarritoProducto,
          presio: producto.producto.precio
        };
      }
    });

    return Object.keys(productosAgrupados).map((nombre) => ({
      nombre,
      cantidad: productosAgrupados[nombre].cantidad,
      idProducto: productosAgrupados[nombre].idProducto,
      idCarritoProducto: productosAgrupados[nombre].idCarritoProducto,
      presio: productosAgrupados[nombre].presio,
    }));
  };

  const agregarProducto = async (idProducto: number) => {

    //const listaCarritos = await carritoResponse.json();
    // const carritoActual = listaCarritos[0];

    // Preparar la solicitud para agregar al carrito
    const carritoProductoData = {
      carrito: {
        idCarrito: 1,
      },
      producto: {
        idProducto: idProducto,
      },
    };
    try {
      if (!session?.user?.token) {
        console.error('Token de sesión no disponible');
        return;
      }

      // Realiza una solicitud PUT al endpoint correspondiente para agregar más productos
      const response = await fetch('http://localhost:8080/carrito-productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.token}`,
        },
        body: JSON.stringify(carritoProductoData),
      });

      if (response.ok) {
        console.log('Productos agregados al carrito con éxito');
        window.location.reload();
      } else {
        console.error('Error al agregar productos al carrito:', response.statusText);
      }
    } catch (error) {
      console.error('Error al agregar productos al carrito:', error);
    }
  };

  const quitarProducto = async (idCarritoProducto: number) => {

    //const listaCarritos = await carritoResponse.json();
    // const carritoActual = listaCarritos[0];

    try {
      if (!session?.user?.token) {
        console.error('Token de sesión no disponible');
        return;
      }

      // Realiza una solicitud DELETE al endpoint correspondiente para quitar productos
      const response = await fetch(`http://localhost:8080/carrito-productos/${idCarritoProducto}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.token}`,
        },
      });

      if (response.ok) {
        console.log('Producto quitado del carrito con éxito');
        window.location.reload();
      } else {
        console.error('Error al quitar producto del carrito:', idCarritoProducto);
      }
    } catch (error) {
      console.error('Error al quitar producto del carrito:', error);
    }
  };

  const calcularTotales = () => {
    const totalProductos = carritoProductos.reduce((total, producto) => total + 1, 0);
    const totalCompra = agruparProductosPorNombre().reduce((total, producto) => total + producto.presio, 0);

    // Limitar ambos totales a 2 decimales
    const totalProductosFormateado = parseFloat(totalProductos.toFixed(2));
    const totalCompraFormateado = parseFloat(totalCompra.toFixed(2));

    return {
      totalProductosFormateado,
      totalCompraFormateado,
    };
  };

  const crearOrden = async () => {
    try {
      if (!session?.user?.token) {
        console.error('Token de sesión no disponible');
        return;
      }

      // Aquí puedes implementar la lógica para crear la orden.
      // Por ejemplo, podrías enviar una solicitud POST al servidor.
      // Asegúrate de manejar las respuestas y errores adecuadamente.

      const response = await fetch('http://localhost:8080/ordenes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.token}`,
        },
        // Puedes enviar datos adicionales si es necesario.
        // body: JSON.stringify(tusDatos),
      });

      if (response.ok) {
        setOrdenCreada(true);
        Swal.fire({
          title: "¡Orden Creada!",
          text: "Tu orden se ha creado con éxito",
          icon: "success",
        });
        // Puedes realizar acciones adicionales después de crear la orden.
      } else {
        console.error('Error al crear la orden:', response.statusText);
        // Puedes manejar errores y mostrar un mensaje adecuado.
        Swal.fire({
          title: "Error",
          text: "Hubo un error al crear la orden",
          icon: "error",
        });
      }
    } catch (error) {
      console.error('Error al crear la orden:', error);
      // Puedes manejar errores y mostrar un mensaje adecuado.
      Swal.fire({
        title: "Error",
        text: "Hubo un error al crear la orden",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <h1>Mi Carrito</h1>
      <table className={styles.carritoTable}>
        <thead>
          <tr>
            <th>Producto</th>
            <th></th>
            <th>Cantidad</th>
            <th></th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {agruparProductosPorNombre().map(({ nombre, cantidad, idProducto, idCarritoProducto, presio }) => (
            <tr key={nombre}>
              <td>{nombre}</td>
              <td  className={styles.buttonCell}>
                <button onClick={() => quitarProducto(idCarritoProducto)}>-</button>
              </td>
              <td>{cantidad}</td>
              <td  className={styles.buttonCell}>
                <button onClick={() => agregarProducto(idProducto)}>+</button>
              </td>
              <td>${presio}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className={styles.totalLabel}>
              Total de Productos:
            </td>
            <td>{calcularTotales().totalProductosFormateado}</td>
          </tr>
          <tr>
            <td className={styles.totalLabel}>
              Total de Compra:
            </td>
            <td>${calcularTotales().totalCompraFormateado}</td>
          </tr>
        </tfoot>
      </table>
      <button className={styles.crearOrdenButton} onClick={crearOrden}>
                Crear Orden
              </button>
    </div>
  );
};

export default CarritoPage;
