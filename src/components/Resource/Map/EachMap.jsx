import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { fetchSiteData } from '../../Maps/FetchGeoJsonMap'; 

export const EachMap = ({ geojsonData, SiteIds }) => {
    console.log("this is site data", SiteIds);
    const mapRef = useRef(null);
    var siteIcon = L.icon({
        iconUrl: '/Marker.svg',
        iconSize: [20, 20], 
        iconAnchor: [16, 16], 
    });

    useEffect(() => {
        if (!mapRef.current) {
            const ethiopia = { lat: 9.145, lng: 40.4897 };
            mapRef.current = L.map("map", {
                minZoom: 6,
                updateWhenIdle: false,
            }).setView([ethiopia.lat, ethiopia.lng], 5);
        
            L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
                attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
            }).addTo(mapRef.current);
        }
    
        // Fetch the GeoJSON data
        const fetchAndDisplayGeoJSON = async () => {
            try {
                const geojson = await fetchSiteData(geojsonData);
                if (!geojson || !geojson.features) {
                    console.error("Invalid GeoJSON data");
                    return;
                }
                const geojsonLayer = L.geoJSON(geojson, {
                    style: {
                        fillOpacity: 0.05 // Adjust this value to your desired opacity level
                    }
                }).addTo(mapRef.current);
                // Calculate bounds and set the map view to these bounds
                const bounds = geojsonLayer.getBounds();
                mapRef.current.fitBounds(bounds);
                // Calculate the zoom level that fits the bounds
                const zoomLevel = mapRef.current.getBoundsZoom(bounds);
                // Set the minimum zoom level to the calculated zoom level
                mapRef.current.setMinZoom(zoomLevel);
                // Center the map to the bounds
                mapRef.current.setView(bounds.getCenter(), zoomLevel);
    
                // Update the map's maxBounds based on the fetched sites
                mapRef.current.setMaxBounds(bounds);

                // Place markers on the sites if SiteIds are provided
                if (SiteIds && SiteIds.length > 0) {
                    SiteIds.flat().forEach(async (SiteId) => {
                        console.log("this is site id", SiteId);
                        const siteGeoJsonData = await fetchSiteData(`/geojson/sites/${SiteId}.geojson`);
                        if (siteGeoJsonData && siteGeoJsonData.features) {
                            L.geoJSON(siteGeoJsonData).addTo(mapRef.current).eachLayer((layer) => {
                                const coordinates = layer.getBounds().getCenter();
                                console.log(`/geojson/sites/${SiteId}.geojson`, "All data...***");

                                const siteMarker = L.marker(coordinates, { icon: siteIcon }).addTo(mapRef.current);

                                siteMarker.on("click", function() {
                                    const Site_id = parseInt(SiteId, 10); 
                                    console.log("This is the marked layer that is clicked...", Site_id);
                                    // dispatch(setSiteId(Site_id));
                                    mapRef.current.fitBounds(layer.getBounds());
                                });
                            });
                        } else {
                            console.error("Invalid GeoJSON data for site", SiteId);
                        }
                    });
                }
            } catch (error) {
                console.error("Error fetching GeoJSON data:", error);
            }
        };
    
        fetchAndDisplayGeoJSON();
    }, [geojsonData, SiteIds]); // Depend on geojsonData and SiteIds to refetch if they change

    return (
        <div id="map" className='h-full z-10'></div>
    );
};