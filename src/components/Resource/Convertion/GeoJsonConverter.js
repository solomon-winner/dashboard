import React from 'react';
import UTM from 'utm-latlng';

const GeoJsonConverter = {
  convert: async (geojsonFile) => {
    try {
      const geoJson = await GeoJsonConverter.readFile(geojsonFile);
      if (GeoJsonConverter.isLatLngFormat(geoJson)) {
        console.log('GeoJSON is already in latlng format, no conversion needed.');
        return await GeoJsonConverter.createFile(geoJson);
      } else {
        console.log('GeoJSON is in UTM format, converting to latlng...');
        const convertedGeoJson = await GeoJsonConverter.convertToLatLng(geoJson);
        return await GeoJsonConverter.createFile(convertedGeoJson);
      }
    } catch (error) {
      console.error('An unhandled error was caught from submitForm()', error);
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

  convertToLatLng: async (geoJson) => {
    const convertedGeoJson = { ...geoJson };

    function utmToLatLon(utmCoords) {
      const { easting, northing, zoneNumber, zoneLetter } = utmCoords;
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
              const utmCoords = { easting: point[0], northing: point[1], zoneNumber: 37, zoneLetter: 'N' };
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
    });

    return convertedGeoJson;
  },

  createFile: async (geoJson) => {
    console.log(geoJson)
    const jsonString = JSON.stringify(geoJson);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'convertedGeoJson.json');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    URL.revokeObjectURL(url);
    return blob;
  },
};

export default GeoJsonConverter;

