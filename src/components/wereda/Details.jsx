import React from 'react'
import { Link } from 'react-router-dom'


export const WeredaDetails = () => {
  return (
    <div>
      <div className='flex justify-between p-10'>
        <Link to="/admin/wereda" className='py-1 px-4 rounded-md bg-mainColor text-white hover:bg-customDark font-semibold'>back</Link>
        <div className='flex gap-4'>
        <button  className='py-1 px-4 rounded-md bg-red-600 hover:bg-red-400 text-white font-semibold'>Delete Wereda</button>
        <Link to="/admin/update-wereda" className='py-1 px-4 rounded-md bg-blue-500 hover:bg-blue-400 text-white font-semibold'>Update Wereda</Link>
        </div>
      </div>
      <div className="bg-white py-12 sm:py-12">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-2xl sm:text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Wereda Name: Dera</h2>
      {/* <p className="mt-6 text-lg leading-8 text-gray-600">Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.</p> */}
    </div>
    <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
      <div className="p-8 text-gray-600 sm:p-10 lg:flex-auto">
        <h3 className="text-2xl font-bold tracking-tight text-customDark ">Region: Amhara</h3>
        {/* <p className="mt-6 text-base leading-7 text-gray-600">Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis repellendus etur quidem assumenda.</p> */}

        <div className='flex flex-col gap-2'> 
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Total number of Kebele per Wereda</h1>
           <p className='font-semibold'>Urban Kebeles: <span className='font-normal'>164586</span></p>
           <p className='font-semibold'>Rural Kebeles: <span className='font-normal'>151711</span></p>
        </div>

        <div className='flex flex-col gap-2'> 
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Demographic Information and Data </h1>
           <p className='font-semibold'>Male: <span className='font-normal'>164586</span></p>
           <p className='font-semibold'>Female: <span className='font-normal'>151711</span></p>
           <p className='font-semibold'>Total Population: <span className='font-normal'>316297</span></p>
        </div>

        <div className='flex text-gray-600 flex-col gap-2'> 
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Land use with area</h1>
           <p className='font-semibold'>Settlement/residential: <span className='font-normal'>575.6</span></p>
           <p className='font-semibold'>Forest Land: <span className='font-normal'>7670.6</span></p>
           <p className='font-semibold'>Farmland: <span className='font-normal'>107274.7</span></p>
           <p className='font-semibold'>Pastor Land: <span className='font-normal'>9763</span></p>
           <p className='font-semibold'>Wet Land: <span className='font-normal'>50.9</span></p>
           <p className='font-semibold'>Water Body: <span className='font-normal'>939.7</span></p>
           <p className='font-semibold'>Degraded Land: <span className='font-normal'>12184.7</span></p>
           <p className='font-semibold'>Bush and Shrub Land: <span className='font-normal'>23827.8</span></p>
        </div>
      </div>
      <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0 pt-10">


        <div className='flex text-gray-600 flex-col gap-2'> 
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Road</h1>
           <p className='font-semibold'>Asfalt road: <span className='font-normal'>59</span></p>
           <p className='font-semibold'>All season gravel road: <span className='font-normal'>113</span></p>
           <p className='font-semibold'>Seasonal gravel road: <span className='font-normal'>42</span></p>
        </div>

        <div className='flex text-gray-600 flex-col gap-2'> 
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>School</h1>
           <p className='font-semibold'>Public University/College: <span className='font-normal'>59</span></p>
           <p className='font-semibold'>TVET: <span className='font-normal'>1</span></p>
           <p className='font-semibold'>High School: <span className='font-normal'>42</span></p>
           <p className='font-semibold'>Secondary School: <span className='font-normal'>5</span></p>
           <p className='font-semibold'>Primary School: <span className='font-normal'>112</span></p>
        </div>

        <div className='flex text-gray-600 flex-col gap-2'> 
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Health Facilities</h1>
           <p className='font-semibold'>Primary Hospital: <span className='font-normal'>1</span></p>
           <p className='font-semibold'>General Hospital: <span className='font-normal'>0</span></p>
           <p className='font-semibold'>Referral Hospital: <span className='font-normal'>0</span></p>
           <p className='font-semibold'>Health Center: <span className='font-normal'>11</span></p>
           <p className='font-semibold'>Clinic: <span className='font-normal'>42</span></p>
           <p className='font-semibold'>Vet Clinic: <span className='font-normal'>32</span></p>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}
