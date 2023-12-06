'use client';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { FormEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import styles from '@/app/styles.module.css'
import { IVendedor } from '@/app/models/IVendedor';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
}
    from 'mdb-react-ui-kit';

const DatosSolicitudPage = () => {

    const { data: session } = useSession();
    const router = useRouter();
    const [error, setError] = useState('');
    const [mostrarError, setMostrarError] = useState(false);
    const [respuestaExitosa, setRespuestaExitosa] = useState<boolean | null>(null);
    const [vendedor, setVendedor] = useState<IVendedor[]>([]);

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
                .then(async response => response.json())
                .then(json => setVendedor(json))
                .catch(error => console.error('Error fetching products:', error));


        }
    }, [session]);

    console.log(vendedor.idVendedor);


    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const fechaActual = new Date();
        const fechaFormateada = fechaActual.toISOString().split('T')[0];

        console.log(fechaFormateada);


        const response = await fetch('http://localhost:8080/solicitudes', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${session?.user.token}`,
            },
            body: JSON.stringify({
                idVendedor: vendedor.idVendedor,
                p1: formData.get('p1'),
                p2: formData.get('p2'),
                p3: formData.get('p3'),
                p4: formData.get('p4'),
                idEstatusSolicitud: 1,
                fecha: fechaFormateada
            })
        });

        const data = await response;

        if (data.status == 200) {

            Swal.fire({
                title: "Excelente",
                text: "Tu solicitud se envio correctamente, espera la autorizacion del administrador para comenzar a vender",
                icon: "success",
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push('/');
                }
            })

        } else {
            Swal.fire({
                title: "Error",
                text: "Algo salio mal",
                icon: "error"
            });

            console.log(response)
        }
    }
    return (
        <>
            <MDBContainer className="my-4 container-fluid">
                <MDBCard>
                    <MDBRow className='g-0'>
                        <MDBCol md='6'>
                            <MDBCardBody className='d-flex flex-column'>
                                <div className='d-flex justify-content-center'>
                                    <img src="/logo-removebg.svg" alt="Logo Cafe Contigo" width={150} height={150} />
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <h5 className="fw-normal my-1 pb-3" style={{ letterSpacing: '1px' }}>Ahora danos datos extras sobre tu negocio</h5>
                                </div>
                                <form onSubmit={onSubmit} >
                                    <div className="col-12 ">
                                        <label htmlFor="p1">¿Cuál es el nombre de tu negocio de café?</label>
                                        <input type="text" id='p1' name='p1' className="form-control form-control-sm" required />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="p2">¿Cuéntame un poco sobre la historia o el origen de tu negocio?</label>
                                        <input type="text" id='p2' name='p2' className="form-control form-control-sm" required />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="p3">¿Qué tipo de café o granos utilizas en tu negocio? ¿Son de origen local o importados?</label>
                                        <input type="text" id='p3' name='p3' className="form-control form-control-sm" required />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="p4">¿Dónde se encuentra ubicado tu negocio? da una direccion </label>
                                        <input type="text" id='p4' name='p4' className="form-control form-control-sm" required />
                                    </div>
                                    <div className='col-12'>
                                        <Form.Group controlId="formFileLg" className="mb-3">
                                            <Form.Label>Sube una imagen de algun producto de tu negocio</Form.Label>
                                            <Form.Control type="file" />
                                        </Form.Group>
                                    </div>

                                    <div className='my-4' >
                                        <button type="submit" style={{ width: '100%' }} className={styles.btnprincipal}>Enviar</button>
                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCol>
                        <MDBCol md='6'>
                            <MDBCardImage src='/CafeRegistro.jpg' alt="login form" className='rounded-start w-100' />
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            </MDBContainer>
        </>
    )
}

export default DatosSolicitudPage