import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { fetchSiteData } from '../../Maps/FetchGeoJsonMap'; 

export const EachMap = ({ geojsonData }) => {
    const mapRef = useRef(null);
    
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
            } catch (error) {
                console.error("Error fetching GeoJSON data:", error);
            }
        };
    
        fetchAndDisplayGeoJSON();
    }, [geojsonData]); // Depend on geojsonData to refetch if it changes

    return (
        <div id="map" className='h-full'></div>
    );
};