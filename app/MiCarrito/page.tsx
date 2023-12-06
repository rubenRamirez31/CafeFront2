"use client"
// CarritoPage.tsx
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { IStockProducto } from "../models/IStockProducto";
import { ICarritoProducto } from "../models/ICarritoProducto";

const CarritoPage = () => {
  const { data: session, status } = useSession();
  const [carritoProductos, setCarritoProductos] = useState<ICarritoProducto[]>([]);

  useEffect(() => {
    if (session?.user.token) {
      fetch(`http://localhost:8080/carrito-productos/carrito/1`, {
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
    const productosAgrupados: { [key: string]: { cantidad: number; idProducto: number; idCarritoProducto: number } } = {};
  
    carritoProductos.forEach((producto) => {
      const nombreProducto = producto.producto.nombre;
      if (productosAgrupados[nombreProducto]) {
        productosAgrupados[nombreProducto].cantidad += 1;
      } else {
        productosAgrupados[nombreProducto] = {
          cantidad: 1,
          idProducto: producto.producto.idProducto,//producto.idStockProducto, //producto.producto.idProducto,
          idCarritoProducto : producto.idCarritoProducto,
        };
      }
    });
  
    return Object.keys(productosAgrupados).map((nombre) => ({
      nombre,
      cantidad: productosAgrupados[nombre].cantidad,
      idProducto: productosAgrupados[nombre].idProducto,
      idCarritoProducto: productosAgrupados[nombre].idCarritoProducto,
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

  return (
    <div>
      <h1>Mi Carrito</h1>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th> </th> {/* Nueva columna para acciones */}
          </tr>
        </thead>
        <tbody>
          {agruparProductosPorNombre().map(({ nombre, cantidad, idProducto, idCarritoProducto }) => (
            <tr key={nombre}>
              <td>{nombre}</td>
              <td>{cantidad}</td>
              <td>
                <button onClick={() => agregarProducto(idProducto)}>
                  Agregar
                </button>
                <button onClick={() => quitarProducto(idCarritoProducto)}>
                  Quitar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarritoPage;
