// import React from 'react'
// import "leaflet/dist/leaflet.css"
// import {MapContainer, TileLayer} from 'react-leaflet'


// export const Map = () => {
//   return (
//      <MapContainer className='h-full' center={[9.145, 40.4897]} zoom={6} 
     
//      maxBounds={[
//       [3.306, 32.897],  
//       [15.003, 48.102],  
//     ]}
//     >
//       <TileLayer 
//       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
//       />
//      </MapContainer>
//   )
// }


/* global L */

import React, { useEffect } from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from 'react-leaflet';
import { useGetRegionGeojsonsQuery } from '../../redux/GeoJson/RegionGeoJsonApi';

export const Map = () => {
  const { data: Regions, isLoading, isSuccess, isError, error } = useGetRegionGeojsonsQuery()
  console.log(isSuccess && Regions);
  useEffect(() => {
    const ethiopia = { lat: 9.145, lng: 40.4897 };
    const map = L.map("map", {
      minZoom: 5,
      maxBounds: [
        [3.306, 32.897],
        [15.003, 48.102],
      ],
      updateWhenIdle: false,
    }).setView([ethiopia.lat, ethiopia.lng], 6);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Helper function to fetch GeoJSON data
    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        return await response.json();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Add GeoJSON layer
    fetchData("boundary.geojson").then((data) => {
      L.geoJSON(data, {
        style: {
          fillColor: "#fff",
          fillOpacity: 1,
          color: "white",
          weight: 1,
        },
      }).addTo(map);
    });

    // Additional code for other layers and interactions goes here

    // Clean up function
    return () => {
      map.remove();
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div id="map" className='h-full'>
      <MapContainer center={[9.145, 40.4897]} zoom={6}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      </MapContainer>
    </div>
  );
};
