import { storageUrl } from "../../redux/app/api/baseApi";
import { log } from "../Resource/Utility/Logger";

export const fetchRegionData = async (url) => {
  try {
      let correctedUrl = url.startsWith('/') ? url : `/${url}`;
      const response = await fetch(`https://tbrr.echnoserve.com${correctedUrl}`);
      return await response.json();
  } catch (error) {
      log("Error fetching data:", error);
      throw error;
  }
};

  export const fetchSiteData = async (url) => {
    try {
      const response = await fetch(`${storageUrl}${url}`);
      return await response.json();
    } catch (error) {
      log("Error fetching data:", error);
      throw error;
    }
  };

  export const Get_Coordinates = async (geoJSON) =>{
    try {
      const response = await fetch(`${storageUrl}${geoJSON}`);
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
