import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  useDeleteRegionMutation,
  useGetRegionByIdQuery,
  useGetWeredaByRegionQuery,
} from "../../redux/region/RegionApiSlice";
import { MainLoading } from "../Resource/Loading/Loadings";
import BackButton from "../Resource/Utility/BackButton";
import { EachMap } from "../Resource/Map/EachMap";
import { CommonTable } from "../Resource/Utility/Table";
import { Delete, Edit } from "@mui/icons-material";
import DeleteButton from "../Resource/Utility/Delete/DeleteButton";
import { log } from "../Resource/Utility/Logger";
import { useSelector } from "react-redux";

export const RegionDetails = () => {
  const { id } = useParams();
  const all_permissions = useSelector((state) => state.auth.all_permissions);
  const { data: regionData, isSuccess, isFetching } = useGetRegionByIdQuery(id);
  const { data: woredaData, isSuccess: werdaFetched } =
    useGetWeredaByRegionQuery({ id: id, with_sites: false });
  const [deleteRegion] = useDeleteRegionMutation();
  if (!isSuccess || isFetching || !werdaFetched) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MainLoading />
      </div>
    );
  }
  log(regionData.data);
  log(woredaData.data);
  return (
    <div className="bg-dashbordColor">
      <div className="flex justify-between p-10">
        <BackButton />
        <div className="flex gap-4">
          {all_permissions.includes("delete_regions") && (        
          <DeleteButton entityId={id} deleteEntity={deleteRegion} />
          )}
          {all_permissions.includes("edit_regions") && (
          <Link
            to={`/admin/update-regions/${id}`}
            className=" text-sm py-1 px-4 rounded-md bg-updatecolor hover:bg-customDark text-white font-semibold"
          >
            <Edit />
            Update Region
          </Link>
          )}
        </div>
      </div>
      <div className="py-12 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="mx-auto max-w-2xl sm:text-center mb-6">
              <h2 className="text-base font-bold tracking-tight text-gray-900 ">
                Region Name: {" "}
                <span className=" text-sm font-medium">{regionData.data.region_name}</span>
              </h2>
            </div>
            <div className=" w-4/5">
              <EachMap
                geojsonData={`/geojson/regions/${id}.geojson`}
                SiteData={woredaData.data.map((item) => item.sites)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 mt-10 lg:mt-20 lg:flex-row lg:items-start">
            <div className="w-full">
              <div className="flex justify-between pb-5 border-b border-gray-200">
                <h2 className="text-base font-bold text-customDark">
                  Woreda and Site
                </h2>
              </div>
              <CommonTable
                data={woredaData.data}
                name={"woreda_name"}
                title={"Woreda"}
                urlName={"wereda"}
                className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
