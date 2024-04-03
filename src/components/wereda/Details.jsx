import React from 'react'
import { Link, useParams } from 'react-router-dom'

import { useGetWeredaByIdQuery } from '../../redux/wereda/WeredaApiSlice'
import MainLoading from "../Resource/Loading/MainLoading";
import { useInitalValueworeda } from '../../redux/InitialState/initalValueWoreda';


export const WeredaDetails = () => {
  const { id } = useParams(); 
  useInitalValueworeda(id);

  const {data: weredadata, isSuccess,isFetching}=useGetWeredaByIdQuery(id)

  const goBack = () => {

    window.history.back();
  }
  
  if(!isSuccess || isFetching){
    return <div className="flex justify-center items-center h-screen">
    <MainLoading />
  </div>
  }
  const {woreda_name, woreda_data, region_id  } = weredadata.data
  return (
    <div>
      <div className='flex justify-between p-10'>
        <button onClick={goBack} className='py-1 px-4 rounded-md bg-mainColor text-white hover:bg-customDark font-semibold'>back</button>
        <div className='flex gap-4'>
        <button  className='py-1 px-4 rounded-md bg-red-600 hover:bg-red-400 text-white font-semibold'>Delete Wereda</button>
        <Link to={`/admin/update-weredaData/${id}`}className='py-1 px-4 rounded-md bg-blue-500 hover:bg-blue-400 text-white font-semibold'>Update WeredaData</Link>
        <Link to={`/admin/update-wereda/${id}`}className='py-1 px-4 rounded-md bg-blue-500 hover:bg-blue-400 text-white font-semibold'>Update Wereda</Link>
        </div>
      </div>
      <div className="bg-white py-12 sm:py-12">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-2xl sm:text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Wereda Name: {woreda_name}</h2>
    </div>
    <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
      <div className="p-8 text-gray-600 sm:p-10 lg:flex-auto">
        <h3 className="text-2xl font-bold tracking-tight text-customDark ">Region ID: {region_id}</h3>

        <div className='flex flex-col gap-2'> 
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Total number of Kebele per Wereda</h1>
           <p className='font-semibold'>Urban Kebeles: <span className='font-normal'>{woreda_data?.urban_kebeles}</span></p>
           <p className='font-semibold'>Rural Kebeles: <span className='font-normal'>{woreda_data?.rural_kebeles}</span></p>
        </div>

        <div className='flex flex-col gap-2'> 
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Demographic Information and Data </h1>
           <p className='font-semibold'>Male: <span className='font-normal'>{woreda_data?.male_population}</span></p>
           <p className='font-semibold'>Female: <span className='font-normal'>{woreda_data?.female_population}</span></p>
           <p className='font-semibold'>Total Population: <span className='font-normal'>{woreda_data?.male_population + woreda_data?.female_population}</span></p>
        </div>

        <div className='flex text-gray-600 flex-col gap-2'> 
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Land use with area</h1>
         {weredadata.data.woreda_resource.LAND?.map((item, index) => (
           <p key={index} className='font-semibold'>{item.value}: <span className='font-normal'>{item.amount}</span></p>
         ))}
        </div>
      </div>
      <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0 pt-10">


        <div className='flex text-gray-600 flex-col gap-2'> 
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Road</h1>
         {weredadata.data.woreda_resource.ROAD?.map((item, index) => (
           <p key={index} className='font-semibold'>{item.value}: <span className='font-normal'>{item.amount}</span></p>
         ))}
        </div>

        <div className='flex text-gray-600 flex-col gap-2'> 
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>School</h1>
         {weredadata.data.woreda_institution.SCHOOL?.map((item, index) => (
           <p key={index} className='font-semibold'>{item.value}: <span className='font-normal'>{item.amount}</span></p>
         ))}
        </div>

        <div className='flex text-gray-600 flex-col gap-2'> 
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Health Facilities</h1>
         {weredadata.data.woreda_institution.HEALTH_FACILITY?.map((item, index) => (
           <p key={index} className='font-semibold'>{item.value}: <span className='font-normal'>{item.amount}</span></p>
         ))}
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}