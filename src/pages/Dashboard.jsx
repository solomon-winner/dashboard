import React from 'react'
import { Cards } from '../components/dashboard/Cards'
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
    <div className="flex flex-col h-screen gap-6 bg-dashbordColor">
      <Cards />
      <div className='flex flex-col lg:flex-row w-full gap-6 h-auto lg:h-12 lg:px-8'>
        <div className='w-full lg:w-8/12 h-auto lg:h-18'>
          <div className='p-3'>
            <Map />
          </div>
        </div>
        <div className='w-full lg:w-4/12'>
          <LocationInfo />
        </div>
      </div>
    </div>
  );
}  
