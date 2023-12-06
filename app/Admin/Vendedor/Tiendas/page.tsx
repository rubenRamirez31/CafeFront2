'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Spinner from 'react-bootstrap/Spinner';
import Link from 'next/link';
import styles from '../../../styles.module.css'

const VendedorTiendasPage = () => {
    const { data: session } = useSession();
    const [error, setError] = useState('');
    const [mostrarError, setMostrarError] = useState(false);
    const [respuestaExitosa, setRespuestaExitosa] = useState<boolean | null>(null);



    useEffect(() => {
        const idUsuario = session?.user.idUsuario;
        if (session?.user.token) {
            console.log("Iniciando solicitud fetch...");
            fetch(`http://localhost:8080/vendedores/usuario/${idUsuario}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.user.token}`,
                },
            })
                .then(async response => {
                    console.log("Respuesta recibida:", response);
                    if (!response.ok) {
                        const text = await response.text();
                        throw new Error(text || 'Error desconocido');
                    }
                    return response.text();
                })
                .then(data => {
                    console.log("Respuesta exitosa:", data);
                    setRespuestaExitosa(true);
                })
                .catch(err => {
                    console.error("Error en la solicitud:", err);
                    setError(err.message);
                    setRespuestaExitosa(false);
                });
        }
    }, [session]);

    if (respuestaExitosa === null) {

        return (
            <>
                <div className='container-fluid' style={{marginTop:'10rem', marginBottom:'10rem'}}>
                    <div className='d-flex justify-content-center'>
                        <Spinner animation="border" />
                    </div>
                </div>
            </>
        )
    }

    if (respuestaExitosa) {
        return <div>Página o componente para la respuesta exitosa</div>;
    } else {
        return (
            <>
                <div className='container-fluid my-5'>
                    <div className='d-flex justify-content-center'>
                        <img src="/continuaturegistro.png" alt="Continua tu registro" width={'30%'} height={'30%'} />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <h3 className='text text-center'>Aun no tienes acceso a este contenido, presiona el siguiente boton para continuar:</h3>
                    </div>
                    <div className='d-flex justify-content-center my-5'>
                        <Link style={{ textDecoration: 'none' }} href={'/RegistroVendedor'} className={styles.btnprincipal}>Continuar Registro</Link>
                    </div>
                </div>
            </>
        )
    }
};

export default VendedorTiendasPage;
