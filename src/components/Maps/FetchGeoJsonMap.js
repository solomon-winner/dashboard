export const fetchRegionData = async (url) => {
  try {
      let correctedUrl = url.startsWith('/') ? url : `/${url}`;
      const response = await fetch(`https://tbrr.echnoserve.com${correctedUrl}`);
      return await response.json();
  } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
  }
};


  export const fetchSiteData = async (url) => {
    try {
      const response = await fetch(`https://tbrr.echnoserve.com${url}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

