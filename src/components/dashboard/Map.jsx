import React, { useEffect } from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet library
import { useGetRegionGeojsonsQuery } from '../../redux/GeoJson/RegionGeoJsonApi';

export const Map = () => {
  const { data: geojsonUrls, isSuccess } = useGetRegionGeojsonsQuery();
  const GeoJSONUrl = isSuccess && geojsonUrls.data;
  console.log("GeoJSONUrl",GeoJSONUrl)
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

    if (isSuccess && GeoJSONUrl) {
      GeoJSONUrl.forEach(url => {
        fetchData(url).then((data) => {
          L.geoJSON(data, {
            style: {
              fillColor: "green",
              fillOpacity: 0.4,
              color: "green",
              weight: 1,
            },
          }).addTo(map);
        }).catch(error => {
          console.error("Error fetching data for URL:", url, error);
        });
      });
    }

    return () => {
      map.remove();
    };
  }, [isSuccess, GeoJSONUrl]);

  const fetchData = async (url) => {
    try {
      const response = await fetch(`https://tbrr.echnoserve.com/${url}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  return (
    <div id="map" className='h-full'>
      <MapContainer center={[9.145, 40.4897]} zoom={6.3}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      </MapContainer>
    </div>
  );
};
