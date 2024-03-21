import React from 'react'
import "leaflet/dist/leaflet.css"
import {MapContainer, TileLayer} from 'react-leaflet'


export const Map = () => {
  return (
     <MapContainer className='h-full' center={[9.145, 40.4897]} zoom={6} 
     
     maxBounds={[
      [3.306, 32.897],  
      [15.003, 48.102],  
    ]}
    >
      <TileLayer 
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
     </MapContainer>
  )
}
