'use client'
import L, { Icon, LatLngExpression } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import MarkerIcon from '../../node_modules/leaflet/dist/images/marker-icon.png'
import 'leaflet/dist/leaflet.css'
const TiendasPage = () => {
  const coordenadasTec = [19.882814, -97.3930258] as LatLngExpression
  return(
    <MapContainer style={{width : '100vw', height: '100vh'}}
     center={ coordenadasTec} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordenadasTec}
      icon={new Icon({iconUrl: MarkerIcon.src, iconSize: [25, 41], iconAnchor: [12, 41]})}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
    </MapContainer>
  )
}

export default TiendasPage