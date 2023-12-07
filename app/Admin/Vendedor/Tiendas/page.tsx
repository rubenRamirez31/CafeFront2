'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Spinner from 'react-bootstrap/Spinner';
import Link from 'next/link';
import styles from '../../../styles.module.css';

const VendedorTiendaspage = () => {
    const { data: session } = useSession();
    const [error, setError] = useState('');
    const [vendedor, setVendedor] = useState(null);
    const [solicitud, setSolicitud] = useState(null);

    useEffect(() => {
        if (session?.user.token && session?.user.idUsuario) {
            console.log("Iniciando solicitud fetch para obtener el vendedor...");
            fetch(`http://localhost:8080/vendedores/usuario/${session.user.idUsuario}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.user.token}`,
                },
            })
                .then(response => {
                    if (!response.ok) {
                        // Aquí manejamos el caso de error
                        throw new Error('Error al buscar el vendedor');
                    }
                    return response.json();
                })
                .then(data => {
                    setVendedor(data);

                })
                .catch(err => {
                    console.error("Error en la solicitud:", err);
                    setError(err.message);
                });
        }
    }, [session]);

    useEffect(() => {
        if (vendedor && session?.user.token) {
            console.log("Iniciando solicitud fetch para obtener la solicitud...");
            fetch(`http://localhost:8080/solicitudes/vendedor/${vendedor.idVendedor}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.user.token}`,
                },
            })
                .then(response => {
                    if (!response.ok) {
                        // Aquí manejamos el caso de error
                        throw new Error('Error al buscar la solicitud');
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
    }, [vendedor, session]);

    // Aquí determinamos qué contenido renderizar
    if (vendedor === null) {
        return (
            <>
                <div className="d-flex justify-content-center">
                    <img src="/continuaturegistro.png" alt="Continuar registro" width={'30%'} height={'30%'} />
                </div>
                <div className="d-flex justify-content-center">
                    <h3 className="text text-center">Aún no tienes acceso a este contenido, presiona el siguiente botón para continuar:</h3>
                </div>
                <div className="d-flex justify-content-center my-5">
                    <Link href={'/RegistroVendedor/DatosSolicitud'} className={styles.btnprincipal} style={{ textDecoration: 'none' }}>Continuar Solicitud</Link>
                </div>
            </>
        );
    }

    // Contenido cuando el vendedor existe pero la solicitud aún no ha sido recuperada
    if (vendedor && !solicitud) {
        return (
            <>
                <div className="d-flex justify-content-center">
                    <img src="/continuaturegistro.png" alt="Continuar registro" width={'30%'} height={'30%'} />
                </div>
                <div className="d-flex justify-content-center">
                    <h3 className="text text-center">Aún no tienes acceso a este contenido, presiona el siguiente botón para continuar:</h3>
                </div>
                <div className="d-flex justify-content-center my-5">
                    <Link href={'/RegistroVendedor/DatosSolicitud'} className={styles.btnprincipal} style={{ textDecoration: 'none' }}>Continuar Solicitud</Link>
                </div>
            </>

        )
    }

    // Manejar el caso de error si se estableció uno
    if (error) {
        return (
            <div className="container-fluid my-5">
                <div className="d-flex justify-content-center">
                    <p>Error: {error}</p>
                </div>
            </div>
        );
    }

    // Renderizado final basado en si existe un registro en ambas tablas
    return (
        <div className="container-fluid my-5">
            {solicitud && vendedor ? (
                // Si existe una solicitud y un vendedor, mostramos su estado
                <>
                    <div className="d-flex justify-content-center">
                        <img src="/estatusEspera.png" alt="Estatus de la solicitud" width={'30%'} height={'30%'} />
                    </div>
                    <div className="d-flex justify-content-center">
                        <h3 className="text text-center">Tu solicitud está pendiente, puedes consultar el estatus aquí:</h3>
                    </div>
                    <div className="d-flex justify-content-center my-5">
                        <Link href={'/ruta-para-ver-estatus'} className={styles.btnprincipal} style={{ textDecoration: 'none' }} passHref>{solicitud.estatusSolicitud.estatus}</Link>
                    </div>
                </>
            ) : (
                // Si no existe una solicitud, invitamos al usuario a continuar con el registro
                <>
                    <div className="d-flex justify-content-center">
                        <img src="/continuaturegistro.png" alt="Continuar registro" width={'30%'} height={'30%'} />
                    </div>
                    <div className="d-flex justify-content-center">
                        <h3 className="text text-center">Aún no tienes acceso a este contenido, presiona el siguiente botón para continuar:</h3>
                    </div>
                    <div className="d-flex justify-content-center my-5">
                        <Link href={'/RegistroVendedor/DatosSolicitud'} className={styles.btnprincipa}>Continuar Solicitud</Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default VendedorTiendaspage;

