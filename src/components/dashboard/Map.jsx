import React, { useEffect } from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet'; 
import { useGetRegionGeojsonsQuery } from '../../redux/GeoJson/RegionGeoJsonApi';
import { useGetSiteGeojsonsQuery } from '../../redux/GeoJson/SiteGeoJsonApi';
import {fetchRegionData, fetchSiteData} from '../Maps/FetchGeoJsonMap';
import {SetAllRegions, SetAllSiteData, SetSelectedRegion, SetSelectedSite} from '../../redux/GeoJson/GeoJsonSlice'
import { useDispatch, useSelector } from 'react-redux';
import { setSiteId } from '../../redux/site/SiteByIdState';

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
  const SelectedRegion = useSelector((state) => state.geoJson.GeoJson.SelectedRegion);

  const Zoom  = useSelector((state) => state.geoJson.GeoJson.Zoom_out);
  const RegionGeoJSONUrl = isRegionSuccess && RegiongeojsonUrls.data;
  console.log("RegionGeoJSONUrl", RegionGeoJSONUrl)
  const SitegeojsonUrl = isSiteSuccess && SitegeojsonUrls.data;

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

    if(Zoom) {

      map.setView([ethiopia.lat, ethiopia.lng], 6)

    }

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
          }).addTo(map).eachLayer((layer) => {
            dispatch(SetAllRegions(layer))
            layer.on("click",() => {
              const Region_id = parseInt(url.match(/\d+/)[0], 10); 
              dispatch(SetSelectedRegion({Selected:layer, ID:Region_id}));
              Zoomer(layer)
              layer.setStyle({ color: "black", fillOpacity: 0.6, fillColor: "black"});
            })
          });
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
              dispatch(SetAllSiteData(layer));

            const siteMarker = L.marker(coordinates, {icon: siteIcon}).addTo(map);
  
            siteMarker.on("click", function() {
              const Site_id = parseInt(url.match(/\d+/)[0], 10); 
              console.log("This is the marked layer that is clicked...",Site_id);
              dispatch(setSiteId(Site_id));
              Zoomer(layer);
          })
          });
        }).catch(error => {
          console.error("Error fetching data for URL:", url, error);
        });
      });
    }
    const Zoomer = (LAYER) =>{
      map.fitBounds(LAYER.getBounds()); 
      return;
    }
      if(SelectedRegion) {
      const SelectedLayerID = SelectedRegion.ID;
      // const SelectedLayer = fetchRegionData(`geojson/regions/${SelectedLayerID}.geojson`)
      // console.log("const SelectedLayer = SelectedRegion.Selected ", SelectedLayer)
      // Zoomer(SelectedLayer);
      // SelectedLayer.setStyle({ color: "black", fillOpacity: 0.6, fillColor: "black"});
    }
    return () => {
      map.remove();
    };
  }, [isRegionSuccess && RegionGeoJSONUrl, isSiteSuccess && SitegeojsonUrl, Zoom, SelectedRegion]);

  return (
    <div id="map" className='h-full z-10'>
      <MapContainer center={[9.145, 40.4897]} zoom={6.3}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      </MapContainer>
    </div>
  );
};
