// components/MapaTiendas.tsx
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L, { Icon, LatLngExpression } from 'leaflet';
import MarkerIcon from 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/leaflet.css';
import { ITienda } from '../models/ITienda';
import Link from 'next/link'; // Importa Link de next
import styles from '../styles.module.css'

interface MapaTiendasProps {
  tiendas: ITienda[];
}

const MapaComponent: React.FC<MapaTiendasProps> = ({ tiendas }) => {
  const coordenadasTec = [19.882814, -97.3930258] as LatLngExpression;

  return (
    <MapContainer style={{ width: '100vw', height: '50vh' }} center={coordenadasTec} zoom={10} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {tiendas.map(tienda => (
        <Marker key={tienda.idTienda} position={[tienda.latitud, tienda.longitud]} icon={new Icon({ iconUrl: MarkerIcon.src, iconSize: [25, 41], iconAnchor: [12, 41] })}>
          <Popup>
            <div>
              <h3>{tienda.nombre}</h3>

              <p style={{margin:'5px'}}>{tienda.descripcion}</p>
            <div className='d-flex justify-content-end'>
              <Link style={{textDecoration:'none'}} className={styles.btnprincipal} href={`/Tiendas/Ver?idTienda=${tienda.idTienda}`}>
              Ir a la tienda
              </Link>
            </div>
              
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapaComponent;
