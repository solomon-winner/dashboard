import React, { useEffect } from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet'; 
import { useGetRegionGeojsonsQuery } from '../../redux/GeoJson/RegionGeoJsonApi';
import { useGetSiteGeojsonsQuery } from '../../redux/GeoJson/SiteGeoJsonApi';
import {fetchRegionData, fetchSiteData} from '../Maps/FetchGeoJsonMap';
import {SetAllSiteData} from '../../redux/GeoJson/GeoJsonSlice'
import { useDispatch, useSelector } from 'react-redux';
import { LocationInfo } from '../Maps/LocationInfo';

  var siteIcon = L.icon({
        iconUrl: '/Marker.svg',
        iconSize: [20, 20], 
        iconAnchor: [16, 16], 
    });


export const Map = () => {
  const { data: RegiongeojsonUrls, isSuccess:isRegionSuccess } = useGetRegionGeojsonsQuery();
  const { data: SitegeojsonUrls, isSuccess:isSiteSuccess } = useGetSiteGeojsonsQuery();
  const dispatch = useDispatch();
  const AllSite = useSelector((state) => state.geoJson.GeoJson.AllSite);

  const RegionGeoJSONUrl = isRegionSuccess && RegiongeojsonUrls.data;
  const SitegeojsonUrl = isSiteSuccess && SitegeojsonUrls.data;
dispatch(SetAllSiteData(SitegeojsonUrl));
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
        fetchRegionData(url).then((data) => {
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

    if (isSiteSuccess && SitegeojsonUrl) {
      SitegeojsonUrl.forEach(url => {
        fetchSiteData(url).then((data) => {

          L.geoJSON(data).addTo(map).eachLayer((layer) => {
            const coordinates = layer.getBounds().getCenter();
                // dispatch(SetAllSiteData(layer));
               console.log(url,"All data...***");

            const siteMarker = L.marker(coordinates, {icon: siteIcon}).addTo(map);
  
            siteMarker.on("click", function() {
              const Site_id = parseInt(url.match(/\d+/)[0], 10); 
              console.log("This is the marked layer that is clicked...",Site_id);
              LocationInfo(Site_id);
              map.fitBounds(layer.getBounds());
          })
          });
        }).catch(error => {
          console.error("Error fetching data for URL:", url, error);
        });
      });
    }

    return () => {
      map.remove();
    };
  }, [isRegionSuccess && RegionGeoJSONUrl, isSiteSuccess && SitegeojsonUrl]);

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
