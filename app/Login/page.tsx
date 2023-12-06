'use client'
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
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

const LoginPage = () => {
    const [errors, SetError] = useState<string>("");
    const { data: session, status } = useSession();
    const { handleSubmit, register } = useForm<ILogin>();
    const router = useRouter();

    if (status === 'authenticated') {
        router.push('..');
    }

    const onSubmit = handleSubmit(async (formData, event) => {
        event?.preventDefault();


        const responseLogin = await signIn("credentials", {
            username: formData.username,
            password: formData.password,
            redirect: false,
        });

        if (responseLogin?.error) {
            Swal.fire({
                title: "¡Ups!",
                text: "Parece que tu correo o contraseña son incorrectos",
                icon: "error",
            });
            return;
        }

        router.push("..");
    });

    return (
        <>
            <MDBContainer className="my-4">
                <MDBCard>
                    <MDBRow className='g-0'>
                        <MDBCol md='6'>
                            <MDBCardImage src='/logincafe.jpg' alt="login form" className='rounded-start w-100' />
                        </MDBCol>
                        <MDBCol md='6'>
                            <MDBCardBody className='d-flex flex-column'>

                                <div className='d-flex justify-content-center'>
                                    <img src="/logo-removebg.svg" alt="Logo Cafe Contigo" width={150} height={150} />
                                </div>

                                <h5 className="fw-normal my-1 pb-3" style={{ letterSpacing: '1px' }}>Ingresa con tu cuenta</h5>

                                <form onSubmit={onSubmit}>
                                    <div className="col-12 my-3">
                                        <input type="text" className="form-control form-control-lg" {...register("username", { required: "El correo es obligatorio" })} />
                                        <label htmlFor="username">Correo</label>
                                    </div>
                                    <div className="col-12 my-3 ">
                                        <input type="password" className="form-control form-control-lg" {...register("password", { required: "La contraseña es obligatoria" })} />
                                        <label htmlFor="password">Contraseña</label>
                                    </div>
                                    <div >
                                        <button type="submit" style={{ width: '100%' }} className={styles.btnprincipal}>Ingresar</button>
                                    </div>
                                </form>

                                <p className="mb-5 pb-lg-2 my-3" style={{ color: '#553600' }}>¿No tiene una cuenta? <a href="/Registrar" style={{ color: '#393f81' }}>Pulsa aquí</a></p>

                                    <Link href={'/RegistroVendedor'} style={{ width: '100%', textDecoration:'none', textAlign:'center' }} className={styles.btnprincipal}>Trabaja con nosotros</Link>
                              
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            </MDBContainer>

        </>

    )
}

export default LoginPage