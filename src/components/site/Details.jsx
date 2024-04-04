import React from "react";
import { Link, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import MainLoading from "../Resource/Loading/MainLoading";
import { useGetSiteByIdQuery } from "../../redux/site/SiteApiSlice";
import { useInitialValueSite } from "../../redux/InitialState/initalValueSite";
import { Check } from "@mui/icons-material";

export const SiteDetails = () => {
  const { id } = useParams();
  useInitialValueSite(id);
  const { data, isSuccess, isFetching } = useGetSiteByIdQuery(id);

  const goBack = () => {

    window.history.back();
  }
  if (!isSuccess || isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MainLoading />
      </div>
    );
  }
  console.log(data.data);
  return (
    <div>
      <div className="flex justify-between p-10">
        <button
          onClick={goBack}
          className="text-sm py-1 px-4 rounded-md bg-mainColor text-white hover:bg-customDark font-semibold"
        >
          back
        </button>
        <div className="flex gap-4">
          <button className=" text-sm py-1 px-4 rounded-md bg-deletecolor hover:bg-customDark text-white font-semibold">
            Delete Site
          </button>
          <Link
            to={`/admin/update-siteData/${id}`}
            className=" text-sm py-1 px-4 rounded-md bg-updatecolor hover:bg-customDark text-white font-semibold"
          >
            Update Site Data
          </Link>
          <Link
            to={`/admin/update-site/${id}`}
            className="text-sm py-1 px-4 rounded-md bg-updatecolor hover:bg-customDark text-white font-semibold"
          >
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
                {data.data?.resources[0]?.LAND?.map((item, index) => (
                  <li className="flex gap-x-3">
                    <Check style={{fontSize: 'large'}}/>
                    {item.value}
                  </li>
                ))}
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
                {data.data?.resources[1]?.TREE?.filter(
                  (tree) => tree.indigenous === 1
                ).map((tree, index) => (
                  <li key={index} className="flex gap-x-3">
                    <Check style={{fontSize: 'large'}}/>
                    {tree.value}
                  </li>
                ))}
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
                {data.data?.resources[1]?.TREE?.filter(
                  (tree) => !tree.hasOwnProperty("indigenous")
                ).map((tree, index) => (
                  <li key={index} className="flex gap-x-3">
                    <Check style={{fontSize: 'large'}}/>
                    {tree.value}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-customDark">
                  Livestock{" "}
                </h4>
                <div className="h-px flex-auto bg-gray-100"></div>
              </div>

              <ul
                role="list"
                className="mt-8 grid grid-cols-1 gap-4 text-xs leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
              >
                {data.data?.resources[2]?.LIVESTOCK?.map((item, index) => (
                  <li className="flex gap-x-3">
                    <Check style={{fontSize: 'large'}}/>
                    {item.value}
                  </li>
                ))}
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
                {data.data?.resources[3]?.FORAGE?.map((item, index) => (
                  <li className="flex gap-x-3">
                    <Check style={{fontSize: 'large'}}/>
                    {item.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
