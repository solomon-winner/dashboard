 import React from 'react'
 import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
 import logo from '../../assests/logo.JPG'
 import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
 import LocationOnIcon from '@mui/icons-material/LocationOn';
 import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
 import StreetviewIcon from '@mui/icons-material/Streetview';
 import GpsFixedRoundedIcon from '@mui/icons-material/GpsFixedRounded';
 import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
 import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
 import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/authSlice';
import { MeetingRoom } from '@mui/icons-material';
import { setProfileDropDown } from '../../redux/Profile/ProfileSlice';

 export const SideBar = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const Avatar = useSelector((state) => state.user.UserData.avatar)
  const Email = useSelector((state) => state.user.UserData.email)
  const ProfileDropDown = useSelector((state) => state.user.ProfileDropDown);
  const [showSidebar, setShowSidebar] = useState(false);
  console.log("profile drop down...",ProfileDropDown);

const ProfileDropdown = () => {
    dispatch(setProfileDropDown(!ProfileDropDown))
    console.log(ProfileDropDown);
}

  const handleButtonClick = () => {
    setShowSidebar(!showSidebar);
    console.log(showSidebar);
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

   return (
    <div>
    <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button type="button" id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded" onClick={handleButtonClick}>
              {!showSidebar
                ? (
                  <svg id="toggleSidebarMobileHamburger" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                )
                : (
                  <svg id="toggleSidebarMobileClose" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
            </button>
            <a href="#" className="text-xl font-bold flex items-center lg:ml-2.5">
              <img src={logo} className="h-12 mr-2" alt="Windster Logo" />
              <span className="self-center whitespace-nowrap">Tree Based Restoration Registry</span>
            </a>
            
          </div>
          <div className="flex gap-2 justify-center items-center cursor-pointer" onClick={ProfileDropdown}>
              <img src={`https://tbrr.echnoserve.com/storage/app/public/${Avatar}`}  alt="img" className="w-12 h-12 bg-red-400 object-fill rounded-full" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">{Email}</span>
                <span className="text-xs font-medium text-gray-500">Admin</span>
              </div>
            </div>
           
        </div>
      </div>
    </nav>
    <div className="flex overflow-hidden bg-white pt-16">
      <aside
        id="sidebar"
        className={`fixed z-20 h-full top-0 left-0 pt-16 md:flex flex-shrink-0 flex-col w-64 transition-width duration-75 ${
          showSidebar ? 'flex' : 'hidden'
        }`}
        aria-label="Sidebar"
      >
        <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-sideboard pt-0">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3  bg-sideboard divide-y space-y-1">
              <ul className="space-y-2 pb-2">
                <li>
                  <NavLink to="/admin" className="text-sm text-white font-normal rounded-lg flex items-center p-2 hover:bg-hoverColor group">
                     <DashboardRoundedIcon style={{ fontSize: "large" }}  />
                    <span className="ml-3">Dashboard</span>
                  </NavLink>
                </li>
                <li className='pl-3 text-sm  text-white font-semibold'>Inputs</li>
                <li>
                  <NavLink to="/admin/region" className="text-sm text-white font-normal rounded-lg hover:bg-hoverColor flex items-center p-2 group ">
                     <MapsHomeWorkIcon style={{ fontSize: "large" }} />
                    <span className="ml-3 flex-1 whitespace-nowrap">Region</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/wereda" className="text-sm text-white font-normal rounded-lg hover:bg-hoverColor flex items-center p-2 group ">
                    < StreetviewIcon style={{ fontSize: "large" }} />
                    <span className="ml-3 flex-1 whitespace-nowrap">Wereda</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/kebele" className="text-sm text-white font-normal rounded-lg hover:bg-hoverColor flex items-center p-2 group ">
                    <GpsFixedRoundedIcon style={{ fontSize: "large" }} />
                    <span className="ml-3 flex-1 whitespace-nowrap">Kebele</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/site" className="text-sm text-white font-normal rounded-lg hover:bg-hoverColor flex items-center p-2 group">
                    <LocationOnIcon style={{ fontSize: "large" }} />
                    <span className="ml-3 flex-1 whitespace-nowrap">Site</span>
                  </NavLink>
                </li>
                <li className='pl-3 text-sm text-white font-semibold'>User management</li>
                <li>
                  <NavLink to="/admin/Accounts" className="text-sm text-white font-normal rounded-lg hover:bg-hoverColor flex items-center p-2 group ">
                    <PeopleAltRoundedIcon style={{ fontSize: "large" }} />
                    <span className="ml-3 flex-1 whitespace-nowrap">Accounts</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/profile" className="text-sm text-white font-normal rounded-lg hover:bg-hoverColor flex items-center p-2 group ">
                     <PersonRoundedIcon style={{ fontSize: "large" }}/>
                    <span className="ml-3 flex-1 whitespace-nowrap">My Profile</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/roles" className="text-sm text-white font-normal rounded-lg hover:bg-hoverColor flex items-center p-2 group ">
                    <MeetingRoom style={{ fontSize: "large" }}/>
                    <span className="ml-3 flex-1 whitespace-nowrap">Roles</span>
                  </NavLink>
                </li>
              </ul>
              <div className="space-y-2 pt-2">
                <button className="text-base text-red-600 font-normal w-full rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2" onClick={handleLogout}>
                  <svg className="w-6 h-6 text-red-600 flex-shrink-0 group-hover:text-red-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-3">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
      {showSidebar && (
      <div className="bg-gray-900 opacity-50 fixed inset-0 z-10" id="sidebarBackdrop" onClick={handleButtonClick} />
      )}
      <div id="main-content" className="h-full w-full relative overflow-y-auto lg:ml-64">
        <Outlet />
      </div>
    </div>
  </div>
);
 }
 



 