import React, { useState } from 'react'
import { Cards } from '../components/dashboard/Cards'
import { Map } from '../components/dashboard/Map'
import { useGetRegion } from '../redux/InitialState/GetRegion'
import { useGetInstitution } from '../redux/InitialState/GetInstitution'
import { useGetResource } from '../redux/InitialState/GetResource'
import { GetRoles } from '../redux/InitialState/GetRoles';
import {ProfileInfo} from "../redux/InitialState/ProfileInfo"
import { useSelector } from "react-redux";
import { KebeleLocationInfo } from '../components/LocationInfo/KebeleInfo'
import { SiteLocationInfo } from '../components/LocationInfo/SiteInfo'
import { RegionLocationInfo } from '../components/LocationInfo/RegionInfo'
import { WoredaLocationInfo } from '../components/LocationInfo/WoredaInfo'
import { Default, LocationInfo } from '../components/Maps/LocationInfo'

export const Dashboard = () => {

 
  const Region_id  = useSelector((state) => state.geoJson.GeoJson.SelectedRegion);
  const defualtLocation  = useSelector((state) => state.geoJson.GeoJson.LocationInfo);
  const Site_id  = useSelector((state) => state.geoJson.GeoJson.SelectedSite);
  const Woreda_id = useSelector((state) => state.geoJson.GeoJson.SelectedWoreda);
  const Kebele_id = useSelector((state) => state.geoJson.GeoJson.SelectedKebele);

console.log("Woreda_id",Woreda_id)
  useGetRegion();
  GetRoles();
  useGetInstitution();
  useGetResource();
  ProfileInfo()

  
  return (
    <div className="flex flex-col h-screen gap-6 bg-dashbordColor">
      <Cards />
      <div className='flex w-full gap-6 h-12 lg:px-8'>
        
        <div className='w-8/12 h-18'>
          <div className='p-3'>
            <Map />
          </div>
          </div>
          {defualtLocation && <Default/>}
          {<LocationInfo />}
       { Region_id && <RegionLocationInfo/>}
      {Kebele_id && <KebeleLocationInfo/>}
      </div>
    </div>
  );
};
