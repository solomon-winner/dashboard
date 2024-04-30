
import React, { useEffect, useState } from 'react';
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

  const [Zoom,setZoom]  = useState(false);
  const RegionGeoJSONUrl = isRegionSuccess && RegiongeojsonUrls.data;
  console.log("RegionGeoJSONUrl", RegionGeoJSONUrl)
  const SitegeojsonUrl = isSiteSuccess && SitegeojsonUrls.data;
  const All_Regions = []
  const Woredas = []
const Kebeles = []
const Sites = []

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
/////////////
var regionLayer,
      allSiteLayerGroup = L.layerGroup().addTo(map),
      woredaLayerGroup = L.layerGroup().addTo(map),
       kebeleLayerGroup = L.layerGroup().addTo(map),
       siteLayerGroup = L.layerGroup().addTo(map);
/////////////
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
            console.log("feature, layer",feature, layer)
            layer.on("click", function (event) {
              regionLayer.resetStyle();
              event.target.setStyle({ color: "#803d00", fillOpacity: 0.3, weight:1 });
              // markSelectedRegionInList(feature.properties.name);
              woredaLayerGroup.clearLayers();
              Zoomer(layer);
              drawWoredasForRegion(feature.properties.id);
              // updateWoredaList(feature.properties.name);
            });
      
            function drawWoredasForRegion(selectedRegion) {
      
              fetch(`https://tbrr.echnoserve.com/api/geojson/regions/${selectedRegion}/woredas`)
        .then(response => response.json())
        .then(data => {
          console.log("The Woreda Array is here:", data.data);
          const Region_Woredas = data.data;
          Region_Woredas.forEach(function (woro_da) {
            fetchRegionData(woro_da).then((woredaData) => {
          L.geoJSON(woredaData, {
           onEachFeature: onEachWoredaFeature,
          }).addTo(woredaLayerGroup);
      });
          }
            
          )
        })
        .catch(error => {
          console.error('Error:', error);
        });
      
      
      }
          }
      
          function onEachWoredaFeature(feature, layer) {
            Woredas.push(layer);
            console.log("onEachWoredaFeature", feature)
            console.log("onEachWoredaFeature", layer)
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
            
                // markSelectedWoredaInList(feature.properties.name);
            
                map.fitBounds(layer.getBounds());
            
                kebeleLayerGroup.clearLayers();
                drawKebelesForWoreda(feature.properties.id);
                // updateKebeleList(feature.properties.id);
            });
            }

            function drawKebelesForWoreda(selectedWoreda) {

              fetch(`https://tbrr.echnoserve.com/api/geojson/woredas/${selectedWoreda}/kebeles`)
        .then(response => response.json())
        .then(data => {
          console.log("The Kebele Array is here:", data.data);
          const Woroda_Kebeles = data.data;
          Woroda_Kebeles.forEach(function (KEBELE) {
            console.log("njdsfhvbgjsdfvbg",KEBELE)
            fetchRegionData(KEBELE).then((kebeleData) => {
              // console.log("njdsfhvbgjsdfvbg",kebeleData)
          L.geoJSON(kebeleData, {
              onEachFeature: onEachKebeleFeature,
          }).addTo(kebeleLayerGroup);
      });
          }
            
          )
        })
        .catch(error => {
          console.error('Error:', error);
        });
      
      
      }
      
       
      function onEachKebeleFeature(feature, layer) {
      Kebeles.push(layer);
      layer.on("click", function () {
          kebeleLayerGroup.eachLayer(function (kebeleLayer) {
              kebeleLayer.setStyle({
                  color: "#6c757d",
                  fillOpacity: 0.1, weight:1,
              });
          });
      
          layer.setStyle({
              color: "#4CAF50",
              fillOpacity: 0.6,weight:1,
          });
      
          // markSelectedKebeleInList(feature.properties.RK_NAME);
      
          // Center map on the selected kebele
          map.fitBounds(layer.getBounds());
      
          siteLayerGroup.clearLayers();
          // drawSitesForKebele(feature.properties.RK_CODE);
          // updateSiteList(feature.properties.RK_CODE);
      });
      }
      
      

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
            siteMarker.bindTooltip(layer.feature.properties.Name ? layer.feature.properties.Name : layer.feature.properties.watershed, {
              permanent: false,
              direction: 'top'
          });
          
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
    if (SelectedRegion) {
      const SelectedLayerID = SelectedRegion // Assuming SelectedRegion contains an ID property
      fetchRegionData(`geojson/regions/${SelectedLayerID}.geojson`).then((data) => {
        const layer = L.geoJSON(data, {
          style: {
            fillColor: "black",
            fillOpacity: 0.3,
            color: "green",
            weight: 1,
          },
        }).addTo(map);
    
        // Zoom to the bounds of the selected region
        map.fitBounds(layer.getBounds());
      }).catch(error => {
        console.error("Error fetching region data:", error);
      });
    }
    
    return () => {
      map.remove();
    };
  }, [isRegionSuccess && RegionGeoJSONUrl, isSiteSuccess && SitegeojsonUrl, Zoom]);

  return (
    <>
        <button className='z-10' onClick={() => setZoom(!Zoom)}>zoom out</button>

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




////////////////////////////////////////
// import React, { useEffect, useState } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
//  import { MapContainer, TileLayer } from 'react-leaflet';

// export const Map = () => {
//   const [map, setMap] = useState(null);

//   useEffect(() => {
//     const ethiopia = { lat: 9.145, lng: 40.4897 };

//     // Initialize map
//     const leafletMap = L.map("map", {
//       minZoom: 5,
//       maxBounds: [
//         [3.306, 32.897], // Southwestern corner of the bounding box
//         [15.003, 48.102], // Northeastern corner of the bounding box
//       ],
//       updateWhenIdle: false,
//     }).setView([ethiopia.lat, ethiopia.lng], 7);

//     L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
//       attribution: "&copy; OpenStreetMap contributors",
//     }).addTo(leafletMap);


  //   fetchData("https://tbrr.echnoserve.com/api/geojson/regions").then((data) => {
  //     const regionArray = data.data;
  //     regionArray.forEach((region) => {
  //       fetchData(`https://tbrr.echnoserve.com/${region}`).then((regionData) => {
          
  //     });
  //     });
  //   });

  //   // Add more fetch calls and map interactions here

  //   setMap(leafletMap);

  //   return () => {
  //     leafletMap.remove();
  //   };
  // }, []);

  // const fetchData = (url) => {
  //   return fetch(url).then((response) => response.json());
  // };

//   return <div id="map" style={{ width: "100%", height: "500px" }}>
//     <MapContainer center={[9.145, 40.4897]} zoom={6.3}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
//         />
//       </MapContainer>
//   </div>;
// };


/////////////////////////////////

// import React, { useEffect } from 'react';
// import "leaflet/dist/leaflet.css";
// import { MapContainer, TileLayer } from 'react-leaflet';
// import L from 'leaflet'; 
// import { useGetRegionGeojsonsQuery, useGetRegionWoredasGeojsonsQuery } from '../../redux/GeoJson/RegionGeoJsonApi';
// import { useGetSiteGeojsonsQuery } from '../../redux/GeoJson/SiteGeoJsonApi';
// import {fetchRegionData, fetchSiteData} from '../Maps/FetchGeoJsonMap';
// import {SetAllRegions, SetAllSiteData, SetSelectedRegion, SetSelectedSite} from '../../redux/GeoJson/GeoJsonSlice'
// import { useDispatch, useSelector } from 'react-redux';


// import { setSiteId } from '../../redux/site/SiteByIdState';

//   var siteIcon = L.icon({
//         iconUrl: '/Marker.svg',
//         iconSize: [20, 20], 
//         iconAnchor: [16, 16], 
//     });


// export const Map = () => {
//   const { data: RegiongeojsonUrls, isSuccess:isRegionSuccess } = useGetRegionGeojsonsQuery();
//   const { data: SitegeojsonUrls, isSuccess:isSiteSuccess } = useGetSiteGeojsonsQuery();
  
//   const dispatch = useDispatch();
//   const AllSite = useSelector((state) => state.geoJson.GeoJson.AllSite);
//   const SelectedRegion = useSelector((state) => state.geoJson.GeoJson.SelectedRegion);
//   const All_Regions = useSelector((state) => state.geoJson.GeoJson.AllRegions);
// const ALL = [];
//   const Zoom  = useSelector((state) => state.geoJson.GeoJson.Zoom_out);
//   const RegionGeoJSONUrl = isRegionSuccess && RegiongeojsonUrls.data;
//   console.log("RegionGeoJSONUrl", RegionGeoJSONUrl)
//   const SitegeojsonUrl = isSiteSuccess && SitegeojsonUrls.data;

//   useEffect(() => {
//     const ethiopia = { lat: 9.145, lng: 40.4897 };
//     const map = L.map("map", {
//       minZoom: 5,
//       maxBounds: [
//         [3.306, 32.897],
//         [15.003, 48.102],
//       ],
//       updateWhenIdle: false,
//     }).setView([ethiopia.lat, ethiopia.lng], 6);
  

//     L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
//       attribution: "&copy; OpenStreetMap contributors",
//     }).addTo(map);

//     if(Zoom) {

//       map.setView([ethiopia.lat, ethiopia.lng], 6)

//     }

//     if (isRegionSuccess && RegionGeoJSONUrl) {
//       RegionGeoJSONUrl.forEach(url => {
//         fetchRegionData(url).then((data) => {
//           console.log(data);
//           L.geoJSON(data, {
//             style: {
//               fillColor: "green",

//               fillOpacity: 0.3,

//               color: "green",
//               weight: 1,
//             },
//           }).addTo(map).eachLayer((layer) => {
//             dispatch(SetAllRegions(layer))
//             ALL.push(layer);
//             console.log("All_Regions", ALL)
//             layer.on("click",() => {
//               const Region_id = parseInt(url.match(/\d+/)[0], 10); 
//               dispatch(SetSelectedRegion(Region_id));
//               console.log("gshdfvjsdvfjsgdvfsjdfvgsjf",layer)
//               Zoomer(layer)
//               layer.setStyle({ color: "black", fillOpacity: 0.6, fillColor: "black"});
//             })
//           });
//         }).catch(error => {
//           console.error("Error fetching data for URL:", url, error);
//         });
//       });
//     }

//     if (isSiteSuccess && SitegeojsonUrl) {
//       SitegeojsonUrl.forEach(url => {
//         fetchSiteData(url).then((data) => {

//           L.geoJSON(data).addTo(map).eachLayer((layer) => {
//             const coordinates = layer.getBounds().getCenter();
//               dispatch(SetAllSiteData(layer));

//             const siteMarker = L.marker(coordinates, {icon: siteIcon}).addTo(map);

//             siteMarker.on("click", function() {
//               const Site_id = parseInt(url.match(/\d+/)[0], 10); 
//               console.log("This is the marked layer that is clicked...",layer);
//               dispatch(setSiteId(Site_id));
//                Zoomer(layer);
//           })
//           });
//         }).catch(error => {
//           console.error("Error fetching data for URL:", url, error);
//         });
//       });
//     }
//     const Zoomer = (LAYER) =>{
//       console.log("lkjlkjhlk", LAYER)
//       map.fitBounds(LAYER.getBounds()); 

//       return;
//     }
//       if(SelectedRegion) {
//       const SelectedLayerID = SelectedRegion;
   
//       const { data: RegionWorodas, isSuccess:isRegionWoredaSuccess } = useGetRegionWoredasGeojsonsQuery(SelectedLayerID);
//       console.log("RegionWorodas",RegionWorodas.data)
//       //     fetchRegionData(`geojson/regions/${SelectedLayerID}.geojson`)
//       //  .then((data) => {
//       //   L.geoJSON(data, {
//       //     style: {
//       //       fillColor: "red",

//       //       fillOpacity: 0.3,

//       //       color: "green",
//       //       weight: 1,
//       //     },
//       //   }).addTo(map)

//       // })
//        console.log("const SelectedLayer = SelectedRegion.Selected ",SelectedRegion)
//       //SelectedLayer.setStyle({ color: "black", fillOpacity: 0.6, fillColor: "black"});
//     }
//     return () => {
//       map.remove();
//     };
//   }, [isRegionSuccess && RegionGeoJSONUrl, isSiteSuccess && SitegeojsonUrl, Zoom, SelectedRegion]);

//   return (
//     <div id="map" className='h-full z-10'>
//       <MapContainer center={[9.145, 40.4897]} zoom={6.3}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
//         />
//       </MapContainer>
//     </div>
//   );
// };






/////////////////////////////////////////////////
// import React, { useEffect } from 'react';
// import "leaflet/dist/leaflet.css";
// import { MapContainer, TileLayer } from 'react-leaflet';
// import L from 'leaflet'; 
// import { useGetRegionGeojsonsQuery } from '../../redux/GeoJson/RegionGeoJsonApi';
// import { useGetSiteGeojsonsQuery } from '../../redux/GeoJson/SiteGeoJsonApi';
// import { fetchRegionData, fetchSiteData } from '../Maps/FetchGeoJsonMap';
// import { SetAllRegions, SetAllSiteData, SetSelectedRegion } from '../../redux/GeoJson/GeoJsonSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSiteId } from '../../redux/site/SiteByIdState';

// export const Map = () => {
//   const dispatch = useDispatch();
//   const { data: regionGeojsonUrls, isSuccess: isRegionSuccess } = useGetRegionGeojsonsQuery();
//   const { data: siteGeojsonUrls, isSuccess: isSiteSuccess } = useGetSiteGeojsonsQuery();
//   const selectedRegion = useSelector((state) => state.geoJson.GeoJson.SelectedRegion);

//   useEffect(() => {
//     if (isRegionSuccess && regionGeojsonUrls) {
//       renderRegionGeoJSON(regionGeojsonUrls.data);
//     }
//     if (isSiteSuccess && siteGeojsonUrls) {
//       renderSiteGeoJSON(siteGeojsonUrls.data);
//     }
//   }, [isRegionSuccess, regionGeojsonUrls, isSiteSuccess, siteGeojsonUrls]);

//   const initializeMap = () => {
//     const ethiopia = { lat: 9.145, lng: 40.4897 };
//     return L.map("map", {
//       minZoom: 5,
//       maxBounds: [
//         [3.306, 32.897],
//         [15.003, 48.102],
//       ],
//       updateWhenIdle: false,
//     }).setView([ethiopia.lat, ethiopia.lng], 6);
//   };

//   const renderRegionGeoJSON = (urls) => {
//     const map = initializeMap();
//     urls.forEach(url => {
//       fetchRegionData(url).then((data) => {
//         const layer = L.geoJSON(data, {
//           style: {
//             fillColor: "green",
//             fillOpacity: 0.3,
//             color: "green",
//             weight: 1,
//           },
//         }).addTo(map);
//         layer.eachLayer((subLayer) => {
//           dispatch(SetAllRegions(subLayer));
//           subLayer.on("click",() => {
//             const regionId = parseInt(url.match(/\d+/)[0], 10); 
//             dispatch(SetSelectedRegion({ Selected: subLayer, ID: regionId }));
//             subLayer.setStyle({ color: "black", fillOpacity: 0.6, fillColor: "black" });
//           });
//         });
//       }).catch(error => {
//         console.error("Error fetching data for URL:", url, error);
//       });
//     });
//   };

//   const renderSiteGeoJSON = (urls) => {
//     urls.forEach(url => {
//       fetchSiteData(url).then((data) => {
//         const map = initializeMap();
//         const layer = L.geoJSON(data).addTo(map);
//         layer.eachLayer((subLayer) => {
//           const coordinates = subLayer.getBounds().getCenter();
//           dispatch(SetAllSiteData(subLayer));
//           const siteMarker = L.marker(coordinates, { icon: siteIcon }).addTo(map);
//           siteMarker.on("click", () => {
//             const siteId = parseInt(url.match(/\d+/)[0], 10); 
//             dispatch(setSiteId(siteId));
//             zoomToSelectedRegion(map, subLayer);
//           });
//         });
//       }).catch(error => {
//         console.error("Error fetching data for URL:", url, error);
//       });
//     });
//   };

//   const zoomToSelectedRegion = (map, layer) => {
//     map.fitBounds(layer.getBounds()); 
//   };

//   const siteIcon = L.icon({
//     iconUrl: '/Marker.svg',
//     iconSize: [20, 20], 
//     iconAnchor: [16, 16], 
//   });

//   return (
//     <div id="map" className='h-full z-10'>
//       <MapContainer center={[9.145, 40.4897]} zoom={6.3}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
//         />
//       </MapContainer>
//     </div>
//   );
// };

