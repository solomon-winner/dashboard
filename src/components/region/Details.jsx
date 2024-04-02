import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Table } from './Table'
import { useGetRegionByIdQuery, useGetSiteByRegionQuery, useGetWeredaByRegionQuery } from '../../redux/region/RegionApiSlice';
import MainLoading from '../Resource/Loading/MainLoading';


export const RegionDetails = () => {
  const {id} = useParams();
  const {data: regionData, isSuccess,isFetching}=useGetRegionByIdQuery(id)
const {data: woredaData, isSuccess: werdaFetched} = useGetWeredaByRegionQuery(id)
const {data: siteData, isSuccess: siteFeteche} = useGetSiteByRegionQuery(id)
  if(!isSuccess || isFetching || !werdaFetched || !siteFeteche){
    return <div className="flex justify-center items-center h-screen">
    <MainLoading />
  </div>
    }
    console.log(regionData)
  return (
    <div>
      <div className='flex justify-between p-10'>
        <Link to="/admin/region" className='py-1 px-4 rounded-md bg-mainColor text-white hover:bg-customDark font-semibold'>back</Link>
        <div className='flex gap-4'>
        <button  className='py-1 px-4 rounded-md bg-red-600 hover:bg-red-400 text-white font-semibold'>Delete Region</button>
        <Link to={`/admin/update-region/${id}`} className='py-1 px-4 rounded-md bg-blue-500 hover:bg-blue-400 text-white font-semibold'>Update Region</Link>
        </div>
      </div>
      <div className="bg-white py-12 sm:py-12">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-2xl sm:text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Region Name:  {regionData.data.region_name}</h2>
      {/* <p className="mt-6 text-lg leading-8 text-gray-600">Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.</p> */}
    </div>
    <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
      <div className="p-8 text-gray-600 sm:p-10 lg:flex-auto">
        <h3 className="text-2xl font-bold tracking-tight text-customDark ">Ethiopia</h3>
        <h3 className="text-2xl font-bold tracking-tight text-customDark ">Total Degraded land: 212.133</h3>
        {/* <p className="mt-6 text-base leading-7 text-gray-600">Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis repellendus etur quidem assumenda.</p> */}
        <div className='flex flex-col gap-2'> 
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Demographic Information and Data </h1>
           <p className='font-semibold'>Male: <span className='font-normal'>{regionData.data.male_population}</span></p>
           <p className='font-semibold'>Female: <span className='font-normal'>{regionData.data.female_population}</span></p>
           <p className='font-semibold'>Total Population: <span className='font-normal'>{regionData.data.female_population + regionData.data.male_population}</span></p>

        </div>

        <div className='flex text-gray-600 flex-col gap-2'> 
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Land Use</h1>
           <p className='font-semibold'>Farmland: <span className='font-normal'>18,791.95</span></p>
           <p className='font-semibold'>Forest Land: <span className='font-normal'>2,285.79</span></p>
           <p className='font-semibold'>Bush Land: <span className='font-normal'>20,708.72</span></p>
           <p className='font-semibold'>Shrub Land: <span className='font-normal'>20,708.72</span></p>
           <p className='font-semibold'>Degraded Land: <span className='font-normal'>3808</span></p>
           <p className='font-semibold'>Settlement: <span className='font-normal'>11,374.06</span></p>
           <p className='font-semibold'>Pasture Land: <span className='font-normal'>120.06</span></p>
           <p className='font-semibold'>Wet Land: <span className='font-normal'>228.083</span></p>
           <p className='font-semibold'>Total: <span className='font-normal'>65,779.82</span></p>
        </div>

      </div>
      <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0 pt-10"> 
      <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Woreda and Site</h1>
      <Table woreda={woredaData.data.data} site={siteData.data.data} />
      </div>
    </div>
  </div>
</div>
    </div>
  )
}