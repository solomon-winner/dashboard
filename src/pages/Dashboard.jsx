import React, { useState } from 'react'
import { Cards } from '../components/dashboard/Cards'
import { Map } from '../components/dashboard/Map'
import { useGetRegion } from '../redux/InitialState/GetRegion'
import { useGetInstitution } from '../redux/InitialState/GetInstitution'
import { useGetResource } from '../redux/InitialState/GetResource'
import { GetRoles } from '../redux/InitialState/GetRoles';
import {ProfileInfo} from "../redux/InitialState/ProfileInfo"
import { LocationInfo, RegionLocationInfo} from '../components/Maps/LocationInfo'
import { useDispatch, useSelector } from "react-redux";
import { Filter } from '../components/Maps/Filter'
import { SetZoom_out } from "../redux/GeoJson/GeoJsonSlice";

export const Dashboard = () => {

 
  const Region_id  = useSelector((state) => state.geoJson.GeoJson.SelectedRegion);
  const Site_id = useSelector((state) => state.siteById.Id);
  useGetRegion();
  GetRoles();
  useGetInstitution();
  useGetResource();
  ProfileInfo()

  

 
  return (
    <div className="flex flex-col h-screen gap-6 bg-dashbordColor">
      <Cards />
      <Filter/>
      <div className='flex w-full gap-6 h-12 lg:px-8'>
        
        <div className='w-8/12 h-18'>
          <h1 className='text-xl font-semibold'>Degraded sites Map</h1>
          <div className='p-3'>
            <Map />
          </div>
          </div>
          { Site_id && <LocationInfo />}
       { Region_id && <RegionLocationInfo/>}


      </div>
    </div>
  );
};
