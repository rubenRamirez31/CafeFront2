"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles.module.css";
import { useSession } from "next-auth/react";
import 'bootstrap/dist/css/bootstrap.min.css';


export const TyCPage = () => {


    return (
        <>
            <div className="container-fluid ">
                <header className="text text-center my-5">
                    <h1>Términos y Condiciones de Uso</h1>
                </header>
                <div className={styles.contenedorTyC}>
                    <section>
                        <h2>Aceptacion de Términos:</h2>
                        <p className="text text-justify"> El usuario debe aceptar estos términos y condiciones antes de completar su registro como vendedor.</p>
                    </section>

                    <section>
                        <h2>Registro y Cuenta de Usuario:</h2>
                        <p className="text text-justify">Para ser vendedor, el usuario debe crear una cuenta proporcionando información veraz y completa. Es responsable de la seguridad de su cuenta y de todas las actividades que ocurran bajo ella.</p>
                    </section>

                    <section>
                        <h2>Listado de Productos:</h2>
                        <p className="text text-justify">Los vendedores pueden listar solo productos relacionados con el café (grano, polvo, etc.). Deben asegurarse de que sus productos y descripciones sean precisos y no engañosos.</p>
                    </section>

                    <section>
                        <h2>Gestión de la Tienda y el Inventario:</h2>
                        <p className="text text-justify">Los vendedores son responsables de gestionar su propia tienda, incluyendo el stock, los precios, las descripciones de los productos y las políticas de venta.</p>
                    </section>

                    <section>
                        <h2>Cumplimiento Legal:</h2>
                        <p className="text text-justify">Los vendedores deben garantizar que sus productos y prácticas comerciales cumplan con todas las leyes y regulaciones aplicables, incluyendo las normativas de salud y seguridad.</p>
                    </section>

                    <section>
                        <h2>Transacciones y Pagos:</h2>
                        <p className="text text-justify">Los pagos se llevaran de manera fisica, el sistema no se hace responsable de perdidas, el vendedeor y el encargado de tienda son responsables de sus propias transacciones</p>
                    </section>

                    <section>
                        <h2>Propiedad Intelectual: </h2>
                        <p className="text text-justify">Los vendedores no deben infringir los derechos de propiedad intelectual de terceros en sus listados o en su tienda.</p>
                    </section>

                    <section>
                        <h2>Modificaciones a los Términos y Condiciones:</h2>
                        <p className="text text-justify">La plataforma se reserva el derecho de modificar los términos en cualquier momento, y el uso continuado del sitio implica la aceptación de estas modificaciones.</p>
                    </section>

                    <section>
                        <h2>Limitación de Responsabilidad:</h2>
                        <p className="text text-justify">Toda la informacion presentada en la plataforma es directamente responsabilidad de los vendedores, errores de precio,descripcion, stock, direciones y ubicaciones, son unica y exclusivamente respoinsabilidades de los vendedores</p>
                    </section>
                </div>

            </div>
        </>
    );
};

export default TyCPage;