import React, { useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet'; 
import { useGetRegionGeojsonsQuery } from '../../redux/GeoJson/RegionGeoJsonApi';
import { useGetSiteGeojsonsQuery } from '../../redux/GeoJson/SiteGeoJsonApi';
import {fetchRegionData, fetchSiteData} from '../Maps/FetchGeoJsonMap';
import {SetAllRegions, SetSelectedKebele, SetSelectedWoreda,SetSelectedRegion, SetSelectedSite, SetLocationInfo} from '../../redux/GeoJson/GeoJsonSlice'
import { useDispatch, useSelector } from 'react-redux';
import { setSiteId } from '../../redux/site/SiteByIdState';
import { ZoomOut } from '@mui/icons-material';
import { log } from '../Resource/Utility/Logger';

  var siteIcon = L.icon({
        iconUrl: '/gps.png',
        iconSize: [20, 20], 
        iconAnchor: [16, 16], 
    });


export const Map = () => {
  const { data: RegiongeojsonUrls, isSuccess:isRegionSuccess } = useGetRegionGeojsonsQuery();
  const { data: SitegeojsonUrls, isSuccess:isSiteSuccess } = useGetSiteGeojsonsQuery();
  const dispatch = useDispatch();
  const AllSite = useSelector((state) => state.geoJson.GeoJson.AllSite);
  const SelectedRegion = useSelector((state) => state.geoJson.GeoJson.SelectedRegion);
  const SelectedWoreda = useSelector((state) => state.geoJson.GeoJson.selectedWoreda);


  const [Zoom,setZoom]  = useState(false);
  const RegionGeoJSONUrl = isRegionSuccess && RegiongeojsonUrls.data;
  const SitegeojsonUrl = isSiteSuccess && SitegeojsonUrls.data;
  const All_Regions = []
  const Woredas = []
const Kebeles = []
const Sites = []
const Zoom_Out = () => {
  dispatch(SetSelectedRegion(null));
  dispatch(SetSelectedSite(null));
  dispatch(SetLocationInfo(true));
  setZoom(!Zoom)
}

  

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
  
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    var regionLayer,
      allSiteLayerGroup = L.layerGroup().addTo(map),
      woredaLayerGroup = L.layerGroup().addTo(map),
       kebeleLayerGroup = L.layerGroup().addTo(map),
       siteLayerGroup = L.layerGroup().addTo(map);
    if(Zoom) {

      map.setView([ethiopia.lat, ethiopia.lng], 6)

    }

    if (isRegionSuccess && RegionGeoJSONUrl) {
      RegionGeoJSONUrl.forEach(url => {
        fetchRegionData(url).then((data) => {
          All_Regions.push(data)
          

          regionLayer = L.geoJSON(All_Regions, {
            style: { fillColor: "white",color: "#009879", fillOpacity: 0.01, weight:2 
          },
            onEachFeature: onEachRegionFeature,
          }).addTo(map);
          function onEachRegionFeature(feature, layer) {
            layer.on("click", function (event) {
              regionLayer.resetStyle();
              event.target.setStyle({ color: "#803d00", fillOpacity: 0.3, weight:1 });
              woredaLayerGroup.clearLayers();
              Zoomer(layer);
              drawWoredasForRegion(feature.properties.id);
              dispatch(SetSelectedRegion(feature.properties.id));

            });
   
            function drawWoredasForRegion(selectedRegion) {
      
              fetch(`https://tbrr.echnoserve.com/api/geojson/regions/${selectedRegion}/woredas`)
        .then(response => response.json())
        .then(data => {
          const Region_Woredas = data.data;
          Region_Woredas.forEach(function (woro_da) {
            fetchRegionData(woro_da).then((woredaData) => {
              const WoredaId = woro_da.match(/\/([^\/]+)\.geojson$/)[1];
              woredaData.features.forEach(feature => {
                feature.properties.WoredaId = WoredaId;
            });

          L.geoJSON(woredaData, {
           onEachFeature: onEachWoredaFeature,
          }).addTo(woredaLayerGroup);
      });
          }
            
          )
        })
        .catch(error => {
          log('Error:', error);
        });
      
      
      }
          }

          
      
          function onEachWoredaFeature(feature, layer) {
            Woredas.push(layer);
            layer.bindTooltip(feature.properties.name, {
              permanent:false,
              fontSize: '16px'
            })

            layer.on("click", function () {
                woredaLayerGroup.eachLayer(function (woredaLayer) {
                    woredaLayer.setStyle({
                        color: "#803d00",
                        fillOpacity: 0.1,weight:1,
                    });
                });
            
                layer.setStyle({
                    color: "#803d00",
                    fillOpacity: 0.6, weight:1,
                });
            
            
                map.fitBounds(layer.getBounds());
            
                kebeleLayerGroup.clearLayers();
                drawKebelesForWoreda(feature.properties.WoredaId);
                dispatch(SetSelectedWoreda(feature.properties.WoredaId));
            });
            }

            function drawKebelesForWoreda(selectedWoreda) {

              fetch(`https://tbrr.echnoserve.com/api/geojson/woredas/${selectedWoreda}/kebeles`)
        .then(response => response.json())
        .then(data => {
          const Woroda_Kebeles = data.data;
          Woroda_Kebeles.forEach(function (KEBELE) {
            fetchRegionData(KEBELE).then((kebeleData) => {

              const kebeleId = KEBELE.match(/\/([^\/]+)\.geojson$/)[1];

                    kebeleData.features.forEach(feature => {
                        feature.properties.kebeleId = kebeleId;
                    });

                    L.geoJSON(kebeleData, {
              onEachFeature: onEachKebeleFeature,
          }).addTo(kebeleLayerGroup);
      });
          }
            
          )
        })
        .catch(error => {
          log('Error:', error);
        });
      
      
      }
      
       
      function onEachKebeleFeature(feature, layer) {
      Kebeles.push(layer);

      layer.on("click", function () {
          kebeleLayerGroup.eachLayer(function (kebeleLayer) {
              kebeleLayer.setStyle({
                  color: "#6c757d",
                  fillOpacity: 0.1,
                  weight:1,
              });
          });
      
          layer.setStyle({
              color: "#4CAF50",
              fillOpacity: 0.6,weight:1,
          });
      

          map.fitBounds(layer.getBounds());
      
          siteLayerGroup.clearLayers();

          dispatch(SetSelectedKebele(layer.feature.properties.kebeleId))
      });
      }
      
      

        }).catch(error => {
          log("Error fetching data for URL:", url, error);
        });
      });
    }

    if (isSiteSuccess && SitegeojsonUrl) {
      SitegeojsonUrl.forEach(url => {
        fetchSiteData(url).then((data) => {

          L.geoJSON(data).addTo(map).eachLayer((layer) => {
            const coordinates = layer.getBounds().getCenter();
  

            const siteMarker = L.marker(coordinates, {icon: siteIcon}).addTo(map);
            siteMarker.bindTooltip(layer.feature.properties.Name ? layer.feature.properties.Name : layer.feature.properties.watershed, {
              permanent: false,
              direction: 'top'
          });
          
            siteMarker.on("click", function() {
              const Site_id = parseInt(url.match(/\d+/)[0], 10); 
              dispatch(SetSelectedSite(Site_id))
              Zoomer(layer);
          })
          });
        }).catch(error => {
          log("Error fetching data for URL:", url, error);
        });
      });
    }
    const Zoomer = (LAYER) =>{
      map.fitBounds(LAYER.getBounds()); 
      return;
    }
    
    
    return () => {
      map.remove();
    };
  }, [isRegionSuccess && RegionGeoJSONUrl, isSiteSuccess && SitegeojsonUrl, Zoom]);

  return (
    <>
          <h1 className='text-xl font-semibold'>Degraded sites Map</h1>
        <button className='z-10' onClick={Zoom_Out}><ZoomOut /></button>

    <div id="map" className='h-full z-10'>
      <MapContainer center={[9.145, 40.4897]} zoom={6.3}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      </MapContainer>
    </div>
    </>
  );
};
