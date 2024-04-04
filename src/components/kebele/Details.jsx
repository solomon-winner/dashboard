import React from "react";
import { Table } from "./Table";
import { Link, useParams } from "react-router-dom";
import { useGetKebeleByIdQuery, useGetKebeleQuery } from "../../redux/kebele/KebeleApiSlice";
import MainLoading from "../Resource/Loading/MainLoading";
import { useInitialValueKebele } from "../../redux/InitialState/initalValueKebele";
import { Check, Delete, Edit } from "@mui/icons-material";
import { useGetSiteByKebeleQuery } from "../../redux/site/SiteApiSlice";
import { Table2 } from "./Table2";
import Select from "react-select";

export const Details = () => {
  const { id } = useParams();
  useInitialValueKebele(id);
  const goBack = () => {
    window.history.back();
  };

  const { data, isSuccess, isFetching } = useGetKebeleByIdQuery(id);
  const {data: site} = useGetSiteByKebeleQuery(id)
  const { data: kebele } = useGetKebeleQuery(1);
  if (!isSuccess || isFetching || !data || !kebele || !site) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MainLoading />
      </div>
    );
  }
  const kebeleOptions = kebele.data && kebele.data?.map(kebele => ({
    value: kebele.id,
    label: kebele.kebele_name, // Assuming the name property exists
 }));
 const handleWeredaSelect = (selectedOption) => {
  window.location.href = `/admin/kebele/${selectedOption.value}`;
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
          options={kebeleOptions}
          onChange={handleWeredaSelect}
          placeholder="Select a Kebele"
        />
        <div className="flex gap-4">
          <button className=" p-2 rounded-md text-sm bg-deletecolor hover:bg-customDark text-white font-semibold">
          <Delete style={{ fontSize: "large" }} className="mr-2"/>
            Delete Kebele
          </button>
          <Link
            to={`/admin/update-kebeleData/${id}`}
            className=" p-2 rounded-md text-sm bg-updatecolor hover:bg-customDark text-white font-semibold"
          >
            <Edit style={{ fontSize: "large" }} className="mr-2"/>
            Update kebele Data
          </Link>
          <Link
            to={`/admin/update-kebele/${id}`}
            className=" p-2 rounded-md text-sm bg-updatecolor hover:bg-customDark text-white font-semibold"
          >
            <Edit style={{ fontSize: "large" }} className="mr-2"/>
            Update kebele
          </Link>
        </div>
      </div>
      <div className="bg-white py-12 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 ">
              Kebele Name: {data.data.kebele_name}
            </h2>
          </div>
          <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 text-gray-600 sm:p-10 lg:flex-auto">
              <h3 className="text-base font-bold tracking-tight text-customDark ">
                Region: {data.data.region_name}
              </h3>
              <h3 className="text-base font-bold tracking-tight text-customDark ">
                Woreda: {data.data.woreda_name}
              </h3>
              <div className="flex flex-col gap-2">
                <h1 className=" text-base font-bold tracking-tight text-customDark my-1">
                  Demographic Information and Data{" "}
                </h1>
                <p className="font-semibold text-sm">
                  Male:{" "}
                  <span className="font-normal text-xs">
                    {data.data.kebele_data?.male_population}
                  </span>
                </p>
                <p className="font-semibold text-sm">
                  Female:{" "}
                  <span className="font-normal text-xs">
                    {data.data.kebele_data?.female_population}
                  </span>
                </p>
                <p className="font-semibold text-sm">
                  Total Population:{" "}
                  <span className="font-normal text-xs">
                    {data.data.kebele_data?.female_population +
                      data.data.kebele_data?.male_population}
                  </span>
                </p>
              </div>

              <div className="flex text-gray-600 flex-col gap-2">
                <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                  Current land use with area
                </h1>
                {data.data.resources[3]?.LAND?.map((item, index) => (
                  <p key={index} className="font-semibold text-sm">
                    {item.value}:{" "}
                    <span className="font-normal text-xs">{item.amount}</span>
                  </p>
                ))}
              </div>

              <div className="flex text-gray-600 flex-col gap-2">
                <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                  Land Ownership
                </h1>
                <p className="font-bold text-sm">Male headed family:</p>
                <span className="font-normal text-xs">
                  Own land: {data.data.kebele_data?.mhf_land_owners}{" "}
                </span>
                <span className="font-normal text-xs">
                  Does'nt Own land: {data.data.kebele_data?.fhf_land_lease}
                </span>
                <p className="font-bold text-sm">Female headed family:</p>
                <span className="font-normal text-xs">
                  Own land: {data.data.kebele_data?.fhf_land_owners}{" "}
                </span>
                <span className="font-normal text-xs">
                  Does'nt Own land: {data.data.kebele_data?.fhf_land_lease}{" "}
                </span>
              </div>

              <div className="flex text-gray-600 flex-col gap-2">
                <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                  Major livelihood activities
                </h1>
                <Table data={data.data?.livelihoods} />
              </div>

              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-customDark">
                  Included indeginous tree
                </h4>
                <div className="h-px flex-auto bg-gray-100"></div>
              </div>

              <ul
                role="list"
                className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
              >
                {data.data.resources[4]?.TREE?.filter(
                  (tree) => tree.indigenous === 1
                ).map((tree, index) => (
                  <li key={index} className="flex gap-x-3 text-xs">
                    <Check style={{fontSize: 'large'}}/>
                    {tree.value}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-customDark">
                  Included Exotic tree
                </h4>
                <div className="h-px flex-auto bg-gray-100"></div>
              </div>

              <ul
                role="list"
                className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
              >
                {data.data.resources[4]?.TREE?.filter(
                  (tree) => !tree.hasOwnProperty("indigenous")
                ).map((tree, index) => (
                  <li key={index} className="flex gap-x-3 text-xs">
                    <Check style={{fontSize: 'large'}}/>
                  
                    {tree.value}
                  </li>
                ))}
              </ul>
              <div className="flex text-gray-600 flex-col gap-2">
                <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                  Employment Status
                </h1>
                <p className="font-bold text-sm">Not employed/ jobless:</p>
                <p className="font-semibold text-sm">
                  Male:{" "}
                  <span className="font-normal text-xs">
                    {data.data.kebele_data?.male_non_employed}
                  </span>
                </p>
                <p className="font-semibold text-sm">
                  Female:{" "}
                  <span className="font-normal text-xs">
                    {data.data.kebele_data?.female_non_employed}
                  </span>
                </p>
              </div>

              <div className="flex text-gray-600 flex-col gap-2">
                <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                  Number Livestock
                </h1>
                {data.data.resources[2]?.LIVESTOCK?.map((item, index) => (
                  <p key={index} className="font-semibold text-sm">
                    {item.value}:{" "}
                    <span className="font-normal text-xs">{item.amount}</span>
                  </p>
                ))}
              </div>

              {/* <div className='flex text-gray-600 flex-col gap-2'> 
         <h1 className='text-xl font-bold tracking-tight text-customDark my-1'>Forage grown</h1>
           <p className='font-semibold'>Elephant grass: <span className='font-normal'>9</span></p>
           <p className='font-semibold'>Suspanina suspan: <span className='font-normal'>2.5</span></p>
           <p className='font-semibold'>Truelucern: <span className='font-normal'>1.6</span></p>
        </div> */}

              <div className="flex text-gray-600 flex-col gap-2">
                <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                  Crop grown
                </h1>
                {data.data.resources[0]?.CROP?.map((item, index) => (
                  <p key={index} className="font-semibold text-sm">
                    {item.value}:{" "}
                    <span className="font-normal text-xs">{item.amount}</span>
                  </p>
                ))}
              </div>

              <div className="flex text-gray-600 flex-col gap-2">
                <h1 className="text-xl font-bold tracking-tight text-customDark my-1">
                  Fruit grown
                </h1>
                {data.data.resources[1]?.FRUIT?.map((item, index) => (
                  <p key={index} className="font-semibold text-sm">
                    {item.value}:{" "}
                    <span className="font-normal text-xs">{item.amount}</span>
                  </p>
                ))}
              </div>

              <div className="flex text-gray-600 flex-col gap-2">
                <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                  Nursery Availability
                </h1>
                {data.data.resources[5]?.NURSERY?.map((item, index) => (
                  <p key={index} className="font-semibold text-sm">
                    {item.value}:{" "}
                    <span className="font-normal text-xs">
                      number: {item.amount} capacity: {item.capacity}
                    </span>
                  </p>
                ))}
              </div>

              <div className="flex text-gray-600 flex-col gap-2">
                <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                  Major cause of deforestation
                </h1>
                <p className="font-semibold text-sm">Fuel wood</p>
                <p className="font-semibold text-sm">Farm land expansion</p>
                <p className="font-semibold text-sm">Free grazing</p>
              </div>

              <div className="flex w-full flex-col gap-2 ">
                <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                  Major cause of deforestation
                </h1>
                {data.data.energy_sources?.map((item, index) => (
                  <p className="font-semibold text-sm">
                    {item.value}:{" "}
                    <span className="font-normal text-xs">{item.access_level}</span>
                  </p>
                ))}
              </div>
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0 pt-10">
              <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                Site
              </h1>
              <Table2 site={site.data.data} />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
