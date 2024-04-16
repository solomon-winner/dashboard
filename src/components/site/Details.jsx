import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { MainLoading } from "../Resource/Loading/Loadings";
import {
  useGetSiteByIdQuery,
  useGetSiteQuery,
} from "../../redux/site/SiteApiSlice";
import { useInitialValueSite } from "../../redux/InitialState/initalValueSite";
import { Check, Delete, Edit } from "@mui/icons-material";
import Select from "react-select";
import BackButton from "../Resource/Utility/BackButton";
import DeleteButton from "../Resource/Utility/Delete/DeleteButton";
import { UpdateDataButton } from "../Resource/Utility/UpdateDataButton";
import { UpdateButton } from "../Resource/Utility/UpdateButton";
import { EachMap } from "../Resource/Map/EachMap";

export const SiteDetails = () => {
  const { id } = useParams();
  useInitialValueSite(id);
  const { data, isSuccess, isFetching } = useGetSiteByIdQuery(id);
  const { data: site } = useGetSiteQuery({ all: true });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const handleDelete = async () => {
    try {
      // await deleteRole(deleteRoleId).unwrap();
      // toast.success("Role deleted successfully");
      // dispatch(deleteRoles(deleteRoleId));
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Failed to delete role:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };
  const goBack = () => {
    window.history.back();
  };
  if (!isSuccess || isFetching || !data || !site) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MainLoading />
      </div>
    );
  }
  console.log(data.data);
  const siteData = data.data;
  if (!siteData || !siteData.resources) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>No Data Available</p>
        <button className="mt-4 p-2 rounded-md text-sm bg-mainColor text-white hover:bg-customDark font-semibold">
          Add Data
        </button>
      </div>
    );
  }
  const siteOptions =
    site.data &&
    site.data?.map((site) => ({
      value: site.id,
      label: site.site_name, // Assuming the name property exists
    }));
  const handleWeredaSelect = (selectedOption) => {
    window.location.href = `/admin/site/${selectedOption.value}`;
  };
  return (
    <div>
      <div className="flex justify-between p-10">
        <BackButton />
        <Select
          options={siteOptions}
          onChange={handleWeredaSelect}
          placeholder="Select a Site"
          className="w-full sm:w-1/3 lg:w-1/4"
        />
        <div className="flex gap-4">
          <DeleteButton />
          <UpdateDataButton id={id} name="Site" url={"update-siteData"} />
          <UpdateButton id={id} name="Site" url={"update-site"} />
        </div>
      </div>
      <div className="bg-white py-12 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center mb-10">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              Site Name: {data.data?.site_name}
            </h2>
          </div>
          <div className="flex gap-2 mb-6">
          <div className="bg-white shadow-md rounded-md p-4 h-fit w-1/3">
              <div className="p-8 text-gray-600">
                <h3 className="text-base font-bold tracking-tight text-customDark ">
                  Region: {data.data?.region_name}
                </h3>
                <h3 className="text-base font-bold tracking-tight text-customDark ">
                  Woreda: {data.data?.woreda_name}
                </h3>
                <h3 className="text-base font-bold tracking-tight text-customDark ">
                  Kebele: {data.data?.kebele_name}
                </h3>
                <h3 className="text-base font-bold tracking-tight text-customDark ">
                  Micro-washed: {data.data?.watershed_name}
                </h3>
                <h3 className="text-base font-bold tracking-tight text-customDark ">
                  Size of site: {data.data?.size_ha} ha
                </h3>
              </div>
            </div>

            <div className="w-2/3">
      <EachMap geojsonData={`/geojson/sites/${id}.geojson`} />
      </div>

          </div>
          <div className="grid gap-4 lg:grid-cols-3">
           
            <div className="bg-white shadow-md rounded-md p-4 h-fit">
              <h4 className="text-base font-bold tracking-tight text-customDark my-1">
                Current land use
              </h4>

              {data?.data?.resources?.map((resource, index) =>
                resource?.LAND?.map((item, idx) => (
                  <div
                    key={index}
                    class="border-b border-gray-300 rounded-md p-3 mb-4"
                  >
                    <p key={index} className="font-normal text-xs">
                      <Check style={{ fontSize: "large" }} />
                      {item.value}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="bg-white shadow-md rounded-md p-4 h-fit">
              <h4 className="flex-none text-sm font-semibold leading-6 text-customDark">
                Indigenous Tree
              </h4>
              {data?.data?.resources?.map((resource, index) =>
                resource?.TREE?.filter((tree) => tree.indigenous === 1).map(
                  (tree, idx) => (
                    <div
                      key={index}
                      class="border-b border-gray-300 rounded-md p-3 mb-4"
                    >
                      <p key={index} className="font-normal text-xs">
                        <Check style={{ fontSize: "large" }} />
                        {tree.value}
                      </p>
                    </div>
                  )
                )
              )}
            </div>
            <div className="bg-white shadow-md rounded-md p-4 h-fit">
              <h4 className="flex-none text-sm font-semibold leading-6 text-customDark">
                Exotic Trees
              </h4>

              {data?.data?.resources?.map((resource, index) =>
                resource?.TREE?.filter(
                  (tree) => !tree.hasOwnProperty("indigenous")
                ).map((tree, idx) => (
                  <div
                    key={index}
                    class="border-b border-gray-300 rounded-md p-3 mb-4"
                  >
                    <p key={index} className="font-normal text-xs">
                      <Check style={{ fontSize: "large" }} />
                      {tree.value}
                    </p>
                  </div>
                ))
              )}
            </div>
            <div className="bg-white shadow-md rounded-md p-4 h-fit">
              <h4 className="flex-none text-sm font-semibold leading-6 text-customDark">
                Livestock
              </h4>

              {data?.data?.resources?.map((resource, index) =>
                resource?.LIVESTOCK?.map((item, idx) => (
                  <div
                    key={index}
                    class="border-b border-gray-300 rounded-md p-3 mb-4"
                  >
                    <p key={index} className="font-normal text-xs">
                      <Check style={{ fontSize: "large" }} />
                      {item.value}
                    </p>
                  </div>
                ))
              )}
            </div>
            <div className="bg-white shadow-md rounded-md p-4 h-fit">
              <h4 className="flex-none text-sm font-semibold leading-6 text-customDark">
                Forage
              </h4>
           
                {data?.data?.resources?.map((resource, index) =>
                  resource?.FORAGE?.map((item, idx) => (
                    <div
                    key={index}
                    class="border-b border-gray-300 rounded-md p-3 mb-4"
                  >
                    <p key={index} className="font-normal text-xs">
                      <Check style={{ fontSize: "large" }} />
                      {item.value}
                    </p>
                    </div>
                  ))
                )}
              
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};
