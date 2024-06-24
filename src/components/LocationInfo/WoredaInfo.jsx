import React from "react";
import { useGetWeredaByIdQuery } from "../../redux/wereda/WeredaApiSlice";
import { RenderTableRows } from "../../Widgets/renderTableRows";
import { ResourceTable } from "../../Widgets/resourceTables";
import { useSelector } from "react-redux";
import Loadings from "../Resource/Loading/Loadings";
import { No_Data } from "../../Widgets/No_Data";
import EmptyComponent from "../Resource/Utility/EmptyComponent";


export const WoredaLocationInfo = () => {
    const Woreda_id = useSelector((state) => state.geoJson.GeoJson.SelectedWoreda);
    const { data, isSuccess, isFetching  } = useGetWeredaByIdQuery(Woreda_id);
    const woredaData = isSuccess && data.data;
  
    const dataRows = [
      { label: "Female Population", value: woredaData?.woreda_data?.female_population ?? "No data" },
      { label: "Male Population", value: woredaData?.woreda_data?.male_population ?? "No data" },
      { label: "Rural Kebeles", value: woredaData?.woreda_data?.rural_kebeles ?? "No data" },
      { label: "Urban Kebeles", value: woredaData?.woreda_data?.urban_kebeles ?? "No data" },
      { label: "male_hh", value: woredaData?.woreda_data?.male_hh ?? "No data" },
      { label: "female_hh", value: woredaData?.woreda_data?.female_hh?? "No data" },
    ];
  if (isFetching) {
    return <Loadings/>
  }
    return (
     <>
          <p className="text-xl font-bold ml-5 py-3">{woredaData?.woreda_name ?? "No Data"}</p>
                <table className="table-auto w-full">
                  <tbody>
                    <RenderTableRows
                      rows={[
                        { label: "Woreda Name", value: woredaData?.woreda_name ?? "No data" },
                        { label: "Region Name", value: woredaData?.region_name ?? "No data" },
                        { label: "Zone Name", value: woredaData?.zone_name ?? "No data" },
                      ]}
                    />
                  </tbody>
                </table>
                <hr />
                <h2 className="px-9 text-sm font-bold">Woreda Data:</h2>
                <hr />
                <table className="table-auto w-full">
                  <tbody>
                    <RenderTableRows rows={dataRows} />
                  </tbody>
                </table>
                <hr />
                <h2 className="px-7 py-3 text-sm font-bold">Woreda Resource:</h2>
                <hr />
                {woredaData?.woreda_resource?.length === 0 ? (
                  <EmptyComponent/>
                ) : (
                  <>
                    {woredaData?.woreda_resource?.LAND?.length > 0 ? (
                      <ResourceTable resources={woredaData.woreda_resource.LAND} resourceName="LAND" />
                    ) : (
                      <No_Data resourceName="LAND"/>
                    )}
                    {woredaData?.woreda_resource?.ROAD?.length > 0 ? (
                      <ResourceTable resources={woredaData.woreda_resource.ROAD} resourceName="ROAD" />
                    ) : (
                      <No_Data resourceName="ROAD"/>
                    )}
                  </>
                )}
                <hr />
                <h2 className="px-7 py-3 text-sm font-bold">Woreda Institution:</h2>
                <hr />
                {woredaData?.woreda_institution?.length === 0 ? (
                  <EmptyComponent/>
                ) : (
                  <>
                    {woredaData?.woreda_institution?.SCHOOL?.length > 0 ? (
                      <ResourceTable resources={woredaData.woreda_institution.SCHOOL} resourceName="School" />
                    ) : (
                      <No_Data resourceName="School"/>
                    )}
                    {woredaData?.woreda_institution?.HEALTH_FACILITY?.length > 0 ? (
                      <ResourceTable resources={woredaData.woreda_institution.HEALTH_FACILITY} resourceName="Health Facility" />
                    ) : (
                      <No_Data resourceName="Health Facility"/>
                    )}
                  </>
                )}
              </>

    );
  }  
  