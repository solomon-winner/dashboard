import React from 'react'
import { Cards } from '../components/dashboard/Cards'
import RecentlyAdded from '../components/dashboard/RecentlyAdded'
import { Map } from '../components/dashboard/Map'
import { useGetRegion } from '../redux/InitialState/GetRegion'
import { useGetInstitution } from '../redux/InitialState/GetInstitution'
import { useGetResource } from '../redux/InitialState/GetResource'
import { GetRoles } from '../redux/InitialState/GetRoles';
import {ProfileInfo} from "../redux/InitialState/ProfileInfo"
export const Dashboard = () => {
  useGetRegion();
  GetRoles();
  useGetInstitution();
  useGetResource();
  ProfileInfo()
  return (
    <div className='flex flex-col h-screen gap-6'> 
      <Cards />
      <div className='flex w-full gap-6 sm:px-6 h-full lg:px-8'>
        <div className='w-6/12 h-full'>
          <h1 className='text-xl font-semibold'>Degraded sites Map</h1>
          <div className='p-6'>
            <Map />
          </div>
          </div>
        <div className='w-6/12 h-full'>
        <h1 className='text-xl font-semibold'>Recently Added</h1>
          <RecentlyAdded />
          </div>
      </div>
    </div>
  )
}
