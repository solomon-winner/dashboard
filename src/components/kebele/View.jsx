import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetKebeleQuery } from "../../redux/kebele/KebeleApiSlice";
import MainLoading from "../Resource/Loading/MainLoading";
import Pagination from "../Resource/Pagination/Pagination";

export const View = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading, isSuccess } = useGetKebeleQuery(currentPage);
  console.log(data);
  const [searchInput, setSearchInput] = useState("");
  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const totalPages =
  isSuccess && data.data.length < 20 ? currentPage : currentPage + 1;
  let content;
  let filteredData;
  console.log(data, 'kebele view')
  if (isLoading === true) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MainLoading />
      </div>
    );
  } else if (isLoading === false && data.length != 0) {
    filteredData = data.data.filter(
      (d) =>
        d.kebele_name &&
        d.kebele_name.toLowerCase().includes(searchInput.toLowerCase())
    );
    content = (
      <div>
      <div className="flex flex-wrap gap-6 md:gap-0 -mx-2 mb-10">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className="w-full md:w-1/2 md:mt-4 lg:w-1/3 h-auto px-4"
          >
            <Link
              to={`/admin/kebele/${item.id}`}
              className="
          p-4
          pt-9
          h-full
          md:px-7
          xl:px-10
          bg-white
          shadow-md
          border
          border-custumBlue
          hover:shadow-lg
          hover:bg-mainColor
          hover:text-white
          transition duration-300 ease-in-out
          flex
          flex-col
          justify-center
          relative
          group
          overflow-hidden
          rounded
        "
            >
              <h4 className="relative z-10 font-semibold font-raleway text-2xl text-dark mb-3">
                {item.kebele_name}
              </h4>
              <div className="relative z-10 w-1/3 h-1 bg-black mb-4" />
              <p className="relative z-10 text-body-color text-sm font-poppins">
                Total Population: {item.kebele_code}
              </p>
              <p className="relative z-10 text-body-color text-sm font-poppins">
                Degraded Land: nodata
              </p>
              <p className="relative z-10 text-body-color text-sm font-poppins">
                Farm Land: nodata
              </p>
              <img
                className="absolute z-0 top-0 left-0 object-center object-cover h-full w-full transition duration-200 ease-in-out group-hover:brightness-50 group-hover:opacity-80 group-hover:scale-110"
                src="https://i.ibb.co/KjrPCyW/map.png"
                alt="img"
              />
            </Link>
          </div>
        ))}
        
      </div>
      <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          />
      </div>
      
    );
  }

  return (
    <div className="flex flex-col gap-4 py-6 px-10">
      <div className="flex justify-between items-center">
        <div>
          <form action="#" method="GET" className="hidden lg:block">
            <label htmlFor="topbar-search" className="sr-only">
              Search
            </label>
            <div className="mt-1 relative lg:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="email"
                id="topbar-search"
                className="bg-gray-50 border border-mainColor text-gray-900 sm:text-sm rounded-lg outline-none focus:ring-mainColor focus:border-mainColor block w-full pl-10 p-2.5"
                placeholder="Search"
                value={searchInput}
                onChange={handleSearchInput}
              />
            </div>
          </form>
        </div>
        <div>
          <Link
            to="/admin/add-kebele"
            className="bg-mainColor py-2 px-6 rounded text-white font-semibold hover:bg-customDark"
          >
            Add Kebele
          </Link>
          <Link
            to="/admin/new-kebele"
            className="bg-mainColor py-2 px-6 rounded text-white font-semibold hover:bg-customDark"
          >
            Add Kebele Data
          </Link>
        </div>
      </div>
      <div className="h-full flex gap-3 flex-col">
        <div>
          <h1 className="text-xl font-semibold">Kebele List</h1>
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
};
