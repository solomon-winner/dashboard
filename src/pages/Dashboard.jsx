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
export const Dashboard = () => {
  useGetRegion();
  GetRoles();
  useGetInstitution();
  useGetResource();
  ProfileInfo()
  return (
    <div className='flex flex-col h-screen gap-6 bg-dashbordColor'> 
      <Cards />
      <div className='flex w-full gap-6 h-12 lg:px-8'>
        <div className='w-8/12 h-18'>
          <h1 className='text-xl font-semibold'>Degraded sites Map</h1>
          <div className='p-3'>
            <Map />
          </div>
          </div>
          <LocationInfo />
        

      </div>

    </div>
  )
}
