'use client'
import L, { Icon, LatLngExpression } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import MarkerIcon from '../../node_modules/leaflet/dist/images/marker-icon.png'
import 'leaflet/dist/leaflet.css'
import { ITienda } from "../models/ITienda";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import MapaComponent from '../components/MapaComponent';
import styles from "../styles.module.css";


const TiendasPage = () => {
  const { data: session, status } = useSession();
  const [tiendas, setTiendas] = useState<ITienda[]>([]);


  useEffect(() => {
    if (session?.user.token) {
      // Obtener tiendas
      fetch('http://localhost:8080/tiendas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.token}`,
        },
      })
        .then(response => response.json())
        .then(json => setTiendas(json))
        .catch(error => console.error('Error fetching stores:', error));
    }
  }, [session]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }




  return (
    
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Tiendas</h1>
          <MapaComponent tiendas={tiendas} />
        </div>


      </header>
 



  )
}

export default TiendasPage
