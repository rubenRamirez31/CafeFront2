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
import { ISolicitud } from "@/app/models/ISolicitud";
import { IsAny } from "react-hook-form";
import SolicitudCard from "@/app/components/SolicitudCard";

export const SolicitudesPage = () => {
    const { data: session, status } = useSession();
    const [error, setError] = useState('');
    const [solicitud, setSolicitud] = useState<ISolicitud[]>([]);

    useEffect(() => {
        if (session?.user.token && session?.user.idUsuario) {
            console.log("Iniciando solicitud fetch para obtener el las solicitudes");
            fetch(`http://localhost:8080/solicitudes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.user.token}`,
                },
            })
                .then(response => {
                    if (!response.ok) {
                        // Aquí manejamos el caso de error
                        throw new Error('Error al buscar las solicitudes');
                    }
                    return response.json();
                })
                .then(data => {
                    setSolicitud(data);

                })
                .catch(err => {
                    console.error("Error en la solicitud:", err);
                    setError(err.message);
                });
        }
    }, [session]);

    console.log(solicitud);

    const verSolicitud = (idSolicitud: number) => {

    }

    return (
        <>
            <div className="d-flex justify-content-center text text-center">
                <h1 className="font-weight-bold">Solicitudes</h1>
            </div>
            <div className="d-flex justify-content-center">
                <p >Es este apartado podras ver las solicites de los vendedores</p>
            </div>
                    <div className={styles.containertarjeta}>
                        {
                            solicitud.map((solicitud: ISolicitud) => (
                                <SolicitudCard
                                    key={solicitud.idSolicitud}
                                    solicitud={solicitud}
                                    verSolicitud={verSolicitud}

                                />
                            ))
                        }
            </div>

        </>
    );
};

export default SolicitudesPage;

