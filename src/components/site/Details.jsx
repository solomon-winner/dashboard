import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { MainLoading } from "../Resource/Loading/Loadings";
import {
  useDeleteSiteMutation,
  useGetSiteByIdQuery,
  useGetSiteQuery,
} from "../../redux/site/SiteApiSlice";
import { useInitialValueSite } from "../../redux/InitialState/initalValueSite";
import { Check } from "@mui/icons-material";
import Select from "react-select";
import BackButton from "../Resource/Utility/BackButton";
import DeleteButton from "../Resource/Utility/Delete/DeleteButton";
import { UpdateDataButton } from "../Resource/Utility/UpdateDataButton";
import { UpdateButton } from "../Resource/Utility/UpdateButton";
import { EachMap } from "../Resource/Map/EachMap";
import { deleteSiteData } from "../../redux/site/SiteByIdState";
import { log } from "../Resource/Utility/Logger";
import { useSelector } from "react-redux";
import EmptyComponent from "../Resource/Utility/EmptyComponent";

export const SiteDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};
  useInitialValueSite(id);
  const { data, isSuccess, isFetching } = useGetSiteByIdQuery(id);
  const { data: site } = useGetSiteQuery({ all: true });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteSite, { isLoading }] = useDeleteSiteMutation();
  const all_permissions = useSelector((state) => state.auth.all_permissions);
  useEffect(() => {
    if (!id) {
      navigate('/admin/site'); // Redirect if no ID is provided
    }
  }, [id, navigate]);
  if (!isSuccess || isFetching || !data || !site) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MainLoading />
      </div>
    );
  }
  log(data.data);
  const siteData = data.data;
  // if (!siteData || !siteData.resources) {
  //   return (
  //     <div className="flex flex-col items-center justify-center h-screen">
  //       <p>No Data Available</p>
  //       <Link
  //         to={`/admin/update-siteData/${id}`}
  //         className="mt-4 p-2 rounded-md text-sm bg-mainColor text-white hover:bg-customDark font-semibold"
  //       >
  //         Add Data
  //       </Link>
  //     </div>
  //   );
  // }
  const siteOptions =
    site.data &&
    site.data?.map((site) => ({
      value: site.id,
      label: site.site_name, // Assuming the name property exists
    }));
  const handleWeredaSelect = (selectedOption) => {
    navigate(`/admin/site/details`, { state: { id: selectedOption.value } });
    window.location.reload();
  };
  return (
    <div>
      <div className="p-4 w-full">
        <div className="flex flex-col lg:flex-row justify-between p-4 gap-1">
          <div className="flex flex-row lg:items-center gap-2 md:gap-10 mb-4 md:w-1/2">
            <BackButton />
            <Select
              options={siteOptions}
              onChange={handleWeredaSelect}
              placeholder="Select a Site"
              className="w-full"
            />
          </div>
          <div className="flex gap-4">
            {all_permissions?.includes("delete_sites") && (
              <DeleteButton entityId={id} deleteEntity={deleteSite} />
            )}
            {all_permissions?.includes("edit_site_data") && (
              <UpdateDataButton id={id} name="Site" url={"update-siteData"} />
            )}
            {all_permissions?.includes("edit_sites") && (
              <UpdateButton id={id} name="Site" url={"update-site"} />
            )}
          </div>
        </div>
      </div>
      <div className="bg-white py-12 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center mb-10">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              Site Name: {"  "}
              <span className=" text-lg font-medium">
                {data.data?.site_name}
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
            <div className="bg-white border border-opacity-35 border-sideboard shadow-custom rounded-md p-4  w-full md:w-9/12">
              <div className="p-8 text-gray-600">
                <h3 className="text-base font-bold tracking-tight text-customDark ">
                  Region: {"  "}
                  <Link
                    to={`/admin/region/details`}
                    state={{ id: data.data?.region_id }}
                    className="text-sm font-medium"
                  >
                    {data.data?.region_name}
                  </Link>
                </h3>
                <h3 className="text-base font-bold tracking-tight text-customDark ">
                  Woreda: {"  "}
                  <Link
                    to={`/admin/wereda/details`}
                    state={{ id: data.data?.woreda_id }}
                    className="text-sm font-medium"
                  >
                    {data.data?.woreda_name}
                  </Link>
                </h3>
                <h3 className="text-base font-bold tracking-tight text-customDark ">
                  Kebele: {"  "}
                  <Link
                    to={`/admin/kebele/details`}
                    state={{ id: data.data?.kebele_id }}
                    className="text-sm font-medium"
                  >
                    {data.data?.kebele_name}
                  </Link>
                </h3>
                <h3 className="text-base font-bold tracking-tight text-customDark ">
                  Micro-watershed: {"  "}
                  <span className="text-sm font-medium">
                    {data.data?.watershed_name}
                  </span>
                </h3>
                <h3 className="text-base font-bold tracking-tight text-customDark ">
                  Area: {"  "}
                  <span className="text-sm font-medium">
                    {new Intl.NumberFormat().format(data.data?.size_ha)} ha
                  </span>
                </h3>
              </div>
            </div>

            <div className="w-full border border-opacity-35 border-sideboard shadow-custom">
              <EachMap geojsonData={`/geojson/sites/${id}.geojson`} />
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="bg-white border border-opacity-35 border-sideboard shadow-custom rounded-md p-4 ">
              <h4 className="text-base font-bold tracking-tight text-customDark my-1">
                Current land use status of the Sites
              </h4>

              {data?.data?.resources &&
              data.data.resources.some(
                (resource) => resource?.LAND?.length > 0
              ) ? (
                data?.data?.resources?.map((resource, index) =>
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
                )
              ) : (
                <EmptyComponent />
              )}
            </div>

            <div className="bg-white border border-opacity-35 border-sideboard shadow-custom rounded-md p-4 ">
              <h4 className="flex-none text-sm font-semibold leading-6 text-customDark">
                Indigenous Tree which can grow in the site
              </h4>
              {data?.data?.resources &&
              data.data.resources.some((resource) =>
                resource?.TREE?.some(
                  (tree) => tree.indigenous === 1
                )
              ) ? (
                data?.data?.resources?.map((resource, index) =>
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
                )
              ) : (
                <EmptyComponent />
              )}
            </div>
            <div className="bg-white border border-opacity-35 border-sideboard shadow-custom rounded-md p-4 ">
              <h4 className="flex-none text-sm font-semibold leading-6 text-customDark">
                Exotic Trees which can grow in the site
              </h4>

              {data?.data?.resources &&
              data.data.resources.some((resource) =>
                resource?.TREE?.some(
                  (tree) => !tree.hasOwnProperty("indigenous")
                )
              ) ? (
                data.data.resources.map((resource, index) =>
                  resource?.TREE?.filter(
                    (tree) => !tree.hasOwnProperty("indigenous")
                  ).map((tree, idx) => (
                    <div
                      key={`${index}-${idx}`}
                      className="border-b border-gray-300 rounded-md p-3 mb-4"
                    >
                      <p className="font-normal text-xs">
                        <Check style={{ fontSize: "large" }} />
                        {tree.value}
                      </p>
                    </div>
                  ))
                )
              ) : (
                <EmptyComponent />
              )}
            </div>
            <div className="bg-white border border-opacity-35 border-sideboard shadow-custom rounded-md p-4 ">
              <h4 className="flex-none text-sm font-semibold leading-6 text-customDark">
                LiveliHood activities which the site can support
              </h4>

              {data?.data?.resources &&
              data.data.resources.some(
                (resource) => resource?.LIVELIHOOD?.length > 0
              ) ? (
                data?.data?.resources?.map((resource, index) =>
                  resource?.LIVELIHOOD?.map((item, idx) => (
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
                )
              ) : (
                <EmptyComponent />
              )}
            </div>
            <div className="bg-white border border-opacity-35 border-sideboard shadow-custom rounded-md p-4 ">
              <h4 className="flex-none text-sm font-semibold leading-6 text-customDark">
                Forage/fodder that can grow in the site
              </h4>

              {data?.data?.resources &&
              data.data.resources.some(
                (resource) => resource?.FORAGE?.length > 0
              ) ? (
                data.data.resources.map((resource, index) =>
                  resource?.FORAGE?.map((item, idx) => (
                    <div
                      key={index}
                      className="border-b border-gray-300 rounded-md p-3 mb-4"
                    >
                      <p key={idx} className="font-normal text-xs">
                        <Check style={{ fontSize: "large" }} />
                        {item.value}
                      </p>
                    </div>
                  ))
                )
              ) : (
                <EmptyComponent />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
