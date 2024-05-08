import React from "react";
import { useGetSiteByIdQuery } from "../../redux/site/SiteApiSlice";
import { useSelector } from "react-redux";
import { useGetRegionByIdQuery } from '../../redux/region/RegionApiSlice'
import { log } from "../Resource/Utility/Logger";

export const LocationInfo = () => {

   const Site_id = useSelector((state) => state.geoJson.GeoJson.SelectedSite);
   log("the location information of the site...", Site_id);

   const { data, isSuccess, isFetching } = useGetSiteByIdQuery(Site_id);
   isSuccess && log("the location data of the site...", data.data);

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
                {data && <div className="m-5">
                  <div className="flex align-bottom justify-between">
                  <strong className="text-2xl font-bold">{data.data.site_name}</strong>
                <p>site Size: {data.data.size_ha} ha</p>            
                  </div>

                <table className="table-auto w-full">
                <thead>
                  {/* <tr>
                    <th className="px-4 py-2">Field</th>
                    <th className="px-4 py-2">Value</th>
                  </tr> */}
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2 font-bold">Region Name</td>
                    <td className="border px-4 py-2">{data.data.region_name}</td>
                  </tr>

                  <tr>
                    <td className="border px-4 py-2 font-bold">Zone Name</td>
                    <td className="border px-4 py-2">{data.data.zone_name}</td>
                  </tr>

                  <tr>
                    <td className="border px-4 py-2 font-bold">Woreda Name</td>
                    <td className="border px-4 py-2">{data.data.woreda_name}</td>
                  </tr>

                  <tr>
                    <td className="border px-4 py-2 font-bold">Kebele Name</td>
                    <td className="border px-4 py-2">{data.data.kebele_name}</td>
                  </tr>


                  <tr>
                    <td className ="border px-4 py-2 font-bold">Site Size</td>
                    <td className ="border px-4 py-2">{data.data.size_ha}</td>
                  </tr>

                  <tr>
                    <td className ="border px-4 py-2 font-bold">Water shed Name</td>
                    <td className ="border px-4 py-2">{data.data.watershed_name}</td>
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


export const RegionLocationInfo = () => {
  const Region  = useSelector((state) => state.geoJson.GeoJson.SelectedRegion);

  log("the location information of the region...", Region.Selected);

  const { data, isSuccess, isFetching } = useGetRegionByIdQuery(Region.ID);
 const Kebeles = isSuccess && data.data.kebeles.length;
 const Woredas = isSuccess && data.data.woredas.length;
  log("the location information of the region...", Region.ID);
 
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