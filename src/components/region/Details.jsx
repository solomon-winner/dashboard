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
    useGetWeredaByRegionQuery({id, with_sites: false});
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
  console.log(regionData);
  return (
    <div>
      <div className="flex justify-between p-10">
        <button
          onClick={goBack}
          className=" text-sm py-1 px-4 rounded-md bg-mainColor text-white hover:bg-customDark font-semibold"
        >
          back
        </button>
        <div className="flex gap-4">
          <button className="text-sm py-1 px-4 rounded-md bg-deletecolor hover:bg-customDark text-white font-semibold">
            <Delete/>
            Delete Region
          </button>
          <Link
            to={`/admin/update-region/${id}`}
            className=" text-sm py-1 px-4 rounded-md bg-updatecolor hover:bg-customDark text-white font-semibold"
          >
            <Edit/>
            Update Region
          </Link>
        </div>
      </div>
      <div className="bg-white py-12 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 ">
              Region Name: {regionData.data.region_name}
            </h2>
            {/* <p className="mt-6 text-lg leading-8 text-gray-600">Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.</p> */}
          </div>
          <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 text-gray-600 sm:p-10 lg:flex-auto">
              <h3 className="text-base font-bold tracking-tight text-customDark ">
                Total Degraded land: 212.133
              </h3>
              {/* <p className="mt-6 text-base leading-7 text-gray-600">Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis repellendus etur quidem assumenda.</p> */}
              <div>
                <h4 className="text-base font-bold text-customDark mb-2">
                  Demographic Information and Data
                </h4>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-sm">
                    Male:{" "}
                    <span className="font-normal text-xs">
                      {regionData.data.male_population}
                    </span>
                  </p>
                  <p className="font-semibold text-sm">
                    Female:{" "}
                    <span className="font-normal text-xs">
                      {regionData.data.female_population}
                    </span>
                  </p>
                  <p className="font-semibold text-sm">
                    Total Population:{" "}
                    <span className="font-normal text-xs">
                      {regionData.data.female_population +
                        regionData.data.male_population}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-customDark mb-2">
                  Land Use
                </h4>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-sm">
                    Farmland:{" "}
                    <span className="font-normal text-xs">18,791.95</span>
                  </p>
                  <p className="font-semibold text-sm">
                    Forest Land:{" "}
                    <span className="font-normal text-xs">2,285.79</span>
                  </p>
                  <p className="font-semibold text-sm">
                    Bush Land:{" "}
                    <span className="font-normal text-xs">20,708.72</span>
                  </p>
                  <p className="font-semibold text-sm">
                    Shrub Land:{" "}
                    <span className="font-normal text-xs">20,708.72</span>
                  </p>
                  <p className="font-semibold text-sm">
                    Degraded Land:{" "}
                    <span className="font-normal text-xs">3808</span>
                  </p>
                  <p className="font-semibold text-sm">
                    Settlement:{" "}
                    <span className="font-normal text-xs">11,374.06</span>
                  </p>
                  <p className="font-semibold text-sm">
                    Pasture Land:{" "}
                    <span className="font-normal text-xs">120.06</span>
                  </p>
                  <p className="font-semibold text-sm">
                    Wet Land:{" "}
                    <span className="font-normal text-xs">228.083</span>
                  </p>
                  <p className="font-semibold text-sm">
                    Total:{" "}
                    <span className="font-normal text-xs">65,779.82</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0 pt-10">
              <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                Woreda and Site
              </h1>
              <Table woreda={woredaData.data.data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
