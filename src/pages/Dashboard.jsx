import React from 'react'
import { Cards } from '../components/dashboard/Cards'
import RecentlyAdded from '../components/dashboard/RecentlyAdded'
import { Map } from '../components/dashboard/Map'
import { useGetRegion } from '../redux/InitialState/GetRegion'
import { useGetInstitution } from '../redux/InitialState/GetInstitution'
import { useGetResource } from '../redux/InitialState/GetResource'
import { GetRoles } from '../redux/InitialState/GetRoles';
import {ProfileInfo} from "../redux/InitialState/ProfileInfo"
import { LocationInfo } from '../components/Maps/LocationInfo'
import { useDispatch, useSelector } from 'react-redux'
import { SetZoom_out } from '../redux/GeoJson/GeoJsonSlice'
export const Dashboard = () => {
  const dispatch = useDispatch()
  const Zoom = useSelector((state) => state.geoJson.GeoJson.Zoom_out);
  useGetRegion();
  GetRoles();
  useGetInstitution();
  useGetResource();
  ProfileInfo()
  const Zoom_out = (e) =>        {
    e.preventDefault();
    dispatch(SetZoom_out(true));
    console.log("The zoom inside the Zoom_out...", Zoom)

  }
  return (
    <div className='flex flex-col h-screen gap-6 bg-dashbordColor'> 
      <Cards />
      <div className='flex w-full gap-6 h-12 lg:px-8'>
        <div className='w-8/12 h-18'>
          <h1 className='text-xl font-semibold'>Degraded sites Map</h1>
          <div className='p-3'>
            <button className='border-green-500 text-black font-bold hover:bg-white  rounded-md' onClick={Zoom_out}>Zoom Out</button>
           {  console.log("this is zoom", Zoom)}
            <Map />
          </div>
          </div>
          <LocationInfo />
        

      </div>

    </div>
  )
}
