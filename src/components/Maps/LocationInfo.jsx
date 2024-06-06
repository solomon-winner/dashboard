import React, { useEffect } from "react";
import { useGetSiteByIdQuery } from "../../redux/site/SiteApiSlice";
import { useSelector } from "react-redux";
import { useGetRegionByIdQuery } from '../../redux/region/RegionApiSlice'
import { log } from "../Resource/Utility/Logger";
import { useState } from "react";

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


export const Default = () => {
  return(
    <div className="d-flex min-w-80">
    <div className="w-50" style={{ border: '1px solid gray' }}>
      <div className="container project-container">
        <div className="card">
        <div className="bg-gray-200 border-gray-400">
            <p className="text-lg font-bold ml-5">Detailed location Information</p>
          </div>
          <div className="card-body">
            <p>Select a region to view detailed location information.</p>
            </div>
            </div>
            </div>
            </div>
            </div>
  )
}

export const LocationInfo = () => {
  const [coordinates, setCoordinates] = useState(["Loading..."]);

  const Site_id = useSelector((state) => state.geoJson.GeoJson.SelectedSite);
  console.log("the location information of the site...", Site_id);
  const { data, isSuccess, isFetching } = useGetSiteByIdQuery(Site_id);
  const siteData = isSuccess && data.data;

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (siteData && siteData.geojson) {
        const result = await Get_Coordinates(siteData.geojson);
        setCoordinates(result);
      }
    };

    fetchCoordinates();
  }, [siteData]);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <div className="d-flex min-w-80">
      <div className="w-50" style={{ border: '1px solid gray' }}>
        <div className="container project-container">
          <div className="card">
            <div className="bg-gray-200 border-gray-400">
              <p className="text-lg font-bold ml-5">Detailed location Information</p>
            </div>
            <div className="card-body" style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '80vh' }}>
              {!data && <p>Select a region to view detailed location information.</p>}
              {data && (
                <div className="m-5">
                  <div className="flex align-bottom justify-between">
                    <strong className="text-2xl font-bold">{data.data.site_name}</strong>
                    <p>site Size: {data.data.size_ha} ha</p>
                  </div>

                  <div>
                    <hr />
                    <h6 className="px-4 py-2 underline">Site Information</h6>
         
                    <p className="px-2 py-2">
                      <strong>Watershed: </strong>
                      {siteData.watershed_name !== undefined ? siteData.watershed_name : "No data"}
                    </p>
                    <p className="px-2 py-2">
                      <strong>Kebele: </strong>
                      {siteData.kebele_name !== undefined ? siteData.kebele_name : "No data"}
                    </p>
                    <p className="px-2 py-2">
                      <strong>Woreda: </strong>
                      {siteData.woreda_name || "No data"}
                    </p>
                    <p className="px-2 py-2">
                      <strong>Zone: </strong>
                      {siteData.zone_name || "N/A"}
                    </p>
                    <h4 className="px-4 py-2 underline">Site Resource</h4>
                    <hr />
                    <strong>Current land use</strong>
                    <hr />
                    {siteData.resources?.map((resource, resourceIndex) =>
                      resource.LAND?.map((item, itemIndex) => (
                        <div key={`${resourceIndex}-${itemIndex}`}>
                          <p className="border px-4 py-2">{item.value}</p>
                        </div>
                      ))
                    )}
                    <strong>TREE</strong>
                    <hr />
                    <p className="px-4 py-2 underline">Indigenous Tree</p>
                    {siteData.resources?.map((resource, resourceIndex) =>
                      resource.TREE?.filter(tree => tree.indigenous === 1).map((item, itemIndex) => (
                        <div key={`${resourceIndex}-${itemIndex}`}>
                          <p className="border px-4 py-2">{item.value}</p>
                        </div>
                      ))
                    )}
                    <p className="px-4 py-2 underline">Exotic Tree</p>
                    <hr />
                    {siteData.resources?.map((resource, resourceIndex) =>
                      resource.TREE?.filter(tree => !tree.hasOwnProperty("indigenous")).map((item, itemIndex) => (
                        <div key={`${resourceIndex}-${itemIndex}`}>
                          <p className="border px-4 py-2">{item.value}</p>
                        </div>
                      ))
                    )}
                    <strong>LIVESTOCK</strong>
                    <hr />
                    {siteData.resources?.map((resource, resourceIndex) =>
                      resource.LIVESTOCK?.map((item, itemIndex) => (
                        <div key={`${resourceIndex}-${itemIndex}`}>
                          <p className="border px-4 py-2">{item.value}</p>
                        </div>
                      ))
                    )}
                    <strong>FORAGE</strong>
                    <hr />
                    {siteData.resources?.some(resource => resource.FORAGE?.length === 0) ? (
                      <p>No Data Entered</p>
                    ) : (
                      siteData.resources?.map((resource, resourceIndex) =>
                        resource.FORAGE?.map((item, itemIndex) => (
                          <div key={`${resourceIndex}-${itemIndex}`}>
                            <p className="border px-4 py-2">{item.value}</p>
                          </div>
                        ))
                      )
                    )}
                    <strong>Coordinates</strong>
                    <hr />
                    {coordinates === "No Coordinate" ? (
                      <p className="border px-4 py-2">No Coordinate</p>
                    ) : (
                      <table className="table-auto w-full">
                        <thead>
                          <tr>
                            <th>Latitude</th>
                            <th>Longitude</th>
                          </tr>
                        </thead>
                        <tbody>
                          {coordinates.map((coords, index) => (
                            <tr key={index}>
                              <td className="border px-4 py-2">{coords[0]}</td>
                              <td className="border px-4 py-2">{coords[1]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export const RegionLocationInfo = () => {
  const Region  = useSelector((state) => state.geoJson.GeoJson.SelectedRegion);

  log("the location information of the region...", Region);

  const { data, isSuccess, isFetching } = useGetRegionByIdQuery(Region);
 const Kebeles = isSuccess && data.data.kebeles.length;
 const Woredas = isSuccess && data.data.woredas.length;
  log("the location information of the region...", Region);
 
   return(
       <div className="d-flex min-w-80">

       <div className="w-50" style={{ border: '1px solid gray' }}>
         <div className="container project-container">
           <div className="card">
           <div className="bg-gray-200 border-gray-400">
               <p className="text-lg font-bold ml-5">Detailed location Information</p>
             </div>
             <div className="card-body">
               {!data && <p>Select a region to view detailed location information.</p>}
               {data && <div className="m-5"><strong className="text-2xl font-bold">{data.data.region_name}</strong>
               <table class="table-auto w-full">
               <thead>
                 {/* <tr>
                   <th class="px-4 py-2">Field</th>
                   <th class="px-4 py-2">Value</th>
                 </tr> */}
               </thead>
               <tbody>
                 <tr>
                   <td className="border px-4 py-2 font-bold">Region Name</td>
                   <td className="border px-4 py-2">{data.data.region_name}</td>
                 </tr>

                 <tr>
                   <td className="border px-4 py-2 font-bold">Region Code</td>
                   <td className="border px-4 py-2">{data.data.region_code}</td>
                 </tr>

                 <tr>
                   <td className="border px-4 py-2 font-bold">Number of site</td>
                   <td className="border px-4 py-2">{data.data.sites}</td>
                 </tr>

                 <tr>
                   <td className="border px-4 py-2 font-bold">Number of Kebele</td>
                   <td className="border px-4 py-2">{Kebeles}</td>
                 </tr>


                 <tr>
                   <td className="border px-4 py-2 font-bold">Number of Woredas</td>
                   <td className="border px-4 py-2">{Woredas}</td>
                 </tr>



               </tbody>
             </table>
             </div>
               }

             </div>
             <div>

             </div>
           </div>
         </div>
       </div>
     </div>
  )
}

export const WoredaLocationInfo = () => {
  const Woreda_id = useSelector((state) => state.geoJson.GeoJson.SelectedWoreda);
  const { data, isSuccess, isFetching } = useGetSiteByIdQuery(Site_id);
  const WoredaData = isSuccess && data.data;

  const dataRows = [
    {
      label: "Female Population",
      value:
        woredaData.woreda_data?.female_population !== undefined
          ? woredaData.woreda_data.female_population
          : "No data",
    },
    {
      label: "Male Population",
      value:
        woredaData.woreda_data?.male_population !== undefined
          ? woredaData.woreda_data.male_population
          : "No data",
    },
    {
      label: "Rural Kebeles",
      value:
        woredaData.woreda_data?.rural_kebeles !== undefined
          ? woredaData.woreda_data.rural_kebeles
          : "No data",
    },
    {
      label: "Urban Kebeles",
      value:
        woredaData.woreda_data?.urban_kebeles !== undefined
          ? woredaData.woreda_data.urban_kebeles
          : "No data",
    },
  ];


  return(
    <div>
 
                <h4>${woredaData.woreda_name}</h4>
                <hr />
                <table class="table-auto w-full">
                    <tbody>${renderTableRows([
                      {
                        label: "Woreda Name",
                        value:
                          woredaData.woreda_name !== undefined
                            ? woredaData.woreda_name
                            : "No data",
                      },
                      {
                        label: "Woreda Code",
                        value:
                          woredaData.woreda_code !== undefined
                            ? woredaData.woreda_code
                            : "No data",
                      },
                      {
                        label: "Region Name",
                        value:
                          woredaData.region_name !== undefined
                            ? woredaData.region_name
                            : "No data",
                      },
                      {
                        label: "Zone Name",
                        value:
                          woredaData.zone_name !== undefined
                            ? woredaData.zone_name
                            : "No data",
                      },
                    ])}</tbody>
                </table>
                <hr/>
                <h6>Woreda Data</h6>
                <hr/>
                <table class="table-auto w-full">
                    <tbody>${renderTableRows(dataRows)}</tbody>
                </table>
                <hr />
                <h4>Woreda Resource</h4>
                <hr />
                ${
                  woredaData.woreda_resource.length !== 0
                    ? resourceTables(woredaData.woreda_resource?.LAND, "LAND")
                    : ""
                }
                ${
                  woredaData.woreda_resource.length !== 0
                    ? resourceTables(woredaData.woreda_resource?.ROAD, "ROAD")
                    : ""
                }
                ${
                  woredaData.woreda_institution.length !== 0
                    ? resourceTables(
                        woredaData.woreda_institution?.SCHOOL,
                        "School"
                      )
                    : ""
                }
                ${
                  woredaData.woreda_institution.length !== 0
                    ? resourceTables(
                        woredaData.woreda_institution?.HEALTH_FACILITY,
                        "Health Facility"
                      )
                    : ""
                }
            
          
    </div>
  )
}