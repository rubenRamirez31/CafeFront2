'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ISolicitud } from '../../../../models/ISolicitud'
import styles from '../../../../styles.module.css'
import { useSession } from 'next-auth/react'
import Swal from 'sweetalert2'

export interface Props {
    params: { idp: number }
}

const VerSolicitudpage = ({ params }: Props) => {
    const { data: session, status } = useSession();
    const [error, setError] = useState('');
    const [solicitud, setSolicitud] = useState<ISolicitud[]>([]);

    const handleAcceptClick = () => {
        Swal.fire({
            title: "Respuesta enviada",
            text: "Aceptaste esta solicitud",
            icon: "success"
        });
    };

    const handleRejectClick = () => {
        Swal.fire({
            title: "Respuesta enviada",
            text: "Tendra que enviar los motivos al correo electronico proporcionado por el solicitante",
            icon: "warning"
        });
    };


    useEffect(() => {
        if (session?.user.token && session?.user.idUsuario) {
            console.log("Iniciando solicitud fetch para obtener el las solicitudes");
            fetch(`http://localhost:8080/solicitudes/${params.idp}`, {
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

    return (
        <>
            <div className='container-fluid'>
                <div className={styles.contenedorDatosSolicitud}>
                    <h1 className='text text-center my-3'>Detalles de la solicitud</h1>

                    <h3 className='text my-3'>Información General:</h3>
                    <div className='d-flex justify-content-center my-3'>
                        <div className=' col-6 d-flex justify-content-center '>
                            <img src="/ImagenINE.jpg" alt="imagenINE" width={'350px'} />
                        </div>
                        <div className=' col-6'>
                            <h5 style={{ fontWeight: 'bold' }}>Nombre: <span style={{ fontWeight: 'normal' }}>{solicitud.vendedor?.usuario.nombre + ' ' + solicitud.vendedor?.usuario.apePat + ' ' + solicitud.vendedor?.usuario.apeMat}</span></h5>
                            <h5 style={{ fontWeight: 'bold' }}>Correo: <span style={{ fontWeight: 'normal' }}>{solicitud.vendedor?.usuario.correo}</span></h5>
                            <h5 style={{ fontWeight: 'bold' }}>Número Telefónico: <span style={{ fontWeight: 'normal' }}>{solicitud.vendedor?.usuario.numTelefono}</span></h5>
                            <h5 style={{ fontWeight: 'bold' }}>RFC: <span style={{ fontWeight: 'normal' }}>{solicitud.vendedor?.rfc}</span></h5>
                            <h5 style={{ fontWeight: 'bold' }}>Razón Social: <span style={{ fontWeight: 'normal' }}>{solicitud.vendedor?.razonSocial}</span></h5>
                        </div>
                    </div>
                    <h3 className='text my-3'>Respuestas de información de negocio:</h3>
                    <div className='d-flex justify-content-center my-3'>
                        <div className=' col-6 d-flex justify-content-center '>
                            <img src="/cafeNegocio.png" alt="imagen producto negocio" width={'350px'} height={'350px'} />
                        </div>
                        <div className='col-6'>
                            <h5 style={{ fontWeight: 'bold' }}>¿Cuál es el nombre de tu negocio de café?: <span style={{ fontWeight: 'normal' }}> <br /> R = {solicitud.p1}</span></h5>
                            <h5 style={{ fontWeight: 'bold' }}>¿Cuéntame un poco sobre la historia o el origen de tu negocio?: <span style={{ fontWeight: 'normal' }}><br /> R = {solicitud.p2}</span></h5>
                            <h5 style={{ fontWeight: 'bold' }}>¿Qué tipo de café o granos utilizas en tu negocio? ¿Son de origen local o importados?: <span style={{ fontWeight: 'normal' }}> <br /> R = {solicitud.p3}</span></h5>
                            <h5 style={{ fontWeight: 'bold' }}>¿Dónde se encuentra ubicado tu negocio? da una direccion : <span style={{ fontWeight: 'normal' }}> <br /> R = {solicitud.p4}</span></h5>
                        </div>
                    </div>

                    <div className='d-flex justify-content-end'>
                        <div className='d-flex'>
                            <button style={{marginRight:'10px'}} onClick={handleRejectClick} id='btnRechazar' className='btn btn-outline-danger'>Rechazar</button>
                            <button className={styles.btnprincipal} onClick={handleAcceptClick} id='btnAceptar'>Aceptar</button>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default VerSolicitudpage