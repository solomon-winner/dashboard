import React from 'react'
import { Link } from 'react-router-dom'

export const Table = () => {
  return (
    <div> 
    <table className="border-collapse pt-2 w-full">
    <thead>
        <tr>
            <th className="p-3 font-bold  bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Woreda</th>
            <th className="p-3 font-bold  bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Site</th>
        </tr>
    </thead>
    <tbody>
        <tr className="bg-white  flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <Link to="/admin/wereda/1" className='text-sm hover:text-customDark'>Agar</Link >
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <Link to="/admin/site/1" className='text-sm hover:text-customDark'>Agar Wenz</Link >
            </td>
        </tr>

        <tr className="bg-white flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <Link  to="/admin/wereda/1" className='text-sm hover:text-customDark'>Habru</Link >
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <Link  to="/admin/wereda/1" className='text-sm hover:text-customDark'>Wuha Ras</Link >
            </td>
           
        </tr>

        <tr className="bg-white flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <Link  to="/admin/wereda/1" className='text-sm hover:text-customDark'>Kalu</Link >
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <Link to="/admin/site/1" className='text-sm hover:text-customDark'>Agaad</Link >
            </td>
           
        </tr>

        <tr className="bg-white flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <Link  to="/admin/wereda/1" className='text-sm hover:text-customDark'>Kewet</Link >
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <Link to="/admin/site/1"  className='text-sm hover:text-customDark'>Korata</Link >
            </td>
           
        </tr>

        <tr className="bg-white flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <Link  to="/admin/wereda/1" className='text-sm hover:text-customDark'>LiboKemKem</Link >
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <Link to="/admin/site/1" className='text-sm hover:text-customDark'>meha_aba melko</Link >
            </td>
          	 
        </tr>

        <tr className="bg-white flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <Link  to="/admin/wereda/1" className='text-sm hover:text-customDark'>Goncha</Link >
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <Link to="/admin/site/1" className='text-sm hover:text-customDark'>Miraf</Link >
            </td>
           
        </tr>

        <tr className="bg-white flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <Link  to="/admin/wereda/1" className='text-sm hover:text-customDark'>Werebabo</Link >
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <Link to="/admin/site/1" className='text-sm hover:text-customDark'>cheze</Link >
            </td>
          	 
        </tr>

        <tr className="bg-white flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <Link  to="/admin/wereda/1" className='text-sm hover:text-customDark'>Tarmaber</Link >
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <Link to="/admin/site/1" className='text-sm hover:text-customDark'>Zekerie</Link >
            </td>
          	 
        </tr> 

        <tr className="bg-white flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <Link  to="/admin/wereda/1" className='text-sm hover:text-customDark'>Shebel Berenta</Link >
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <Link to="/admin/site/1" className='text-sm hover:text-customDark'>Nigst Azeb</Link >
            </td>
          	 
        </tr> 
    </tbody>
</table>
    </div>
  )
}
