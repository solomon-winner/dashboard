import React, { useEffect } from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet library
import { useGetRegionGeojsonsQuery } from '../../redux/GeoJson/RegionGeoJsonApi';
import { useGetSiteGeojsonsQuery } from '../../redux/GeoJson/SiteGeoJsonApi';

export const Map = () => {
  const { data: RegiongeojsonUrls, isRegionSuccess } = useGetRegionGeojsonsQuery();
  const { data: SitegeojsonUrls, isSiteSuccess } = useGetSiteGeojsonsQuery();

  const RegionGeoJSONUrl = isRegionSuccess && RegiongeojsonUrls.data;
  console.log("all regions are here ....", isRegionSuccess && RegionGeoJSONUrl)
 console.log("all site are here ....", isSiteSuccess && SitegeojsonUrls)
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

    if (isRegionSuccess && RegionGeoJSONUrl) {
      RegionGeoJSONUrl.forEach(url => {
        fetchData(url).then((data) => {
          console.log(data);
          L.geoJSON(data, {
            style: {
              fillColor: "green",
              fillOpacity: 0.3,
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
  }, [isRegionSuccess && RegionGeoJSONUrl]);

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
