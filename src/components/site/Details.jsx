import React from 'react'
import { Link } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';


export const SiteDetails = () => {
  return (
    <div>
      <div className='flex justify-between p-10'>
        <Link to="/admin/site" className='py-1 px-4 rounded-md bg-mainColor text-white hover:bg-customDark font-semibold'>back</Link>
        <div className='flex gap-4'>
        <button  className='py-1 px-4 rounded-md bg-red-600 hover:bg-red-400 text-white font-semibold'>Delete Site</button>
        <Link to="/admin/update-site" className='py-1 px-4 rounded-md bg-blue-500 hover:bg-blue-400 text-white font-semibold'>Update Site</Link>
        </div>
      </div>
      <div className="bg-white py-12 sm:py-12">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-2xl sm:text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Site Name: Agar Jefjefa</h2>
      {/* <p className="mt-6 text-lg leading-8 text-gray-600">Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.</p> */}
    </div>
    <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
      <div className="p-8 text-gray-600 sm:p-10 lg:flex-auto">
        <h3 className="text-2xl font-bold tracking-tight text-customDark ">Kebele: Agar</h3>
        <h3 className="text-2xl font-bold tracking-tight text-customDark ">Micro-washed: Agar Wenz</h3>
        <h3 className="text-2xl font-bold tracking-tight text-customDark ">Degraded land restoration: jefjefa</h3>
        <h3 className="text-2xl font-bold tracking-tight text-customDark ">Size of site: 9.61ha</h3>

<div className="mt-10 flex items-center gap-x-4">

<h4 className="flex-none text-sm font-semibold leading-6 text-customDark">Current land use</h4>
<div className="h-px flex-auto bg-gray-100"></div>
</div>
<ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
<li className="flex gap-x-3">
   <CloseIcon className='text-red-500'/>
  Farm land
</li>
<li className="flex gap-x-3">
  <svg className="h-6 w-5 flex-none text-customDark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
  </svg>
  Communal grazing
</li>
<li className="flex gap-x-3">
<CloseIcon className='text-red-500'/>
  Forest land
</li>
<li className="flex gap-x-3">
<CloseIcon className='text-red-500'/>

  Bush land
</li>

<li className="flex gap-x-3">
<CloseIcon className='text-red-500'/>

  Shrub land
</li>

<li className="flex gap-x-3">
  <svg className="h-6 w-5 flex-none text-customDark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
  </svg>
  Degraded land
</li>

<li className="flex gap-x-3">
<CloseIcon className='text-red-500'/>

  Settlement  
</li>

<li className="flex gap-x-3">
<CloseIcon className='text-red-500'/>

  Other land use
</li>
</ul>

<div className="mt-10 flex items-center gap-x-4">

<h4 className="flex-none text-sm font-semibold leading-6 text-customDark">Indigenous Tree</h4>
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
  Olia Africana
</li>
<li className="flex gap-x-3">
<svg className="h-6 w-5 flex-none text-customDark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
  </svg>
  Rhamnus priniodes
</li>
<li className="flex gap-x-3">
<svg className="h-6 w-5 flex-none text-customDark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
  </svg>

  Croton macrstachyus
</li>

<li className="flex gap-x-3">
<svg className="h-6 w-5 flex-none text-customDark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
  </svg>

  Capparis tomentosa
</li>

<li className="flex gap-x-3">
  <svg className="h-6 w-5 flex-none text-customDark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
  </svg>
  Milletia ferruginea
</li>

<li className="flex gap-x-3">
<svg className="h-6 w-5 flex-none text-customDark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
  </svg>

  Juniperus procera 
</li>
</ul>


      
 
      </div>
      <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0 pt-10">

      <div className="mt-10 flex items-center gap-x-4">

<h4 className="flex-none text-sm font-semibold leading-6 text-customDark">Exotic Trees</h4>
<div className="h-px flex-auto bg-gray-100"></div>
</div>
<ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
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
  Grevillea robusta
</li>
<li className="flex gap-x-3">
<svg className="h-6 w-5 flex-none text-customDark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
  </svg>
  Cupressus equisetifolia
</li>
<li className="flex gap-x-3">
<svg className="h-6 w-5 flex-none text-customDark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
  </svg>

  Sesbania sesban
</li>
</ul>

        <div className="mt-10 flex items-center gap-x-4">

        <h4 className="flex-none text-sm font-semibold leading-6 text-customDark">Livelihood activities</h4>
        <div className="h-px flex-auto bg-gray-100"></div>
        </div>

        <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
          <li className="flex gap-x-3">
            <svg className="h-6 w-5 flex-none text-customDark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            Poultry
          </li>
          <li className="flex gap-x-3">
            <svg className="h-6 w-5 flex-none text-customDark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            Bee keeping
          </li>
          <li className="flex gap-x-3">
            <svg className="h-6 w-5 flex-none text-customDark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            Small ruminants
          </li>
          <li className="flex gap-x-3">
            <svg className="h-6 w-5 flex-none text-customDark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            Forage/fodder growing
          </li>
        </ul>


        <div className="mt-10 flex items-center gap-x-4">

<h4 className="flex-none text-sm font-semibold leading-6 text-customDark">Livelihood activities</h4>
<div className="h-px flex-auto bg-gray-100"></div>
</div>

<ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
  <li className="flex gap-x-3">
    <svg className="h-6 w-5 flex-none text-customDark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
    </svg>
    Grass
  </li>
  <li className="flex gap-x-3">
    <svg className="h-6 w-5 flex-none text-customDark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
    </svg>
    Trulucern
  </li>
  <li className="flex gap-x-3">
    <svg className="h-6 w-5 flex-none text-customDark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
    </svg>
    Suspania
  </li>
  <li className="flex gap-x-3">
    <svg className="h-6 w-5 flex-none text-customDark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
    </svg>
    Elephant grass
  </li>
</ul>
   
 
 

        

        

     


      </div>
    </div>
  </div>
</div>
    </div>
  )
}
