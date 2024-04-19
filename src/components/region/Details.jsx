import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetRegionByIdQuery,
  useGetWeredaByRegionQuery,
} from "../../redux/region/RegionApiSlice";
import { MainLoading } from "../Resource/Loading/Loadings";
import BackButton from "../Resource/Utility/BackButton";
import { EachMap } from "../Resource/Map/EachMap";
import { CommonTable } from "../Resource/Utility/Table";

export const RegionDetails = () => {
  const { id } = useParams();
  const { data: regionData, isSuccess, isFetching } = useGetRegionByIdQuery(id);
  const { data: woredaData, isSuccess: werdaFetched } =
    useGetWeredaByRegionQuery({ id, with_sites: false });

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
        <BackButton />
        {/* <div className="flex gap-4">
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
        </div> */}
      </div>
      <div className="py-12 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="mx-auto max-w-2xl sm:text-center mb-6">
              <h2 className="text-xl font-bold tracking-tight text-gray-900 ">
                Region Name: {regionData.data.region_name}
              </h2>
            </div>
            <div className="w-2/3">
              <EachMap geojsonData={`/geojson/regions/${id}.geojson`} SiteData={woredaData.data.data.map((item) => item.sites)} />
            </div>
          </div>
          <div className="flex flex-col gap-6 mt-10 lg:mt-20 lg:flex-row lg:items-start">
            <div className="w-full">
              <div className="flex justify-between pb-5 border-b border-gray-200">
                <h2 className="text-base font-bold text-customDark">
                  Woreda and Site
                </h2>
              </div>
              <CommonTable data={woredaData.data.data} name={"woreda_name"} title={"Woreda"} urlName={"wereda"} className={"grid grid-cols-4 gap-1"}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
