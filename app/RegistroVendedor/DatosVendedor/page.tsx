'use client';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { FormEvent, useState } from 'react'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import styles from '@/app/styles.module.css'
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

const DatosVendedorPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    console.log(session?.user);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const response = await fetch('http://localhost:8080/vendedores', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${session?.user.token}`,
            },
            body: JSON.stringify({
                idUsuario: session?.user.idUsuario,
                razonSocial: formData.get("razonSocial"),
                rfc: formData.get("rfc"),
                imagenINE: "https://firebasestorage.googleapis.com/v0/b/iq4b-nextapp-rrh.appspot.com/o/imagenes%2FCaptura%20de%20pantalla%202023-09-28%20231839.png?alt=media&token=b9002941-1719-4fad-8aeb-c42acdc632a2"
            })
        });

        const data = await response;

        if (data.status == 200) {

            Swal.fire({
                title: "Excelente",
                text: "Tus datos se han registrado correctamente",
                icon: "success",
                confirmButtonText: 'Continuar'
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push('/RegistroVendedor/DatosSolicitud');
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
                                    <h5 className="fw-normal my-1 pb-3" style={{ letterSpacing: '1px' }}>Requerimos datos extras para validarte como persona fisica</h5>
                                </div>
                                <form onSubmit={onSubmit} >
                                    <div className="col-12 ">
                                        <label htmlFor="razonSocial">Razon Social</label>
                                        <input type="text" id='' name='razonSocial' className="form-control form-control-sm" required />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="rfc">RFC</label>
                                        <input type="text" id='rfc' name='rfc' className="form-control form-control-sm" required />
                                    </div>
                                    <div className='col-12'>
                                        <Form.Group controlId="formFileLg" className="mb-3">
                                            <Form.Label>Sube una imagen de tu identificacion oficial</Form.Label>
                                            <Form.Control type="file" />
                                        </Form.Group>
                                    </div>

                                    <div className='my-4' >
                                        <button type="submit" style={{ width: '100%' }} className={styles.btnprincipal}>Aceptar</button>
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

export default DatosVendedorPage