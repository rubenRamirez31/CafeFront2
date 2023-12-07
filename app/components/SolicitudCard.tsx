import React from 'react'
import Link from 'next/link'
import { ISolicitud } from '../models/ISolicitud'
import { IVendedor } from '../models/IVendedor'
import styles from '../styles.module.css'


const SolicitudCard = ({ solicitud, verSolicitud }: { solicitud: ISolicitud, verSolicitud: (idSolicitud: number) => void }) => {
  const { vendedor, estatusSolicitud, fecha } = solicitud;
  return (
    <>

      <div className={styles.containertarjeta}>
        <div className={styles.tarjeta}>
          <figure>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ9DMNFHxwZcfPXJrJeBMITxPMP3FMZk_ixXzTfzt4G_C-G058" alt="Imagen card" />
          </figure>
          <div className={styles.contenidotarjeta}>
            <h3>Enviada por:
              {vendedor.usuario.nombre + ' ' + vendedor.usuario.apePat + ' ' + vendedor.usuario.apePat}</h3>
            <p>Correo: {vendedor.usuario.correo}</p>
            <p>Enviada el: {fecha.toString()}</p>
            <p>Estatus: {estatusSolicitud.estatus}</p>
            <Link href={`/Admin/Admin/VerSolicitud/${solicitud.idSolicitud}`} className={styles.btnprincipal}> Ver </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default SolicitudCard