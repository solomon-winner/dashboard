import React from "react";
import { useSelector } from "react-redux";
import { useGetRegionByIdQuery } from '../../redux/region/RegionApiSlice'


export const RegionLocationInfo = () => {
    const Region  = useSelector((state) => state.geoJson.GeoJson.SelectedRegion);
  
    const { data, isSuccess, isFetching } = useGetRegionByIdQuery(Region);
   const Kebeles = isSuccess && data.data.kebeles.length;
   const Woredas = isSuccess && data.data.woredas.length;
   
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
  