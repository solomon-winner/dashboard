import React from 'react'
import {Link } from 'react-router-dom'
import { useGetAccountsQuery } from '../../redux/account/AccountApiSlice'
import  { useEffect } from 'react';


export const UserAccount = () => {
  const { data: accounts, refetch } = useGetAccountsQuery();

  // Fetch accounts data on component mount
  useEffect(() => {
    refetch();
  }, [refetch]); // Include refetch in the dependency array

  console.log(accounts?.data?.data);

  

  
  return (
    
    <div>
        <div className='bg-green-50 p-4'>
      <div className='flex align-center justify-between'>
        <div>
        <h2 className='text-xl font-medium mb-4'>Accounts List</h2>
        <p>Acconts are pepople that enter and check the given datas. View and manage your members here </p>
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
        
        <table className='w-full  mt-4'>
          <tr className='bg-green-100 h-12'>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Roles</th>
            <th></th>
            </tr>
            {accounts?.data?.data.map((account, index) => (
              <tr key={index} className='border-b'>
                <td><img className='mt-4 ml-4 w-16 h-16 object-cover rounded-full' src={`https://tbrr.echnoserve.com/storage/app/public/${account.avatar}`} alt='' /></td>
                <td>{account.name}</td>
                <td>{account.email}</td>
                <td>{account.roles}</td>
                <td></td>
              </tr>
            ))}
          
          
        
          <tr className='border-b'>
            <td><img className='mt-4 ml-4 w-16 h-16 object-cover rounded-full' src='https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg' alt='' /></td>
            <td>Birtukan Shiafrehu</td>
            <td>birtushi@gmail.com</td>
            <td>admin</td>
            <td>
              {/* <select className='w-4' name="" id="">
                <option value=""></option>
                <option value="">Delete</option>
              </select> */}
            </td>
          </tr> 
          <tr className='border-b'>
            <td><img className='mt-4 ml-4 w-16 h-16 object-cover rounded-full' src='https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg' alt='' /></td>
            <td>Mahlet Kidan</td>
            <td>mahletzekidan@gmail.com</td>
            <td>admin</td>
            <td>
            {/* <select className='w-4' name="" id="">
                <option value=""></option>
                <option value="">Delete</option>
              </select> */}
            </td>
          </tr>
          <tr className='border-b'>
            <td><img className='mt-4 ml-4 w-16 h-16 object-cover rounded-full' src='https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg' alt='' /></td>
            <td>Abebe Werku</td>
            <td>abebewerku@gmail.com</td>
            <td>admin</td>
            <td>
            {/* <select className='w-4' name="" id="">
                <option value=""></option>
                <option value="">Delete</option>
              </select> */}
            </td>
          </tr>
        </table>
      </div>
    </div>
      
    </div>
  )
}

export default UserAccount