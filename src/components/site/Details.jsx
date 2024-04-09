import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import MainLoading from "../Resource/Loading/MainLoading";
import {
  useGetSiteByIdQuery,
  useGetSiteQuery,
} from "../../redux/site/SiteApiSlice";
import { useInitialValueSite } from "../../redux/InitialState/initalValueSite";
import { Check, Delete, Edit } from "@mui/icons-material";
import Select from "react-select";

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
        <button
          onClick={goBack}
          className="text-sm py-1 px-4 rounded-md bg-mainColor text-white hover:bg-customDark font-semibold"
        >
          back
        </button>
        <Select
          options={siteOptions}
          onChange={handleWeredaSelect}
          placeholder="Select a Site"
          className="w-full sm:w-1/3 lg:w-1/4"
        />
        <div className="flex gap-4">
          <button
            className=" p-2 rounded-md text-sm bg-deletecolor hover:bg-customDark text-white font-semibold"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            <Delete style={{ fontSize: "large" }} className="mr-2" />
            Delete Site
          </button>
          <Link
            to={`/admin/update-siteData/${id}`}
            className=" p-2 rounded-md text-sm bg-updatecolor hover:bg-customDark text-white font-semibold"
          >
            <Edit style={{ fontSize: "large" }} className="mr-2" />
            Update Site Data
          </Link>
          <Link
            to={`/admin/update-site/${id}`}
            className="p-2 rounded-md text-sm bg-updatecolor hover:bg-customDark text-white font-semibold"
          >
            <Edit style={{ fontSize: "large" }} className="mr-2" />
            Update Site
          </Link>
        </div>
      </div>
      <div className="bg-white py-12 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              Site Name: {data.data?.site_name}
            </h2>
          </div>
          <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 text-gray-600 sm:p-10 lg:flex-auto">
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

              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-customDark">
                  Current land use
                </h4>
                <div className="h-px flex-auto bg-gray-100"></div>
              </div>
              <ul
                role="list"
                className="mt-8 grid grid-cols-1 gap-4 text-xs leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
              >
                {data?.data?.resources?.map((resource, index) =>
                  resource?.LAND?.map((item, idx) => (
                    <li key={`${index}-${idx}`} className="flex gap-x-3">
                      <Check style={{ fontSize: "large" }} />
                      {item.value}
                    </li>
                  ))
                )}
              </ul>

              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-customDark">
                  Indigenous Tree
                </h4>
                <div className="h-px flex-auto bg-gray-100"></div>
              </div>
              <ul
                role="list"
                className="mt-8 grid grid-cols-1 gap-4 text-xs leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
              >
                {data?.data?.resources?.map((resource, index) =>
                  resource?.TREE?.filter(
                    (tree) => tree.indigenous === 1
                  ).map((tree, idx) => (
                    <li key={`${index}-${idx}`} className="flex gap-x-3">
                      <Check style={{ fontSize: "large" }} />
                      {tree.value}
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0 pt-10">
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-customDark">
                  Exotic Trees
                </h4>
                <div className="h-px flex-auto bg-gray-100"></div>
              </div>
              <ul
                role="list"
                className="mt-8 grid grid-cols-1 gap-4 text-xs leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
              >
                {data?.data?.resources?.map((resource, index) =>
                  resource?.TREE?.filter(
                    (tree) => !tree.hasOwnProperty("indigenous")
                  ).map((tree, idx) => (
                    <li key={`${index}-${idx}`} className="flex gap-x-3">
                      <Check style={{ fontSize: "large" }} />
                      {tree.value}
                    </li>
                  ))
                )}
              </ul>

              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-customDark">
                  Livestock
                </h4>
                <div className="h-px flex-auto bg-gray-100"></div>
              </div>

              <ul
                role="list"
                className="mt-8 grid grid-cols-1 gap-4 text-xs leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
              >
                {data?.data?.resources?.map((resource, index) =>
                  resource?.LIVESTOCK?.map((item, idx) => (
                    <li key={`${index}-${idx}`} className="flex gap-x-3">
                      <Check style={{ fontSize: "large" }} />
                      {item.value}
                    </li>
                  ))
                )}
              </ul>

              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-customDark">
                  Forage
                </h4>
                <div className="h-px flex-auto bg-gray-100"></div>
              </div>

              <ul
                role="list"
                className="mt-8 grid grid-cols-1 gap-4 text-xs leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
              >
                {data?.data?.resources?.map((resource, index) =>
                  resource?.FORAGE?.map((item, idx) => (
                    <li key={`${index}-${idx}`} className="flex gap-x-3">
                      <Check style={{ fontSize: "large" }} />
                      {item.value}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
