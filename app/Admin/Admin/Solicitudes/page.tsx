"use client";
import Link from "next/link";
import styles from "../../../styles.module.css";
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";


export const SolicitudesPage = () => {
    const { data: session, status } = useSession();
    //   const [productos, setProductos] = useState<IProducto[]>([]);
    //   useEffect(() => {

    //     if (session?.user.token) {
    //       fetch('http://localhost:8080/Productos', {
    //         method: 'GET',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //       })
    //         .then(response => response.json())
    //         .then(json => setProductos(json))
    //         .catch(error => console.error('Error fetching products:', error));
    //     }


    //   }, [session]);


    return (
        <>
        <div className="d-flex justify-content-center text text-center">
            <h1 className="font-weight-bold">Solicitudes</h1>
        </div>
        <div className="d-flex justify-content-center">
            <p >Es este apartado podras ver las solicites de los vendedores</p>
        </div>
        <div className={styles.contenedorSolicitudes}>
            <p>ok</p>
        </div>
        </>
    );
};

export default SolicitudesPage;

