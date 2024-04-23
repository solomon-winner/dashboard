import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetRegionQuery } from "../../redux/region/RegionApiSlice";
import { LoadingSkeleton } from "../Resource/Loading/LoadingSkeleton";
import { AddButton } from "../Resource/Utility/AddButton";

export const View = () => {
  const { data: region, isLoading, isSuccess } = useGetRegionQuery();

  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSkeleton
          searchInput={searchInput}
          handleSearchInput={handleSearchInput}
          name={"Region"}
        />
      </div>
    );
  } else if (isSuccess) {
    console.log(region.data);
    let filteredData = region.data.filter((d) =>
      d.region_name.toLowerCase().includes(searchInput.toLowerCase())
    );
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
            <AddButton name="Region" url={"add-region"} />
          </div>
        </div>
        <div className="h-full flex gap-3 flex-col">
          <div>
            <h1 className="text-xl font-semibold">Region List</h1>
          </div>
          <div>
            <div className="flex flex-wrap gap-6 md:gap-0 -mx-2 mb-10">
              {filteredData.map((item, index) => (
                <div
                  key={index}
                  className="w-full md:w-1/2 md:mt-4 lg:w-1/3 h-auto px-4"
                >
                  <Link
                    to={`/admin/region/${item.id}`}
                    className="p-4 pt-9 h-full md:px-7 xl:px-10  bg-white shadow-md border border-custumBlue hover:shadow-lg hover:bg-mainColor hover:text-white transition duration-300 ease-in-out flex flex-col justify-center relative group overflow-hidden rounded
      "
                  >
                    <h4 className="relative z-10 font-semibold font-raleway text-2xl text-dark mb-3">
                      {item.region_name}
                    </h4>
                    <div className="relative z-10 w-1/3 h-1 bg-black mb-4" />
                    <p className="relative z-10 text-body-color text-sm font-poppins">
                      Number of Wereda: {item.woredas}
                    </p>
                    <p className="relative z-10 text-body-color text-sm font-poppins">
                      Number of Kebele: {item.kebeles}
                    </p>
                    <p className="relative z-10 text-body-color text-sm font-poppins">
                      Number of Sites: {item.sites}
                    </p>
                    <p className="relative z-10 text-body-color text-sm font-poppins">
                      Degraded Land:{" "}
                      {item.area_ha
                        ? numberWithCommas(item.area_ha) + " Ha"
                        : "N/A"}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
