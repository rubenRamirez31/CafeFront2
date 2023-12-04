'use client'
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { ILogin } from '../models/ILogin';
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
    const [error, SetError] = useState<string>("");
    const { handleSubmit, register } = useForm<ILogin>();
    const router = useRouter();

    const onSubmit = handleSubmit(async (formData) => {

        const responseLogin = await signIn("credentials", {
            username: formData.username,
            password: formData.password,
            redirect: false,
        });

        if (responseLogin?.error) {
            SetError("Usuario y/o password incorasndldaslakmkrectos");
            return;
        }

        //aqui va lan condiciones de roles o hacer 4 logins xddd 
        router.push("../../Admin/Asociado/Productos");
    });
    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-6">
                        <label>Usuario</label>
                        <input type="text" className="form-control"  {...register("username")} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <label>Contraseña</label>
                        <input type="password" className="form-control"  {...register("password")} />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-6">
                        <button type="submit" className="btn btn-success me-3">Iniciar</button>
                        <Link href="/Productos" className="btn btn-dark">Registrar</Link>
                    </div>
                </div>

                <div className="row mt-3">
                    <h3 className='text-danger'> {error}</h3>
                </div>
            </form>

     

                <MDBContainer className="my-5">
                    <MDBCard>
                        <MDBRow className='g-0'>

                            <MDBCol md='6'>
                                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100' />
                            </MDBCol>

                            <MDBCol md='6'>
                                <MDBCardBody className='d-flex flex-column'>

                                    <div className='d-flex flex-row mt-2'>
                                        <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                                        <span className="h1 fw-bold mb-0">Logo</span>
                                    </div>

                                    <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

                                    <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" />
                                    <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" />

                                    <MDBBtn className="mb-4 px-5" color='dark' size='lg'>Login</MDBBtn>
                                    <a className="small text-muted" href="#!">Forgot password?</a>
                                    <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <a href="#!" style={{ color: '#393f81' }}>Register here</a></p>

                                    <div className='d-flex flex-row justify-content-start'>
                                        <a href="#!" className="small text-muted me-1">Terms of use.</a>
                                        <a href="#!" className="small text-muted">Privacy policy</a>
                                    </div>

                                </MDBCardBody>
                            </MDBCol>

                        </MDBRow>
                    </MDBCard>

                </MDBContainer>
                );
        </>

    )
}

export default LoginPage