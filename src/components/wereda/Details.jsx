import React from "react";
import { useParams } from "react-router-dom";

import {
  useDeleteWeredaByIdMutation,
  useGetWeredaByIdQuery,
  useGetWoredaQuery,
} from "../../redux/wereda/WeredaApiSlice";
import { MainLoading } from "../Resource/Loading/Loadings";
import { useInitalValueworeda } from "../../redux/InitialState/initalValueWoreda";
import { useGetKebeleByWeredaQuery } from "../../redux/kebele/KebeleApiSlice";
import Select from "react-select";
import BackButton from "../Resource/Utility/BackButton";
import { UpdateDataButton } from "../Resource/Utility/UpdateDataButton";
import { UpdateButton } from "../Resource/Utility/UpdateButton";
import DeleteButton from "../Resource/Utility/Delete/DeleteButton";
import { EachMap } from "../Resource/Map/EachMap";
import { CommonTable } from "../Resource/Utility/Table";
import { useSelector } from "react-redux";

export const WeredaDetails = () => {
  const { id } = useParams();
  useInitalValueworeda(id);
  const all_permissions = useSelector((state) => state.auth.all_permissions);
  const { data: weredadata, isSuccess, isFetching } = useGetWeredaByIdQuery(id);
  const { data: KebeleData } = useGetKebeleByWeredaQuery({
    id: id,
    with_sites: false,
  });
  const { data: wereda } = useGetWoredaQuery({ all: true });
  const [deleteWereda] = useDeleteWeredaByIdMutation();

  if (!isSuccess || isFetching || !weredadata || !KebeleData || !wereda) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MainLoading />
      </div>
    );
  }
  if (
    weredadata ||
    weredadata.woreda_resource ||
    weredadata.woreda_institution
  ) {
    const weredaOptions =
      wereda.data &&
      wereda.data?.map((wereda) => ({
        value: wereda.id,
        label: wereda.woreda_name, // Assuming the name property exists
      }));
    const handleWeredaSelect = (selectedOption) => {
      window.location.href = `/admin/wereda/${selectedOption.value}`;
    };
    const { woreda_name, woreda_data, region_name } = weredadata.data;
    return (
      <div className="bg-dashbordColor">
        <div className="flex justify-between p-4 gap-1">
          <BackButton />
          <Select
            options={weredaOptions}
            onChange={handleWeredaSelect}
            placeholder="Select a Wereda"
            className={`w-full sm:w-1/3 lg:w-1/4`}
          />
          <div className="flex gap-2">
            {all_permissions.includes("delete_woredas") && (
            <DeleteButton entityId={id} deleteEntity={deleteWereda} />
            )}
            {all_permissions.includes("edit_woreda_data") && (
            <UpdateDataButton id={id} name="Woreda" url={"update-weredaData"} />
            )}
            {all_permissions.includes("edit_woredas") && (
            <UpdateButton id={id} name="Woreda" url={"update-wereda"} />
            )}
          </div>
        </div>
        <div className="py-12 sm:py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-base font-bold tracking-tight text-gray-900 ">
                Wereda Name:
                {"  "}
                <span className="text-sm font-medium">{woreda_name}</span>
              </h2>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
              <div className="p-8 text-gray-600 sm:p-10 lg:flex-auto">
                <h3 className="text-base font-bold tracking-tight text-customDark ">
                  Region: {"  "}
                  <span className="text-sm font-medium">{region_name}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  <div className="bg-white shadow-md rounded-md p-4">
                    <h1 className="text-base font-bold text-customDark p-4">
                      Total number of Kebele per Wereda
                    </h1>
                    <div className=" border-b border-gray-300 rounded-md p-3 mb-4">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-customDark ">
                          Urban Kebeles:
                        </p>
                        <p className="text-sm text-gray-600">
                          {woreda_data?.urban_kebeles}
                        </p>
                      </div>
                    </div>
                    <div className="border-b border-gray-300 rounded-md p-3 mb-4">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-customDark">
                          Rural Kebeles:
                        </p>
                        <p className="text-sm text-gray-600">
                          {woreda_data?.rural_kebeles}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white shadow-md rounded-md p-4">
                    <h1 className="text-base font-bold text-customDark p-4">
                      Demographic Information and Data
                    </h1>
                    <div className="border-b border-gray-300 rounded-md p-3 mb-4">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-customDark">
                          Male:
                        </p>
                        <p className="text-sm text-gray-600">
                          {woreda_data?.male_population}
                        </p>
                      </div>
                    </div>
                    <div className="border-b border-gray-300 rounded-md p-3 mb-4">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-customDark">
                          Female:
                        </p>
                        <p className="text-sm text-gray-600">
                          {woreda_data?.female_population}
                        </p>
                      </div>
                    </div>
                    <div className="border-b border-gray-300 rounded-md p-3 mb-4">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-customDark ">
                          Total Population:
                        </p>
                        <p className="text-sm text-gray-600">
                          {woreda_data?.male_population +
                            woreda_data?.female_population}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white shadow-md rounded-md p-4">
                    <h1 className="text-base font-bold tracking-tight text-customDark my-1 p-4">
                      Land use with area
                    </h1>
                    <div className="flex flex-col gap-2">
                      {weredadata.data.woreda_resource.LAND?.map(
                        (item, index) => (
                          <div
                            key={index}
                            className="border-b border-gray-300 rounded-md p-3 mb-4"
                          >
                            <div className="flex justify-between items-center">
                              <p
                                key={index}
                                className="text-sm font-medium text-customDark"
                              >
                                {item.value}:
                              </p>
                              <p className="text-sm text-gray-600">
                                {item.amount}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="bg-white shadow-md rounded-md p-4">
                    <h1 className="text-base font-bold tracking-tight text-customDark my-1 p-4">
                      Road
                    </h1>
                    <div className="flex flex-col gap-2">
                      {weredadata.data.woreda_resource.ROAD?.map(
                        (item, index) => (
                          <div
                            key={index}
                            className="border-b border-gray-300 rounded-md p-3 mb-4"
                          >
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-medium text-customDark">
                                {item.value}:
                              </p>
                              <p className="text-sm text-gray-600">
                                {item.amount}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="bg-white shadow-md rounded-md p-4">
                    <h1 className="text-base font-bold tracking-tight text-customDark my-1 p-4">
                      School
                    </h1>
                    <div className="flex flex-col gap-2">
                      {weredadata.data.woreda_institution.SCHOOL?.map(
                        (item, index) => (
                          <div
                            key={index}
                            className="border-b border-gray-300 rounded-md p-3 mb-4"
                          >
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-medium text-customDark">
                                {item.value}:
                              </p>
                              <p className="text-sm text-gray-600">
                                {item.amount}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="bg-white shadow-md rounded-md p-4">
                    <h1 className="text-base font-bold tracking-tight text-customDark my-1 p-4">
                      Health Facilities
                    </h1>
                    <div className="flex flex-col gap-2">
                      {weredadata.data.woreda_institution.HEALTH_FACILITY?.map(
                        (item, index) => (
                          <div
                            key={index}
                            className="border-b border-gray-300 rounded-md p-3 mb-4"
                          >
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-medium text-customDark">
                                {item.value}:
                              </p>
                              <p className="text-sm text-gray-600">
                                {item.amount}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 w-full mt-10">
                  <div className="w-full md:w-1/2">
                    <EachMap
                      geojsonData={`/geojson/woredas/${id}.geojson`}
                      SiteData={KebeleData.data.map((item) => item.sites)}
                    />
                  </div>
                  <div className="w-full lg:w-1/2">
                    <div className="flex flex-col justify-between pb-5 border-b border-gray-200">
                      <h1 className="text-base font-bold tracking-tight text-customDark my-1">
                        Kebeles and Sites
                      </h1>
                      {/* <Table kebele={KebeleData.data.data} /> */}
                      <CommonTable
                        data={KebeleData.data}
                        name={"kebele_name"}
                        title={"Kebele"}
                        urlName={"kebele"}
                      />
                    </div>
                  </div>
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
          Add Wereda Data
        </button>
      </div>
    );
  }
};
