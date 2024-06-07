import React, { useState } from 'react'
import { Cards } from '../components/dashboard/Cards'
import { Map } from '../components/dashboard/Map'
import { useGetRegion } from '../redux/InitialState/GetRegion'
import { useGetInstitution } from '../redux/InitialState/GetInstitution'
import { useGetResource } from '../redux/InitialState/GetResource'
import { GetRoles } from '../redux/InitialState/GetRoles';
import {ProfileInfo} from "../redux/InitialState/ProfileInfo"
import { Default, LocationInfo, RegionLocationInfo, WoredaLocationInfo} from '../components/Maps/LocationInfo'
import { useDispatch, useSelector } from "react-redux";
import { Filter } from '../components/Maps/Filter'
import { SetZoom_out } from "../redux/GeoJson/GeoJsonSlice";
import { log } from '../components/Resource/Utility/Logger'

export const Dashboard = () => {

 
  const Region_id  = useSelector((state) => state.geoJson.GeoJson.SelectedRegion);
  const defualtLocation  = useSelector((state) => state.geoJson.GeoJson.LocationInfo);
  const Site_id  = useSelector((state) => state.geoJson.GeoJson.SelectedSite);
  const Woreda_id = useSelector((state) => state.geoJson.GeoJson.selectedWoreda);
console.log("Woreda_id",Woreda_id)
  // const Site_id = useSelector((state) => state.siteById.Id);
  useGetRegion();
  GetRoles();
  useGetInstitution();
  useGetResource();
  ProfileInfo()

  
  return (
    <div className="flex flex-col h-screen gap-6 bg-dashbordColor">
      <Cards />
      {/* <Filter/> */}
      <div className='flex w-full gap-6 h-12 lg:px-8'>
        
        <div className='w-8/12 h-18'>
          <div className='p-3'>
            <Map />
          </div>
          </div>
          {defualtLocation && <Default/>}
          { Site_id && <LocationInfo />}
       { Region_id && <RegionLocationInfo/>}
      {Woreda_id && <WoredaLocationInfo/>}

      </div>
    </div>
  );
};
