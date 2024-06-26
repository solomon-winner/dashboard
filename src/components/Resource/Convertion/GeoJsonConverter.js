import React from 'react';
import UTM from 'utm-latlng';
import { log } from '../Utility/Logger';

const GeoJsonConverter = {
  convert: async (geojsonFile, name, watershed) => {
    try {
      const geoJson = await GeoJsonConverter.readFile(geojsonFile);
      if (GeoJsonConverter.isLatLngFormat(geoJson)) {
        log('GeoJSON is already in latlng format, no conversion needed.');
        return await GeoJsonConverter.createFile(geoJson);
      } else {
        log('GeoJSON is in UTM format, converting to latlng...');
        const utmZone = GeoJsonConverter.extractUTMZone(geoJson);
        const convertedGeoJson = await GeoJsonConverter.convertToLatLng(geoJson, name, watershed, utmZone);
        return await GeoJsonConverter.createFile(convertedGeoJson);
      }
    } catch (error) {
      log('An unhandled error was caught from submitForm()', error);
      throw new Error('Error converting GeoJSON:', error);
    }
  },

  readFile: async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = JSON.parse(event.target.result);
        resolve(result);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  },

  isLatLngFormat: (geoJson) => {
    const firstFeature = geoJson.features[0];
    if (!firstFeature) return false; // Assuming it needs conversion if no features are present
    const firstCoordinate = firstFeature.geometry.coordinates[0][0][0];
    const isLatLng = firstCoordinate.every(coord => typeof coord === 'number' && (coord >= -180 && coord <= 180));
    return isLatLng;
  },

  extractUTMZone: (geoJson) => {
    const crs = geoJson.crs;
    if (crs && crs.properties && crs.properties.name) {
        const match = crs.properties.name.match(/EPSG::(\d+)/);
        if (match) {
            const epsgCode = parseInt(match[1], 10);
            const zone = epsgCode % 100; // Extracting the last two digits
            if (zone >= 1 && zone <= 60) {
              console.log('UTM zone number:', zone);
                return zone; // Valid UTM zone number
            }
        }
    }
    throw new Error('Unable to determine UTM zone from GeoJSON CRS.');
},


  convertToLatLng: async (geoJson, name, watershed, zoneNumber) => {
    const convertedGeoJson = { ...geoJson };

    function utmToLatLon(utmCoords) {
      const { easting, northing, zoneLetter } = utmCoords;
      const utm = new UTM();
      const latLon = utm.convertUtmToLatLng(easting, northing, zoneNumber, zoneLetter);
      return { latitude: latLon.lat, longitude: latLon.lng };
    }

    function convertCoordinates(feature) {
      const geometry = feature.geometry;
      if (geometry.type === 'MultiPolygon') {
        const convertedCoordinates = geometry.coordinates.map(polygon => {
          return polygon.map(ring => {
            return ring.map(point => {
              const utmCoords = { easting: point[0], northing: point[1], zoneNumber, zoneLetter: 'N' };
              const latLon = utmToLatLon(utmCoords);
              return [latLon.longitude, latLon.latitude];
            });
          });
        });
        geometry.coordinates = convertedCoordinates;
      }
    }

    convertedGeoJson.features.forEach(feature => {
      convertCoordinates(feature);
      feature.properties.name = name; // Add name property to each feature
      feature.properties.watershed = watershed; // Add id property to each feature
    });

    return convertedGeoJson;
  },

  createFile: async (geoJson) => {
    const jsonString = JSON.stringify(geoJson);
    const blob = new Blob([jsonString], { type: 'application/json' });
    // Create a File object from the Blob
    const file = new File([blob], 'convertedGeoJson.json', { type: 'application/json' });
    return file;
  },
};

export default GeoJsonConverter;
