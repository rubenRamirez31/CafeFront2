"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import ProductosCard from "./components/ProductosCard";
import { IProducto } from "./models/IProducto";
import { useSession } from "next-auth/react";


export const PrincipalPage = () => {

  
  const { data: session, status } = useSession();
  const [productos, setProductos] = useState<IProducto[]>([]);
  useEffect(() => {

    if (session?.user.token) {
      fetch('http://localhost:8080/Productos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(json => setProductos(json))
        .catch(error => console.error('Error fetching products:', error));
    }


  }, [session]);


  return (



    <div className={styles.principal}>


      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Café Contigo</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Odit animi accusamus ea ex aspernatur dolores id? Hic repellendus corporis ex.
          </p>
          <Link href="./Informacion" className={styles.btnt1}>
            Mas Informacion
          </Link>
        </div>


      </header>

      <section className={styles.coffee}>

        <img className={styles.coffeeImg} src="/bg2.png" alt="bg2" />

        <div className={styles.coffeeContent}>

          <h2>Categorias mas populares</h2>

          <p className={styles.txtP}>
            Lorem ipsum dolor sit amet.</p>

          <div className={styles.coffeeGroup}>
            <div className={styles.coffee1}>
              <img src="c1.png" alt="c1.png" />
              <h3>Cafe, ipsum dolor.</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, impedit.
              </p>
            </div>



            <div className={styles.coffee1}>
              <img src="c2.png" alt="c2.png" />
              <h3>Cafe, ipsum dolor.</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, impedit.
              </p>
            </div>



            <div className={styles.coffee1}>
              <img src="c3.png" alt="c3.png" />
              <h3>Cafe, ipsum dolor.</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, impedit.
              </p>
            </div>
          </div>
          <Link href="./Categorias" className={styles.btnt1}>
            Mas Categorias
          </Link>
        </div>

      </section>

      <main className={styles.services}>

      <div  className={styles.servicesContent}>
      <h2>Productos</h2>
        <div className={styles.servicesGroup}>
          <div className={styles.services1}>
            <img src="i1.svg" alt="" />
            <h3>Servicio 1</h3>
          </div>
          <div className={styles.services1}>
            <img src="i2.svg" alt="" />
            <h3>Servicio 2</h3>
          </div>
          <div className={styles.services1}>
            <img src="i3.svg" alt="" />
            <h3>Servicio 3</h3>
          </div>
        </div>

        
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, iusto.</p>
        <Link href="./Informacion" className={styles.btnt1}>
          Mas Informacion

        </Link>
        <p></p>
        <input type="text" placeholder="Buscar productos..." className={styles.searchInput} />
        <button className={styles.searchButton}>Buscar</button>
      </div>

      
       

      </main>

        {/* Productos Destacados */}
        <h2>Productos Destacados</h2>
        <section className={styles.Productos}>
          
          <div className="row">
            {productos.map((producto: IProducto) => (
              //condicionar aqui que se vean los productos con mas likes
              <ProductosCard key={producto.idProducto} producto={producto} />
            ))}
          </div>
        </section>

      <section className={styles.general}>
        <div className={styles.general1}>
          <h2>Trabaja con nosotros</h2>
          <p>Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Aut necessitatibus illo quam accusantium, cum ipsa?
          </p>
          <Link href="./Informacion" className={styles.btnt1}>
            Mas Informacion

          </Link>
        </div>

        <div className={styles.general2}></div>
      </section>

      <section className={styles.general}>

        <div className={styles.general3}></div>

        <div className={styles.general1}>

          <h2>Trabaja con nosotros</h2>
          <p>Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Aut necessitatibus illo quam accusantium, cum ipsa?
          </p>
          <Link href="./Informacion" className={styles.btnt1}>
            Mas Informacion

          </Link>
        </div>


      </section>


      <section className={styles.blogContent}>
        <div className={styles.blog1}>
          <img src="blog1.jpg" alt="blog1.jpg" />
          <h3>blog 1</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, similique.
          </p>
        </div>
        <div className={styles.blog1}>
          <img src="blog2.jpg" alt="blog2.jpg" />
          <h3>blog 1</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, similique.
          </p>
        </div>
        <div className={styles.blog1}>
          <img src="blog2.jpg" alt="blog2.jpg" />
          <h3>blog 1</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, similique.
          </p>
        </div>
        <p></p>
        <Link href="./Informacion" className={styles.btnt1}>
          Mas Informacion

        </Link>
      </section>
    </div>
  );
};
