// import React from 'react'
// import { Cards } from '../components/dashboard/Cards'
// import RecentlyAdded from '../components/dashboard/RecentlyAdded'
// import { Map } from '../components/dashboard/Map'
// import { useGetRegion } from '../redux/InitialState/GetRegion'
// import { useGetInstitution } from '../redux/InitialState/GetInstitution'
// import { useGetResource } from '../redux/InitialState/GetResource'
// import { GetRoles } from '../redux/InitialState/GetRoles';
// import {ProfileInfo} from "../redux/InitialState/ProfileInfo"
// export const Dashboard = () => {
//   useGetRegion();
//   GetRoles();
//   useGetInstitution();
//   useGetResource();
//   ProfileInfo()
//   return (
//     <div className='flex flex-col h-screen gap-6'> 
//       <Cards />
//       <div className='flex w-full gap-6 sm:px-6 h-full lg:px-8'>
//         <div className='w-6/12 h-full'>
//           <h1 className='text-xl font-semibold'>Degraded sites Map</h1>
//           <div className='p-6'>
//             <Map />
//           </div>
//           </div>
//         <div className='w-6/12 h-full'>
//         <h1 className='text-xl font-semibold'>Recently Added</h1>
//           <RecentlyAdded />
//           </div>
//       </div>
//     </div>
//   )
// }

import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export const Dashboard = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const ethiopia = { lat: 9.145, lng: 40.4897 };

    const initializeMap = () => {
      const mapInstance = L.map("map", {
        minZoom: 5,
        maxBounds: [
          [3.306, 32.897], // Southwestern corner of the bounding box
          [15.003, 48.102], // Northeastern corner of the bounding box
        ],
        updateWhenIdle: false,
      }).setView([ethiopia.lat, ethiopia.lng], 6);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapInstance);

      setMap(mapInstance);
    };

    // Check if the map is already initialized before attempting to initialize it again
    if (!map) {
      initializeMap();
    }

    return () => {
      // Clean up the map instance when the component is unmounted
      if (map) {
        map.remove();
      }
    };
  }, [map]);

  // Render the map container
  return <div id="map" style={{ height: "500px" }}></div>;
};
