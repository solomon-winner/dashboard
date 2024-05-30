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

  
//https://tbrr.echnoserve.com/api/geojson/regions/13/woredas
