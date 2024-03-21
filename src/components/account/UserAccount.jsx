import React from 'react'
import {Link } from 'react-router-dom'
import { useGetAccountsQuery } from '../../redux/account/AccountApiSlice'

const UserAccount = () => {
  const {data: accounts, isLoading,isSuccess} = useGetAccountsQuery()

  return (
    <div>
        <div className='bg-green-50 p-4'>
      <div className='flex align-center justify-between'>
        <div>
        <h2 className='text-xl font-medium mb-4'>Accounts List</h2>
        <p>Acconts are pepople that inter and check the given datas. View and manage your members here </p>
        </div>
        <Link to="/admin/new-user" className='bg-mainColor text-white  h-8 w-60 text-center rounded-2xl ml-4'>Add Account</Link>
      </div>

      <div className='rounded-md bg-white mt-4'>
        <div className='flex justify-end'>
          <div className='border w-88 rounded-2xl p-1 mt-4 mr-2'>
            <button className='mr-2'>🔍</button>
            <input className='outline-0' type='text' placeholder='Search Members...'></input>
          </div>
        </div>
        <table className='w-full mt-4'>
          <tr className='bg-green-100 h-12'>
            <th></th>
            <th>Name</th>
            <th>Login Email</th>
            <th>Roles</th>
            <th></th>
          </tr>
          <tr className='border-b'>
            <td><img className='mt-4 ml-4 w-16 h-16 object-cover rounded-full' src='https://as2.ftcdn.net/v2/jpg/02/47/31/95/1000_F_247319523_cibOUpVE0D2y1PcCSjNG8LtmUY782XrV.jpg' alt='' /></td>
            <td>Sanna Gamil</td>
            <td>sanna@gmail.com</td>
            <td>admin</td>
            <td>
              <select className='w-4' name="" id="">
                <option value=""></option>
                <option value="">Delete</option>
                <option value=""></option>
              </select>
            </td>
          </tr>
          <tr className='border-b'>
            <td><img className='mt-4 ml-4 w-16 h-16 object-cover rounded-full' src='https://as2.ftcdn.net/v2/jpg/02/47/31/95/1000_F_247319523_cibOUpVE0D2y1PcCSjNG8LtmUY782XrV.jpg' alt='' /></td>
            <td>Birtukan Shiafrehu</td>
            <td>birtushi@gmail.com</td>
            <td>admin</td>
            <td>
              <select className='w-4' name="" id="">
                <option value=""></option>
                <option value="">Delete</option>
              </select>
            </td>
          </tr>
          <tr className='border-b'>
            <td><img className='mt-4 ml-4 w-16 h-16 object-cover rounded-full' src='https://as2.ftcdn.net/v2/jpg/02/47/31/95/1000_F_247319523_cibOUpVE0D2y1PcCSjNG8LtmUY782XrV.jpg' alt='' /></td>
            <td>Mahlet Kidan</td>
            <td>mahletzekidan@gmail.com</td>
            <td>admin</td>
            <td>
            <select className='w-4' name="" id="">
                <option value=""></option>
                <option value="">Delete</option>
              </select>
            </td>
          </tr>
          <tr className='border-b'>
            <td><img className='mt-4 ml-4 w-16 h-16 object-cover rounded-full' src='https://as2.ftcdn.net/v2/jpg/02/47/31/95/1000_F_247319523_cibOUpVE0D2y1PcCSjNG8LtmUY782XrV.jpg' alt='' /></td>
            <td>Abebe Werku</td>
            <td>abebewerku@gmail.com</td>
            <td>admin</td>
            <td>
            <select className='w-4' name="" id="">
                <option value=""></option>
                <option value="">Delete</option>
              </select>
            </td>
          </tr>
        </table>
      </div>
    </div>
      
    </div>
  )
}

export default UserAccount
