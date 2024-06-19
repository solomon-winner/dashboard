import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import StreetviewIcon from '@mui/icons-material/Streetview';
import GpsFixedRoundedIcon from '@mui/icons-material/GpsFixedRounded';
import { useGetStatsQuery } from '../../redux/Stats/StatsApiSlice';

export const Cards = () => {
    const {data,isFetching, isSuccess} = useGetStatsQuery();
   const stats = isSuccess && data?.data;
   
  return (
    <div>
        <div className="min-w-screen flex items-center justify-center">
    <div className="max-w-7xl w-full mx-auto pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row w-full lg:space-x-10 space-y-2 lg:space-y-0">

            <div className="w-full lg:w-1/4">
                <div className="widget w-full p-4 rounded-lg bg-gray-50 shadow-sm border border-green-900">
                    <div className="flex items-center">
                        <div className="icon w-14 p-4 bg-green-900 text-white flex justify-center items-center rounded-full mr-3">
                             <MapsHomeWorkIcon />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-lg">{isFetching ? 0 : stats.total_regions}</div>
                            <div className="text-sm text-gray-400">Regions</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/4">
                <div className="widget w-full p-4 rounded-lg bg-gray-50 shadow-sm border border-green-700">
                    <div className="flex items-center">
                        <div className="icon w-14 p-4 flex justify-center items-center bg-green-700 text-white rounded-full mr-3">
                             <StreetviewIcon />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-lg">{isFetching ? 0 : stats.total_woredas}</div>
                            <div className="text-sm text-gray-400">Weredas</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/4">
                <div className="widget w-full p-4 rounded-lg bg-gray-50 shadow-sm border border-green-500">
                    <div className="flex items-center">
                        <div className="icon w-14 p-4 flex justify-center items-center bg-green-500 text-white rounded-full mr-3">
                            <GpsFixedRoundedIcon />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-lg">{isFetching ? 0 : stats.total_kebeles}</div>
                            <div className="text-sm text-gray-400">Kebeles</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/4">
                <div className="widget w-full p-4 rounded-lg bg-gray-50 shadow-sm border border-lightgreen">
                    <div className="flex items-center">
                        <div className="icon w-14 p-4 bg-lightgreen text-white flex justify-center items-center rounded-full mr-3">
                        <LocationOnIcon />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-lg">{isFetching ? 0 : stats.total_sites}</div>
                            <div className="text-sm text-gray-400">Sites</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
 </div>
</div>
  )
}
