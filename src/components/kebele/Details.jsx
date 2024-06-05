import React from "react";
import { Table } from "./Table";
import { useParams } from "react-router-dom";
import {
  useDeleteKebeleMutation,
  useGetKebeleByIdQuery,
  useGetKebeleQuery,
} from "../../redux/kebele/KebeleApiSlice";
import { MainLoading } from "../Resource/Loading/Loadings";
import { useInitialValueKebele } from "../../redux/InitialState/initalValueKebele";
import { Check } from "@mui/icons-material";
import { useGetSiteByKebeleQuery } from "../../redux/site/SiteApiSlice";
import Select from "react-select";
import DeleteButton from "../Resource/Utility/Delete/DeleteButton";
import { UpdateDataButton } from "../Resource/Utility/UpdateDataButton";
import { UpdateButton } from "../Resource/Utility/UpdateButton";
import BackButton from "../Resource/Utility/BackButton";
import { EachMap } from "../Resource/Map/EachMap";
import { CommonTable } from "../Resource/Utility/Table";
import { useSelector } from "react-redux";
import { log } from "../Resource/Utility/Logger";

export const Details = () => {
  const { id } = useParams();
  useInitialValueKebele(id);
  const { data, isSuccess, isFetching } = useGetKebeleByIdQuery(id);
  const { data: site } = useGetSiteByKebeleQuery(id);
  const { data: kebele } = useGetKebeleQuery({ all: true });
  const [deleteKebele] = useDeleteKebeleMutation(id);
  const all_permissions = useSelector((state) => state.auth.all_permissions);

  if (!isSuccess || isFetching || !data || !kebele || !site) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MainLoading />
      </div>
    );
  }
  const kebeleData = data.data;
  if (
    kebeleData ||
    kebeleData.kebele_data ||
    kebeleData.livelihoods ||
    kebeleData.resources
  ) {
    const kebeleOptions =
      kebele.data &&
      kebele.data?.map((kebele) => ({
        value: kebele.id,
        label: kebele.kebele_name, // Assuming the name property exists
      }));
    const handleWeredaSelect = (selectedOption) => {
      window.location.href = `/admin/kebele/${selectedOption.value}`;
    };
    log(data.data.resources);
    return (
      <div>
        <div className="p-4 w-full">
          <div className="flex flex-col lg:flex-row justify-between p-4 gap-1">
            <div className="flex flex-row lg:items-center gap-2 md:gap-10 mb-4 md:w-1/2">
              <BackButton />
              <Select
                options={kebeleOptions}
                onChange={handleWeredaSelect}
                placeholder="Select a Kebele"
                className="w-full"
              />
            </div>
            <div className="flex gap-4">
              {all_permissions?.includes("delete_kebeles") && (
                <DeleteButton entityId={id} deleteEntity={deleteKebele} />
              )}
              {all_permissions?.includes("edit_kebele_data") && (
                <UpdateDataButton
                  id={id}
                  name="Kebele"
                  url={"update-kebeleData"}
                />
              )}
              {all_permissions?.includes("edit_kebeles") && (
                <UpdateButton id={id} name="Kebele" url={"update-kebele"} />
              )}
            </div>
          </div>
        </div>

        <div className="bg-white py-12 sm:py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-base font-bold tracking-tight text-gray-900 ">
                Kebele Name: {"  "}
                <span className="text-sm font-medium">
                  {" "}
                  {data.data.kebele_name}{" "}
                </span>
              </h2>
            </div>
            <div className="mx-auto mt-16 max-w-2xl rounded-3xl sm:mt-20 lg:mx-0  lg:max-w-none">
              <div className="p-8 text-gray-600 sm:p-10 lg:flex-auto">
                <h3 className="text-base font-bold tracking-tight text-customDark ">
                  Region:
                  {"  "}
                  <a href={`/admin/region/${data.data?.region_id}`} className="text-sm font-medium">
                    {data.data.region_name}
                  </a>{" "}
                </h3>
                <h3 className="text-base font-bold tracking-tight text-customDark ">
                  Woreda:
                  {"  "}
                  <a href={`/admin/wereda/${data.data?.woreda_id}`} className="text-sm font-medium">
                    {data.data.woreda_name}
                  </a>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  <div className="bg-white border border-opacity-35 border-sideboard shadow-custom rounded-md p-4">
                    <h1 className=" text-base font-bold tracking-tight text-customDark my-1">
                      Demographic Information and Data{" "}
                    </h1>
                    <p className="font-semibold text-sm">
                      Male:{" "}
                      <span className="font-normal text-xs">
                        {new Intl.NumberFormat().format(data.data.kebele_data?.male_population)}
                      </span>
                    </p>
                    <p className="font-semibold text-sm">
                      Female:{" "}
                      <span className="font-normal text-xs">
                        {new Intl.NumberFormat().format(data.data.kebele_data?.female_population)}
                      </span>
                    </p>
                    <p className="font-semibold text-sm">
                      Total Population:{" "}
                      <span className="font-normal text-xs">
                        {new Intl.NumberFormat().format(data.data.kebele_data?.female_population +
                          data.data.kebele_data?.male_population)}
                      </span>
                    </p>
                  </div>

                  <div className="bg-white border border-opacity-35 border-sideboard shadow-custom rounded-md p-4">
                    <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                      Current land use with area
                    </h1>
                    {data.data.resources &&
                      data.data.resources?.map((resource, index) =>
                        resource.LAND?.map((item, index) => (
                          <p key={index} className="font-semibold text-sm">
                            {item.value}:{" "}
                            <span className="font-normal text-xs">
                              {new Intl.NumberFormat().format(item.amount)}
                            </span>
                          </p>
                        ))
                      )}
                  </div>

                  <div className="bg-white border border-opacity-35 border-sideboard shadow-custom rounded-md p-4">
                    <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                      Land Ownership
                    </h1>
                    <p className="font-bold text-sm">Male headed family:</p>
                    <span className="font-normal text-xs">
                      Own land: {new Intl.NumberFormat().format(data.data.kebele_data?.mhf_land_owners)}{" "}
                    </span>
                    <span className="font-normal text-xs">
                      Does'nt Own land: {new Intl.NumberFormat().format(data.data.kebele_data?.fhf_land_lease)}
                    </span>
                    <p className="font-bold text-sm">Female headed family:</p>
                    <span className="font-normal text-xs">
                      Own land: {new Intl.NumberFormat().format(data.data.kebele_data?.fhf_land_owners)}{" "}
                    </span>
                    <span className="font-normal text-xs">
                      Does'nt Own land: {new Intl.NumberFormat().format(data.data.kebele_data?.fhf_land_lease)}{" "}
                    </span>
                  </div>

                  <div className="bg-white border border-opacity-35 border-sideboard shadow-custom rounded-md p-4 ">
                    <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                      Major livelihood activities
                    </h1>
                    <Table data={data.data?.livelihoods} />
                  </div>

                  <div className="bg-white border border-opacity-35 border-sideboard shadow-custom rounded-md p-4 ">
                    <h4 className="flex-none text-sm font-semibold leading-6 text-customDark">
                      Included indeginous tree
                    </h4>
                    <div className="h-px flex-auto bg-gray-100"></div>

                    <ul
                      role="list"
                      className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                    >
                      {data.data.resources &&
                        data.data.resources.map((resource, index) =>
                          resource.TREE?.filter(
                            (tree) => tree.indigenous === 1
                          ).map((tree, index) => (
                            <li key={index} className="flex gap-x-3 text-xs">
                              <Check style={{ fontSize: "large" }} />
                              {tree.value}
                            </li>
                          ))
                        )}
                    </ul>
                  </div>
                  <div className="bg-white border border-opacity-35 border-sideboard shadow-custom rounded-md p-4 ">
                    <h4 className="flex-none text-sm font-semibold leading-6 text-customDark">
                      Included Exotic tree
                    </h4>
                    <div className="h-px flex-auto bg-gray-100"></div>

                    <ul
                      role="list"
                      className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                    >
                      {data.data.resources &&
                        data.data.resources.map((resource, index) =>
                          resource.TREE?.filter(
                            (tree) => !tree.hasOwnProperty("indigenous")
                          ).map((tree, index) => (
                            <li key={index} className="flex gap-x-3 text-xs">
                              <Check style={{ fontSize: "large" }} />

                              {tree.value}
                            </li>
                          ))
                        )}
                    </ul>
                  </div>
                  <div className="bg-white border border-opacity-35 border-sideboard shadow-custom rounded-md p-4 ">
                    <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                      Employment Status
                    </h1>
                    <p className="font-bold text-sm">Not employed/ jobless:</p>
                    <p className="font-semibold text-sm">
                      Male:{" "}
                      <span className="font-normal text-xs">
                        {new Intl.NumberFormat().format(data.data.kebele_data?.male_non_employed)}
                      </span>
                    </p>
                    <p className="font-semibold text-sm">
                      Female:{" "}
                      <span className="font-normal text-xs">
                        {new Intl.NumberFormat().format(data.data.kebele_data?.female_non_employed)}
                      </span>
                    </p>
                  </div>

                  <div className="bg-white border border-opacity-35 border-sideboard shadow-custom rounded-md p-4 ">
                    <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                      Number Livestock
                    </h1>
                    {data.data.resources &&
                      data.data.resources.map((resource, index) =>
                        resource?.LIVESTOCK?.map((item, index) => (
                          <p key={index} className="font-semibold text-sm">
                            {item.value}:{" "}
                            <span className="font-normal text-xs">
                              {new Intl.NumberFormat().format(item.amount)}
                            </span>
                          </p>
                        ))
                      )}
                  </div>

                  <div className="bg-white border border-opacity-35 border-sideboard shadow-custom rounded-md p-4 ">
                    <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                      Crop grown
                    </h1>
                    {data.data.resources &&
                      data.data.resources.map((resource, index) =>
                        resource?.CROP?.map((item, index) => (
                          <p key={index} className="font-semibold text-sm">
                            {item.value}:{" "}
                            <span className="font-normal text-xs">
                              {new Intl.NumberFormat().format(item.amount)}
                            </span>
                          </p>
                        ))
                      )}
                  </div>

                  <div className="bg-white border border-opacity-35 border-sideboard shadow-custom rounded-md p-4 ">
                    <h1 className="text-xl font-bold tracking-tight text-customDark my-1">
                      Fruit grown
                    </h1>
                    {data.data.resources &&
                      data.data.resources.map((resource, index) =>
                        resource?.FRUIT?.map((item, index) => (
                          <p key={index} className="font-semibold text-sm">
                            {item.value}:{" "}
                            <span className="font-normal text-xs">
                              {new Intl.NumberFormat().format(item.amount)}
                            </span>
                          </p>
                        ))
                      )}
                  </div>

                  <div className="bg-white border border-opacity-35 border-sideboard shadow-custom rounded-md p-4 ">
                    <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                      Nursery Availability
                    </h1>
                    {data.data.resources &&
                      data.data.resources.map((resource, index) =>
                        resource?.NURSERY?.map((item, index) => (
                          <p key={index} className="font-semibold text-sm">
                            {item.value}:{" "}
                            <span className="font-normal text-xs">
                              number: {new Intl.NumberFormat().format(item.amount)} capacity: {new Intl.NumberFormat().format(item.capacity)}
                            </span>
                          </p>
                        ))
                      )}
                  </div>

                  <div className="bg-white border border-opacity-35 border-sideboard shadow-custom rounded-md p-4 ">
                    <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                      Major cause of deforestation
                    </h1>
                    {data.data.resources &&
                      data.data.resources.map((resource, index) =>
                        resource?.CAUSE_OF_DEFORESTATION?.map((item, index) => (
                          <p key={index} className="font-semibold text-sm">
                            {item.value}
                          </p>
                        ))
                      )}
                  </div>

                  <div className="bg-white border border-opacity-35 border-sideboard shadow-custom rounded-md p-4 ">
                    <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                      Major cause of deforestation
                    </h1>
                    {data.data.energy_sources?.map((item, index) => (
                      <p className="font-semibold text-sm">
                        {item.value}:{" "}
                        <span className="font-normal text-xs">
                          {item.access_level}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-4 w-full mt-10">
                <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0 pt-10">
                  <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                    Site
                  </h1>
                  {/* <Table2 site={site.data.data} /> */}
                  <CommonTable
                    data={site.data.data}
                    name={"site_name"}
                    title={"Site"}
                    urlName={"site"}
                  />
                </div>
                <div className="w-full ">
                  <EachMap
                    geojsonData={`/geojson/kebeles/${id}.geojson`}
                    SiteData={site.data.data}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-bold">No Data Available</h2>
        <button className="mt-4 p-2 rounded-md text-sm bg-mainColor text-white hover:bg-customDark font-semibold">
          Add Kebele Data
        </button>
      </div>
    );
  }
};
