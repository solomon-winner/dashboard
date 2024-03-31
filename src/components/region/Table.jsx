import React from 'react'
import { Link } from 'react-router-dom'

export const Table = ({woreda, site}) => {
  return (
    <div className='flex'> 
    <table className="border-collapse pt-2 w-full">
    <thead>
        <tr>
            <th className="p-3 font-bold  bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Woreda</th>
        </tr>
    </thead>
    <tbody>
        {woreda.map((item, index) => (
              <tr className="bg-white  flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <Link to={`/admin/wereda/${item.id}`} className='text-sm hover:text-customDark'>{item.woreda_name}</Link >
              </td>
          </tr>
        ))} 
    </tbody>
</table>
<table className="border-collapse pt-2 w-full">
    <thead>
        <tr>
            <th className="p-3 font-bold  bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Site</th>
        </tr>
    </thead>
    <tbody>
        {site.map((item, index) => (
              <tr className="bg-white  flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <Link to={`/admin/site/${item.id}`} className='text-sm hover:text-customDark'>{item.site_name}</Link >
              </td>
          </tr>
        ))} 
    </tbody>
</table>
    </div>
  )
}
