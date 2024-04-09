import React from "react";
import { Link, useParams } from "react-router-dom";
import { Table } from "./Table";
import {
  useGetRegionByIdQuery,
  useGetSiteByRegionQuery,
  useGetWeredaByRegionQuery,
} from "../../redux/region/RegionApiSlice";
import MainLoading from "../Resource/Loading/MainLoading";
import { Delete, Edit } from "@mui/icons-material";

export const RegionDetails = () => {
  const { id } = useParams();
  const { data: regionData, isSuccess, isFetching } = useGetRegionByIdQuery(id);
  const { data: woredaData, isSuccess: werdaFetched } =
    useGetWeredaByRegionQuery({ id, with_sites: false });
  const goBack = () => {
    window.history.back();
  };

  if (!isSuccess || isFetching || !werdaFetched) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MainLoading />
      </div>
    );
  }
  return (
    <div className="bg-dashbordColor">
      <div className="flex justify-between p-10">
        <button
          onClick={goBack}
          className=" text-sm py-1 px-4 rounded-md bg-mainColor text-white hover:bg-customDark font-semibold"
        >
          back
        </button>
        <div className="flex gap-4">
          <button className="text-sm py-1 px-4 rounded-md bg-deletecolor hover:bg-customDark text-white font-semibold">
            <Delete />
            Delete Region
          </button>
          <Link
            to={`/admin/update-region/${id}`}
            className=" text-sm py-1 px-4 rounded-md bg-updatecolor hover:bg-customDark text-white font-semibold"
          >
            <Edit />
            Update Region
          </Link>
        </div>
      </div>
      <div className="py-12 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 ">
              Region Name: {regionData.data.region_name}
            </h2>
            {/* <p className="mt-6 text-lg leading-8 text-gray-600">Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.</p> */}
          </div>
          <div className="flex flex-col gap-6 mt-10 lg:mt-20 lg:flex-row lg:items-start">
            <div className="mt-10 w-full lg:w-1/2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-medium text-customDark p-4">
                  Demographic Information
                </h3>
                <div class="border-b border-gray-300 rounded-md p-3 mb-4">
                  <div class="flex justify-between items-center">
                    <p className="text-sm font-medium text-customDark">Male:</p>
                    <p className="text-sm text-gray-600">
                      {regionData.data.male_population}
                    </p>
                  </div>
                </div>
                <div class="border-b border-gray-300 rounded-md p-3 mb-4">
                  <div class="flex justify-between items-center">
                    <p className="text-sm font-medium text-customDark">
                      Female:
                    </p>
                    <p className="text-sm text-gray-600">
                      {regionData.data.female_population}
                    </p>
                  </div>
                </div>
                <div class="border-b border-gray-300 rounded-md p-3 mb-4">
                  <div class="flex justify-between items-center">
                    <p className="text-sm font-medium text-customDark">
                      Total Population:
                    </p>
                    <p className="text-sm text-gray-600">
                      {regionData.data.female_population +
                        regionData.data.male_population}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 mt-10">
                <h3 className="text-lg font-medium text-customDark p-4">
                  Land Use
                </h3>
                <div className="grid grid-cols-2 gap-4 mt-5">
                  <div class="border-b border-gray-300 rounded-md p-3 mb-4">
                    <div class="flex justify-between items-center">
                      <p className="text-sm font-medium text-customDark">
                        Farmland:
                      </p>
                      <p className="text-sm text-gray-600">18,791.95</p>
                    </div>
                  </div>
                  <div class="border-b border-gray-300 rounded-md p-3 mb-4">
                    <div class="flex justify-between items-center">
                      <p className="text-sm font-medium text-customDark">
                        Forest Land:
                      </p>
                      <p className="text-sm text-gray-600">2,285.79</p>
                    </div>
                  </div>
                  <div class="border-b border-gray-300 rounded-md p-3 mb-4">
                    <div class="flex justify-between items-center">
                      <p className="text-sm font-medium text-customDark">
                        Bush Land:
                      </p>
                      <p className="text-sm text-gray-600">20,708.72</p>
                    </div>
                  </div>
                  <div class="border-b border-gray-300 rounded-md p-3 mb-4">
                    <div class="flex justify-between items-center">
                      <p className="text-sm font-medium text-customDark">
                        Shrub Land:
                      </p>
                      <p className="text-sm text-gray-600">20,708.72</p>
                    </div>
                  </div>
                  <div class="border-b border-gray-300 rounded-md p-3 mb-4">
                    <div class="flex justify-between items-center">
                      <p className="text-sm font-medium text-customDark">
                        Degraded Land:
                      </p>
                      <p className="text-sm text-gray-600">3808</p>
                    </div>
                  </div>
                  <div class="border-b border-gray-300 rounded-md p-3 mb-4">
                    <div class="flex justify-between items-center">
                      <p className="text-sm font-medium text-customDark">
                        Settlement:
                      </p>
                      <p className="text-sm text-gray-600">11,374.06</p>
                    </div>
                  </div>
                  <div class="border-b border-gray-300 rounded-md p-3 mb-4">
                    <div class="flex justify-between items-center">
                      <p className="text-sm font-medium text-customDark">
                        Pasture Land:
                      </p>
                      <p className="text-sm text-gray-600">120.06</p>
                    </div>
                  </div>
                  <div class="border-b border-gray-300 rounded-md p-3 mb-4">
                    <div class="flex justify-between items-center">
                      <p className="text-sm font-medium text-customDark">
                        Wet Land:
                      </p>
                      <p className="text-sm text-gray-600">228.083</p>
                    </div>
                  </div>
                  <div class="border-b border-gray-300 rounded-md p-3 mb-4">
                    <div class="flex justify-between items-center">
                      <p className="text-sm font-medium text-customDark">
                        Total:
                      </p>
                      <p className="text-sm text-gray-600">65,779.82</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="flex justify-between pb-5 border-b border-gray-200">
                <h2 className="text-base font-bold text-customDark">
                  Woreda and Site
                </h2>
              </div>
              <Table woreda={woredaData.data.data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


