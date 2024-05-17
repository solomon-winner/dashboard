import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { fetchSiteData } from "../../Maps/FetchGeoJsonMap";
import { log } from "../Utility/Logger";

export const EachMap = ({ geojsonData, SiteData }) => {
  const mapRef = useRef(null);
  var siteIcon = L.icon({
    iconUrl: "/Marker.svg",
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

      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
        }
      ).addTo(mapRef.current);
    }

    // Fetch the GeoJSON data
    const fetchAndDisplayGeoJSON = async () => {
      try {
        const geojson = await fetchSiteData(geojsonData);
        if (!geojson || !geojson.features) {
          const ethiopia = { lat: 9.145, lng: 40.4897 };
          // Display "NoData" on the map if geojsonData is not provided
          const noDataMarker = L.marker([ethiopia.lat, ethiopia.lng], {
            icon: L.divIcon({
              className: 'no-data-marker',
              html: '<div class="text-4xl text-black font-bold">NoData</div>',
              iconSize: [100, 40],
              iconAnchor: [50, 20],
            }),
          }).addTo(mapRef.current);
          document.getElementById("map").classList.add("filter", "bg-black", "opacity-60");
          // // noDataMarker.bindTooltip("NoData", {
          // //   permanent: true,
          // //   direction: "top",
          // });
          return;
        }
        const geojsonLayer = L.geoJSON(geojson, {
          style: {
            fillOpacity: 0.05, // Adjust this value to your desired opacity level
          },
        }).addTo(mapRef.current);
        // Calculate bounds and set the map view to these bounds
        const bounds = geojsonLayer.getBounds();
        mapRef.current.fitBounds(bounds);
        // Calculate the zoom level that fits the bounds
        const zoomLevel = mapRef.current.getBoundsZoom(bounds);
        // Set the minimum zoom level to the calculated zoom level
        // mapRef.current.setMinZoom(zoomLevel);
        // Center the map to the bounds
        mapRef.current.setView(bounds.getCenter(), zoomLevel);

        // Update the map's maxBounds based on the fetched sites
        // mapRef.current.setMaxBounds(bounds);

        // Place markers on the sites if SiteIds are provided
        if (SiteData && SiteData.length > 0) {
          SiteData.forEach(async (sites) => {
            log("this is site id", sites);
            if (sites.id) {
              log("Site ID:", sites.id, "Site Name:", sites.site_name);

              try {
                const siteGeoJsonData = await fetchSiteData(
                  `/geojson/sites/${sites.id}.geojson`
                );

                if (siteGeoJsonData && siteGeoJsonData.features) {
                  L.geoJSON(siteGeoJsonData)
                    .addTo(mapRef.current)
                    .eachLayer((layer) => {
                      const coordinates = layer.getBounds().getCenter();
                      log(
                        `/geojson/sites/${sites.id}.geojson`,
                        "All data...***"
                      );

                      const siteMarker = L.marker(coordinates, {
                        icon: siteIcon,
                      }).addTo(mapRef.current);

                      // Use sites.site_name directly from the SiteData object
                      siteMarker.bindTooltip(sites.site_name, {
                        permanent: false, // Set to true if you want the tooltip to be always visible
                        direction: "top", // Direction of the tooltip, can be 'top', 'bottom', 'left', 'right'
                      });

                      siteMarker.on("click", function () {
                        log(
                          "This is the marked layer that is clicked...",
                          sites.id
                        );
                        // dispatch(setSiteId(sites.id));
                        mapRef.current.fitBounds(layer.getBounds());
                      });
                    });
                } else {
                  console.error("Invalid GeoJSON data for site", sites.id);
                }
              } catch (error) {}
            } else {
              const sitesArray = Array.isArray(sites) ? sites : [sites];
              sitesArray.forEach(async (site) => {
                log("Site ID:", site.id, "Site Name:", site.site_name);
                try {
                  const siteGeoJsonData = await fetchSiteData(
                    `/geojson/sites/${site.id}.geojson`
                  );

                  if (siteGeoJsonData && siteGeoJsonData.features) {
                    L.geoJSON(siteGeoJsonData)
                      .addTo(mapRef.current)
                      .eachLayer((layer) => {
                        const coordinates = layer.getBounds().getCenter();
                        log(
                          `/geojson/sites/${site.id}.geojson`,
                          "All data...***"
                        );

                        const siteMarker = L.marker(coordinates, {
                          icon: siteIcon,
                        }).addTo(mapRef.current);

                        // Use site.site_name directly from the SiteData object
                        siteMarker.bindTooltip(site.site_name, {
                          permanent: false, // Set to true if you want the tooltip to be always visible
                          direction: "top", // Direction of the tooltip, can be 'top', 'bottom', 'left', 'right'
                        });

                        siteMarker.on("click", function () {
                          log(
                            "This is the marked layer that is clicked...",
                            site.id
                          );
                          // dispatch(setSiteId(site.id));
                          mapRef.current.fitBounds(layer.getBounds());
                        });
                      });
                  } else {
                    console.error("Invalid GeoJSON data for site", site.id);
                  }
                } catch (error) {
                  console.error(
                    "Error fetching GeoJSON data for site:",
                    site.id,
                    error
                  );
                }
              });
            }
          });
        }
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
      }
    };

    fetchAndDisplayGeoJSON();
  }, [geojsonData, SiteData]); // Depend on geojsonData and SiteIds to refetch if they change

  return <div id="map" className="h-full z-10"></div>;
};
