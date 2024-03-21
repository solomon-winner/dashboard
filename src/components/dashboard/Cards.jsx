import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import StreetviewIcon from '@mui/icons-material/Streetview';
import GpsFixedRoundedIcon from '@mui/icons-material/GpsFixedRounded';

export const Cards = () => {
  return (
    <div>
        <div className="min-w-screen flex items-center justify-center">
    <div className="max-w-7xl w-full mx-auto pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0">

            <div className="w-full lg:w-1/4">
                <div className="widget w-full p-4 rounded-lg bg-gray-50 shadow-sm border-l-4 border-mainColor">
                    <div className="flex items-center">
                        <div className="icon w-14 p-4 bg-mainColor text-white flex justify-center items-center rounded-full mr-3">
                             <MapsHomeWorkIcon />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-lg">11</div>
                            <div className="text-sm text-gray-400">Regions</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/4">
                <div className="widget w-full p-4 rounded-lg bg-gray-50 shadow-sm border-l-4 border-blue-400">
                    <div className="flex items-center">
                        <div className="icon w-14 p-4 flex justify-center items-center bg-blue-400 text-white rounded-full mr-3">
                             <StreetviewIcon />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-lg">1,000</div>
                            <div className="text-sm text-gray-400">Weredas</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/4">
                <div className="widget w-full p-4 rounded-lg bg-gray-50 shadow-sm border-l-4 border-yellow-400">
                    <div className="flex items-center">
                        <div className="icon w-14 p-4 flex justify-center items-center bg-yellow-400 text-white rounded-full mr-3">
                            <GpsFixedRoundedIcon />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-lg">20,000</div>
                            <div className="text-sm text-gray-400">Kebeles</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/4">
                <div className="widget w-full p-4 rounded-lg bg-gray-50 shadow-sm border-l-4 border-red-400">
                    <div className="flex items-center">
                        <div className="icon w-14 p-4 bg-red-400 text-white flex justify-center items-center rounded-full mr-3">
                        <LocationOnIcon />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-lg">20,000</div>
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
