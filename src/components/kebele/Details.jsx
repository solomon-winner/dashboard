import React from 'react'
import { Table } from './Table'
import { Link, useParams } from 'react-router-dom'


export const Details = () => {
  const {id} = useParams();
  return (
    <div>
      <div className='flex justify-between p-10'>
        <Link to="/admin/kebele" className='py-1 px-4 rounded-md bg-mainColor text-white hover:bg-customDark font-semibold'>back</Link>
        <div className='flex gap-4'>
        <button  className='py-1 px-4 rounded-md bg-red-600 hover:bg-red-400 text-white font-semibold'>Delete Kebele</button>
        <Link to={`/admin/update-kebeleData/${id}`}className='py-1 px-4 rounded-md bg-blue-500 hover:bg-blue-400 text-white font-semibold'>Update kebele Data</Link>
        <Link to={`/admin/update-kebele/${id}`}className='py-1 px-4 rounded-md bg-blue-500 hover:bg-blue-400 text-white font-semibold'>Update kebele</Link>
        </div>
      </div>
      <div className="bg-white py-12 sm:py-12">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-2xl sm:text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Kebele Name: Agar</h2>
      {/* <p className="mt-6 text-lg leading-8 text-gray-600"></p> */}
    </div>
    <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
      <div className="p-8 text-gray-600 sm:p-10 lg:flex-auto">
        <h3 className="text-2xl font-bold tracking-tight text-customDark ">Woroda: Dera</h3>
        {/* <p className="mt-6 text-base leading-7 text-gray-600">Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis repellendus etur quidem assumenda.</p> */}
        <div className='flex flex-col gap-2'> 
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Demographic Information and Data </h1>
           <p className='font-semibold'>Male: <span className='font-normal'>3808</span></p>
           <p className='font-semibold'>Female: <span className='font-normal'>3515</span></p>
           <p className='font-semibold'>Total Population: <span className='font-normal'>7323</span></p>

        </div>

        <div className='flex text-gray-600 flex-col gap-2'> 
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Current land use with area</h1>
           <p className='font-semibold'>Farmland: <span className='font-normal'>3148.09</span></p>
           <p className='font-semibold'>Communal Grazing: <span className='font-normal'>234.6</span></p>
           <p className='font-semibold'>Forest Land: <span className='font-normal'>324.96</span></p>
           <p className='font-semibold'>Bush Land: <span className='font-normal'>519.36</span></p>
           <p className='font-semibold'>Shrub Land: <span className='font-normal'>519.36</span></p>
           <p className='font-semibold'>Degraded Land: <span className='font-normal'>520</span></p>
           <p className='font-semibold'>Settlement: <span className='font-normal'>2.2</span></p>

        </div>

        <div className='flex text-gray-600 flex-col gap-2'> 
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Land Ownership</h1>
           <p className='font-bold'>Male headed family:</p>
           <span className='font-normal'>Own land: 985 </span>
           <span className='font-normal'>Does'nt Own land: 0 </span>
           <p className='font-bold'>Female headed family:</p>
           <span className='font-normal'>Own land: 562 </span>
           <span className='font-normal'>Does'nt Own land: 0 </span>
        </div>

        <div className='flex text-gray-600 flex-col gap-2'> 
        <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Major livelihood activities</h1>
          <Table />
        </div>

        <div className="mt-10 flex items-center gap-x-4">

          <h4 className="flex-none text-sm font-semibold leading-6 text-customDark">Included indeginous tree</h4>
          <div className="h-px flex-auto bg-gray-100"></div>
        </div>
        <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
          <li className="flex gap-x-3">
            <svg className="h-6 w-5 flex-none text-customDark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            Cardio Africana
          </li>
          <li className="flex gap-x-3">
            <svg className="h-6 w-5 flex-none text-customDark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            Croton macrostrachyus
          </li>
         
        </ul>

        <div className="mt-10 flex items-center gap-x-4">

<h4 className="flex-none text-sm font-semibold leading-6 text-customDark">Included Exotic tree</h4>
<div className="h-px flex-auto bg-gray-100"></div>
</div>

        <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
          <li className="flex gap-x-3">
            <svg className="h-6 w-5 flex-none text-customDark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            Eucalyptus globules
          </li>
          <li className="flex gap-x-3">
            <svg className="h-6 w-5 flex-none text-customDark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            Acacia decurrens
          </li>
          <li className="flex gap-x-3">
            <svg className="h-6 w-5 flex-none text-customDark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            Cupressus lustanica
          </li>
          <li className="flex gap-x-3">
            <svg className="h-6 w-5 flex-none text-customDark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            Eucalyptus camaldulensis
          </li>
        </ul>
      </div>
      <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0 pt-10">


        <div className='flex text-gray-600 flex-col gap-2'> 
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Employment Status</h1>
           <p className='font-bold'>Not employed/ jobless:</p>
           <p className='font-semibold'>Male: <span className='font-normal'>0</span></p>
           <p className='font-semibold'>Female: <span className='font-normal'>0</span></p>
        </div>


  
        <div className='flex text-gray-600 flex-col gap-2'> 
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Number Livestock</h1>
           <p className='font-semibold'>Oxen: <span className='font-normal'>2627</span></p>
           <p className='font-semibold'>Caws/heifer: <span className='font-normal'>2789</span></p>
           <p className='font-semibold'>Goats: <span className='font-normal'>1305</span></p>
           <p className='font-semibold'>Sheep: <span className='font-normal'>2362</span></p>
           <p className='font-semibold'>Camel: <span className='font-normal'>0</span></p>
           <p className='font-semibold'>Donkey: <span className='font-normal'>1136</span></p>
           <p className='font-semibold'>Horse: <span className='font-normal'>35</span></p>
           <p className='font-semibold'>Poultry: <span className='font-normal'>4735</span></p>
           <p className='font-semibold'>Mule: <span className='font-normal'>64</span></p>


        </div>

        <div className='flex text-gray-600 flex-col gap-2'> 
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Forage grown</h1>
           <p className='font-semibold'>Elephant grass: <span className='font-normal'>9</span></p>
           <p className='font-semibold'>Suspanina suspan: <span className='font-normal'>2.5</span></p>
           <p className='font-semibold'>Truelucern: <span className='font-normal'>1.6</span></p>
        </div>

        <div className='flex text-gray-600 flex-col gap-2'> 
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Crop grown</h1>
           <p className='font-semibold'>Dagusa: <span className='font-normal'>1574</span></p>
           <p className='font-semibold'>Teff: <span className='font-normal'>1101</span></p>
           <p className='font-semibold'>Maize: <span className='font-normal'>472</span></p>
        </div>

        <div className='flex text-gray-600 flex-col gap-2'> 
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Fruit grown</h1>
           <p className='font-semibold'>Banana: <span className='font-normal'>9</span></p>
           <p className='font-semibold'>Mango: <span className='font-normal'>14</span></p>
           <p className='font-semibold'>Avocado: <span className='font-normal'>2</span></p>
           <p className='font-semibold'>Orange: <span className='font-normal'>3</span></p>
           <p className='font-semibold'>Zeitun: <span className='font-normal'>5</span></p>

        </div>

        <div className='flex text-gray-600 flex-col gap-2'> 
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Nursery Availability</h1>
           <p className='font-semibold'>local government: <span className='font-normal'>number: 0 capacity: 0</span></p>
           <p className='font-semibold'>Community: <span className='font-normal'>number: 0 capacity: 0</span></p>
           <p className='font-semibold'>Individual: <span className='font-normal'>number: 5 capacity: 150000</span></p>
        </div>

        <div className='flex text-gray-600 flex-col gap-2'> 
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Major cause of deforestation</h1>
           <p className='font-semibold'>Fuel wood</p>
           <p className='font-semibold'>Farm land expansion</p>
           <p className='font-semibold'>Free grazing</p>
        </div>

        <div className='flex w-full flex-col gap-2 '>
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Major cause of deforestation</h1>
        <p className='font-semibold'>Electricty: <span className='font-normal'>low</span></p>
        <p className='font-semibold'>Firewood: <span className='font-normal'>high</span></p>
        <p className='font-semibold'>Animal dung: <span className='font-normal'>high</span></p>
        <p className='font-semibold'>Crop residue: <span className='font-normal'>medium</span></p>
        <p className='font-semibold'>Charcoal: <span className='font-normal'>low</span></p>
        <p className='font-semibold'>Solar: <span className='font-normal'>-</span></p>
        <p className='font-semibold'>Other: <span className='font-normal'>-</span></p>
        </div>


      </div>
    </div>
  </div>
</div>
    </div>
  )
}
