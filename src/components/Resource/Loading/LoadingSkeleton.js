import React from "react";
import { AddButton } from "../Utility/AddButton";
import { AddDataButton } from "../Utility/AddDataButton";
import { useSelector } from "react-redux";

export const LoadingSkeleton = ({ searchInput, handleSearchInput, url, urlData , name, permisstion, permisstion2 }) => {
  const all_permissions = useSelector((state) => state.auth.all_permissions);
  return (
    <div className="flex flex-col gap-4 py-6 px-10 bg-dashbordColor h-screen overflow-hidden">
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
        {name !== "Region" && (
          <div>
              {all_permissions?.includes(permisstion) && (
            <AddButton name={name} url={url} />
          )}
          {all_permissions?.includes(permisstion2) && (
            <AddDataButton name={name} url={urlData} />
          )}
          </div>
        )}
      </div>
      <div className="h-full flex gap-3 flex-col">
        <div>
          <h1 className="text-base font-semibold">{name} List</h1>
        </div>
        <div className="flex flex-wrap gap-6 md:gap-0 -mx-2 mb-10">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className="w-full md:w-1/2 md:mt-4 lg:w-1/3 h-auto px-4"
            >
              <div className="p-2 py-6 h-full md:px-7 xl:px-10 bg-gray-200 animate-pulse shadow-md border border-gray-300 flex flex-col justify-center overflow-hidden rounded ">
                <div className="h-4 w-3/4 bg-gray-300 mb-2 rounded" />
                <div className="h-4 w-1/2 bg-gray-300 mb-2 rounded" />
                <div className="h-4 w-3/4 bg-gray-300 mb-2 rounded" />
                <div className="h-4 w-2/4 bg-gray-300 mb-2 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
