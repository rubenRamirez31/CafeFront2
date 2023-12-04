import React from 'react';

const FooterComponent = () => {
    return (
        <footer className='bg-light text-center text-lg-start text-muted'>
            <section className='d-flex flex-column flex-lg-row align-items-center justify-content-center p-4 border-bottom'>
                <div className='me-lg-5 mb-3 mb-lg-0'>
                    
                    <span className='d-flex flex-column flex-lg-row align-items-center justify-content-center'>
                        Nuestras redes sociales</span>
                    
                    <div className='d-flex align-items-center'>
                        <a href='' className='me-4 text-reset'>
                            Facebook
                        </a>
                        <a href='' className='me-4 text-reset'>
                            Twitter
                        </a>
                        <a href='' className='me-4 text-reset'>
                            Instagram
                        </a>
                    </div>
                </div>


            </section>

            <section className=''>
                <div className='container text-center text-md-start mt-5'>
                    <div className='row mt-3'>
                        <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Trabaja con nostros</h6>
                            <p>
                                <a href='../../Admin/Login' className='text-reset'>
                                    Trabaja
                                </a>
                            </p>
                        </div>

                        <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Enlaces útiles</h6>
                            <p>
                                <a href='/terminos' className='text-reset'>
                                    Términos y condiciones
                                </a>
                            </p>
                            <p>
                                <a href='/privacidad' className='text-reset'>
                                    Cómo cuidamos tu privacidad
                                </a>
                            </p>
                            <p>
                                <a href='/ayuda' className='text-reset'>
                                    Ayuda
                                </a>
                            </p>
                        </div>

                        <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Información</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Contacto
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2023 Derechos reservados y bla bla bla
            </div>
        </footer>
    );
}

export default FooterComponent;
