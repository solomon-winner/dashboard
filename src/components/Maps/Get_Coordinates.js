async function Get_Coordinates(geoJSON) {
    try {
      const response = await fetch(`https://tbrr.echnoserve.com${geoJSON}`);
      const data = await response.json();
      if (data.features && data.features.length > 0 && data.features[0].geometry && data.features[0].geometry.coordinates.length > 0) {
        return data.features[0].geometry.coordinates[0][0];
      } else {
        return "No Coordinate";
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      return "No Coordinate";
    }
  }
  