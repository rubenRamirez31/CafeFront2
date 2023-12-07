'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Spinner from 'react-bootstrap/Spinner';
import Link from 'next/link';
import styles from '../../../styles.module.css';

const Ventaspage = () => {
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


    if (!vendedor) {
        return (
            <>
                <div className="d-flex justify-content-center">
                    <img src="/continuaturegistro.png" alt="Continuar registro" width={'30%'} height={'30%'} />
                </div>
                <div className="d-flex justify-content-center">
                    <h3 className="text text-center">Aún no tienes acceso a este contenido, presiona el siguiente botón para continuar:</h3>
                </div>
                <div className="d-flex justify-content-center my-5">
                    <Link href={'/RegistroVendedor/DatosVendedor'} className={styles.btnprincipal} style={{ textDecoration: 'none' }}>Continuar Registro</Link>
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
                {/* Aquí puedes agregar un botón o enlace para reintentar o manejar el error */}
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

export default Ventaspage;
















// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
// import Spinner from 'react-bootstrap/Spinner';
// import Link from 'next/link';
// import styles from '../../../styles.module.css'
// import { IVendedor } from '@/app/models/IVendedor';
// import { ISolicitud } from '@/app/models/ISolicitud';

// const Ventaspage = () => {
//     const { data: session } = useSession();
//     const [error, setError] = useState('');
//     const [mostrarError, setMostrarError] = useState(false);
//     const [respuestaExitosa, setRespuestaExitosa] = useState<boolean | null>(null);
//     const [respuestaExitosa2, setRespuestaExitosa2] = useState<boolean | null>(null);
//     const [vendedor, setVendedor] = useState<IVendedor[]>([]);
//     const [solicitud, setSolicitud] = useState<ISolicitud[]>([]);


//     useEffect(() => {
//         //validar si el usuario existe en la tabla de vendedor
//         const idUsuario = session?.user.idUsuario;
//         if (session?.user.token) {
//             fetch(`http://localhost:8080/vendedores/usuario/${idUsuario}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${session.user.token}`,
//                 },
//             })
//                 .then(async response =>response.json())
//                 .then(json => {
//                     setVendedor(json);
//                     setRespuestaExitosa(true);
//                 })
//                 .catch(err => {
//                     console.error("Error en la solicitud:", err);
//                     setError(err.message);
//                     setRespuestaExitosa(false);
//                 });
//         }
//     }, [session]);


//     console.log(vendedor.idVendedor);
//     const idVendedorp = vendedor.idVendedor;

//     useEffect(() => {
//         if (respuestaExitosa && vendedor && idVendedorp) {
//             fetch(`http://localhost:8080/solicitudes/vendedor/${idVendedorp}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${session?.user.token}`,
//                 },
//             })
//                 .then(async response => response.json())
//                 .then(json => {
//                     setSolicitud(json);
//                     setRespuestaExitosa2(true);
//                 })
//                 .catch(err => {
//                     setError(err.message);
//                     setRespuestaExitosa2(false);
//                 });
//         }
//     }, [respuestaExitosa2, vendedor, session]);

//     console.log(solicitud);

//     if (respuestaExitosa === null) {

//         return (
//             <>
//                 <div className='container-fluid' style={{ marginTop: '10rem', marginBottom: '10rem' }}>
//                     <div className='d-flex justify-content-center'>
//                         <Spinner animation="border" />
//                     </div>
//                 </div>
//             </>
//         )
//     }

//     if (respuestaExitosa) {

//         if (respuestaExitosa2 == null) {

//             return (
//                 <>
//                     <div className='container-fluid' style={{ marginTop: '10rem', marginBottom: '10rem' }}>
//                         <div className='d-flex justify-content-center'>
//                             <Spinner animation="border" />
//                         </div>
//                     </div>
//                 </>
//             )
//         }

//         if (respuestaExitosa2) {
//             return (
//                 <>
//                     <div className='container-fluid my-5'>
//                         <div className='d-flex justify-content-center'>
//                             <img src="/estatusEspera.png" alt="Continua tu registro" width={'30%'} height={'30%'} />
//                         </div>
//                         <div className='d-flex justify-content-center'>
//                             <h3 className='text text-center'>Tu solicitud aun esta pendiente, puedes consutar el estatus aquí:</h3>
//                         </div>
//                         <div className='d-flex justify-content-center my-5'>
//                             <Link style={{ textDecoration: 'none' }} href={'#'} className={styles.btnprincipal}>Enviada</Link>
//                         </div>
//                     </div>
//                 </>
//             )
//         } else {
//             return (
//                 <>
//                     <div className='container-fluid my-5'>
//                         <div className='d-flex justify-content-center'>
//                             <img src="/continuaturegistro.png" alt="Continua tu registro" width={'30%'} height={'30%'} />
//                         </div>
//                         <div className='d-flex justify-content-center'>
//                             <h3 className='text text-center'>Aun no tienes acceso a este contenido, presiona el siguiente boton para continuar:</h3>
//                         </div>
//                         <div className='d-flex justify-content-center my-5'>
//                             <Link style={{ textDecoration: 'none' }} href={'/RegistroVendedor/DatosSolicitud'} className={styles.btnprincipal}>Continuar Solicitud</Link>
//                         </div>
//                     </div>
//                 </>
//             )
//         }

//     } else {
//         return (
//             <>
//                 <div className='container-fluid my-5'>
//                     <div className='d-flex justify-content-center'>
//                         <img src="/continuaturegistro.png" alt="Continua tu registro" width={'30%'} height={'30%'} />
//                     </div>
//                     <div className='d-flex justify-content-center'>
//                         <h3 className='text text-center'>Aun no tienes acceso a este contenido, presiona el siguiente boton para continuar:</h3>
//                     </div>
//                     <div className='d-flex justify-content-center my-5'>
//                         <Link style={{ textDecoration: 'none' }} href={'/RegistroVendedor/DatosVendedor'} className={styles.btnprincipal}>Continuar Registro</Link>
//                     </div>
//                 </div>
//             </>
//         )
//     }

//     //fin de la validacion
// };

// export default Ventaspage;
