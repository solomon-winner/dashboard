import React from "react";
import { Link, useParams } from "react-router-dom";

import { useGetWeredaByIdQuery, useGetWoredaQuery } from "../../redux/wereda/WeredaApiSlice";
import MainLoading from "../Resource/Loading/MainLoading";
import { useInitalValueworeda } from "../../redux/InitialState/initalValueWoreda";
import { Table } from "./Table";
import { useGetKebeleByWeredaQuery } from "../../redux/kebele/KebeleApiSlice";
import Select from "react-select";
import { Delete, Edit } from "@mui/icons-material";

export const WeredaDetails = () => {
  const { id } = useParams();
  useInitalValueworeda(id);

  const { data: weredadata, isSuccess, isFetching } = useGetWeredaByIdQuery(id);
  const { data: KebeleData, isSuccess: kebeleFetched } =
    useGetKebeleByWeredaQuery({id, with_sites: true});
    const { data: wereda, isLoading, isSuccess:weredaSuccess } = useGetWoredaQuery(1);
  const goBack = () => {
    window.history.back();
  };

  if (!isSuccess || isFetching || !weredadata || !KebeleData || !wereda) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MainLoading />
      </div>
    );
  }
  const weredaOptions = wereda.data && wereda.data?.map(wereda => ({
    value: wereda.id,
    label: wereda.woreda_name, // Assuming the name property exists
 }));
 const handleWeredaSelect = (selectedOption) => {
  window.location.href = `/admin/wereda/${selectedOption.value}`;
};
  const { woreda_name, woreda_data, region_name } = weredadata.data;
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
          options={weredaOptions}
          onChange={handleWeredaSelect}
          placeholder="Select a Wereda"
        />
        <div className="flex gap-4">
          <button className=" p-2 rounded-md text-sm bg-deletecolor hover:bg-customDark text-white font-semibold">
            <Delete style={{ fontSize: "large" }} className="mr-2"/>
            Delete Wereda
          </button>
          <Link
            to={`/admin/update-weredaData/${id}`}
            className=" p-2 rounded-md text-sm bg-updatecolor hover:bg-customDark text-white font-semibold"
          >
            <Edit style={{ fontSize: "large" }} className="mr-2"/>
            Update WeredaData
          </Link>
          <Link
            to={`/admin/update-wereda/${id}`}
            className=" p-2 rounded-md text-sm bg-updatecolor hover:bg-customDark text-white font-semibold"
          >
            <Edit style={{ fontSize: "large" }} className="mr-2"/>
            Update Wereda
          </Link>
        </div>
      </div>
      <div className="bg-white py-12 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 ">
              Wereda Name: {woreda_name}
            </h2>
          </div>
          <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 text-gray-600 sm:p-10 lg:flex-auto">
              <h3 className="text-base font-bold tracking-tight text-customDark ">
                Region: {region_name}
              </h3>

              <div className="flex flex-col gap-2">
                <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                  Total number of Kebele per Wereda
                </h1>
                <p className="font-semibold text-sm">
                  Urban Kebeles:{" "}
                  <span className="font-normal text-xs">
                    {woreda_data?.urban_kebeles}
                  </span>
                </p>
                <p className="font-semibold text-sm">
                  Rural Kebeles:{" "}
                  <span className="font-normal text-xs">
                    {woreda_data?.rural_kebeles}
                  </span>
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                  Demographic Information and Data{" "}
                </h1>
                <p className="font-semibold text-sm">
                  Male:{" "}
                  <span className="font-normal text-xs">
                    {woreda_data?.male_population}
                  </span>
                </p>
                <p className="font-semibold text-sm">
                  Female:{" "}
                  <span className="font-normal text-xs">
                    {woreda_data?.female_population}
                  </span>
                </p>
                <p className="font-semibold text-sm">
                  Total Population:{" "}
                  <span className="font-normal text-xs">
                    {woreda_data?.male_population +
                      woreda_data?.female_population}
                  </span>
                </p>
              </div>

              <div className="flex text-gray-600 flex-col gap-2">
                <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                  Land use with area
                </h1>
                {weredadata.data.woreda_resource.LAND?.map((item, index) => (
                  <p key={index} className="font-semibold text-sm">
                    {item.value}:{" "}
                    <span className="font-normal text-xs">{item.amount}</span>
                  </p>
                ))}
              </div>

              <div className="flex text-gray-600 flex-col gap-2">
                <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                  Road
                </h1>
                {weredadata.data.woreda_resource.ROAD?.map((item, index) => (
                  <p key={index} className="font-semibold text-sm">
                    {item.value}:{" "}
                    <span className="font-normal text-xs">{item.amount}</span>
                  </p>
                ))}
              </div>

              <div className="flex text-gray-600 flex-col gap-2">
                <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                  School
                </h1>
                {weredadata.data.woreda_institution.SCHOOL?.map(
                  (item, index) => (
                    <p key={index} className="font-semibold text-sm">
                      {item.value}:{" "}
                      <span className="font-normal text-xs">{item.amount}</span>
                    </p>
                  )
                )}
              </div>

              <div className="flex text-gray-600 flex-col gap-2">
                <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                  Health Facilities
                </h1>
                {weredadata.data.woreda_institution.HEALTH_FACILITY?.map(
                  (item, index) => (
                    <p key={index} className="font-semibold text-sm">
                      {item.value}:{" "}
                      <span className="font-normal text-xs">{item.amount}</span>
                    </p>
                  )
                )}
              </div>
              <img src="/wereda.jpg" alt="Wereda" />
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0 pt-10">
              <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                Kebeles and Sites
              </h1>
              <Table kebele={KebeleData.data.data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
