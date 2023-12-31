'use client';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { FormEvent, useState } from 'react'
import { useForm } from 'react-hook-form';
import { ILogin } from '../models/ILogin';
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

const RegistrarPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const response = await fetch('http://localhost:8080/Usuarios/Registrar', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: formData.get("nombre"),
                apePat: formData.get("apePat"),
                apeMat: formData.get("apeMat"),
                correo: formData.get("correo"),
                pwd: formData.get("pwd"),
                rol: {
                    idRol: 3,
                    nombre: "Cliente"
                },
                numTelefono: formData.get("numTelefono"),
            })
        });

        const data = await response;

        if (data.status == 200) {

            Swal.fire({
                title: "Excelente",
                text: "Te registaste correctamente",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push('/Login');
                }
            })

        } else {
            Swal.fire({
                title: "Atención",
                text: "Este correo ya esta en uso",
                icon: "warning"
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
                                    <h5 className="fw-normal my-1 pb-3" style={{ letterSpacing: '1px' }}>Crea una cuenta para ingresar</h5>
                                </div>
                                <form onSubmit={onSubmit} >

                                    <div className='d-lg-flex justify-content-lg-between'>
                                        <div className="col-sm-12 col-lg-3 my-3 ">
                                            <label htmlFor="nombre">Nombre</label>
                                            <input type="text" name='nombre' className="form-control form-control-sm" required />
                                        </div>
                                        <div className="col-sm-12 col-lg-3 my-3">
                                            <label htmlFor="apePat">Apellido Paterno</label>
                                            <input type="text" name='apePat' className="form-control form-control-sm" required />
                                        </div>
                                        <div className="col-sm-12 col-lg-3 my-3">
                                            <label htmlFor="apeMat">Apellido Materno</label>
                                            <input type="text" name='apeMat' className="form-control form-control-sm" required />
                                        </div>
                                    </div>

                                    <div className="col-12 my-3">
                                        <label htmlFor="numTelefono">Numero telefonico</label>
                                        <input type="tel" name='numTelefono' className="form-control form-control-sm" required
                                            pattern="[0-9]{10}"
                                            title="El número telefónico debe tener 10 dígitos sin espacios ni guiones"
                                            maxLength={10} />
                                    </div>

                                    <div className="col-12 my-3">
                                        <label htmlFor="correo">Correo electronico</label>
                                        <input type="email" name='correo' className="form-control form-control-sm" required />
                                    </div>

                                    <div className='d-flex justify-content-between'>
                                        <div className="col-5 my-3 ">
                                            <label htmlFor="password">Contraseña</label>
                                            <input type="password" name='pwd' className="form-control form-control-sm" required />
                                        </div>
                                        <div className="col-5 my-3 ">
                                            <label htmlFor="password2">Confirma tu contraseña</label>
                                            <input type="password" className="form-control form-control-sm" required />
                                        </div>
                                    </div>
                                    <div >
                                        <button type="submit" style={{ width: '100%' }} className={styles.btnprincipal}>Registrarme</button>
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

export default RegistrarPage