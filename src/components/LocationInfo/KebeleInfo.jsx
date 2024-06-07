import React from "react";
import { useSelector } from "react-redux";
import { useGetKebeleByIdQuery } from "../../redux/kebele/KebeleApiSlice";
import { RenderTableRows } from "../../Widgets/renderTableRows";
import RenderKebeleResourceTables from "../../Widgets/RenderKebeleResourceTable";
import LivelihoodTable from "../../Widgets/LiveliHoodTable";
import EnergyResourcesTable from "../../Widgets/EnergyResourceTable";

export const KebeleLocationInfo = () => {
  const Kebele_id = useSelector((state) => state.geoJson.GeoJson.SelectedKebele);
  const { data, isSuccess, isFetching, isError } = useGetKebeleByIdQuery(Kebele_id);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }

  const kebeleData = isSuccess && data?.data;

  const dataRows = [
    {
      label: "Female Population",
      value: kebeleData?.kebele_data?.female_population ?? "No Data",
    },
    {
      label: "Male Population",
      value: kebeleData?.kebele_data?.male_population ?? "No Data",
    },
    {
      label: "Female Non-Employed",
      value: kebeleData?.kebele_data?.female_non_employed ?? "No Data",
    },
    {
      label: "Male Non-Employed",
      value: kebeleData?.kebele_data?.male_non_employed ?? "No Data",
    },
    {
      label: "MHF Land Owners",
      value: kebeleData?.kebele_data?.mhf_land_owners ?? "No Data",
    },
    {
      label: "FHF Land Owners",
      value: kebeleData?.kebele_data?.fhf_land_owners ?? "No Data",
    },
    {
      label: "MHF Land Lease",
      value: kebeleData?.kebele_data?.mhf_land_lease ?? "No Data",
    },
    {
      label: "FHF Land Lease",
      value: kebeleData?.kebele_data?.fhf_land_lease ?? "No Data",
    },
  ];

  return (
    <div className="d-flex min-w-80">
      <div className="w-50" style={{ border: '1px solid gray' }}>
        <div className="container project-container">
          <div className="card">
            <div className="bg-gray-200 border-gray-400">
              <p className="text-lg font-bold ml-5 py-3">Detailed location Information</p>
            </div>
            <div className="card-body" style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '80vh' }}>
              <hr />
              <p className="text-lg font-bold ml-5 py-3">{kebeleData?.kebele_name ?? "No Data"}</p>
            </div>
            <div className="card-body" style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '80vh' }}>
              <hr />
              <table className="table-auto w-full">
                <tbody>
                  <RenderTableRows
                    rows={[
                      { label: "Region Name", value: kebeleData?.region_name ?? "No Data" },
                      { label: "Woreda Name", value: kebeleData?.woreda_name ?? "No Data" },
                      { label: "Zone Name", value: kebeleData?.zone_name ?? "No Data" },
                    ]}
                  />
                </tbody>
              </table>
              <hr />
              <h6 className="px-4">Kebele Data</h6>
              <hr />
              <table className="table-auto w-full">
                <tbody>
                  <RenderTableRows rows={dataRows} />
                </tbody>
              </table>
              <hr />
              {kebeleData?.resources && <RenderKebeleResourceTables resources={kebeleData.resources} />}
              {kebeleData?.livelihoods && <LivelihoodTable livelihoods={kebeleData.livelihoods} />}
              {kebeleData?.energy_sources && <EnergyResourcesTable energyResources={kebeleData.energy_sources} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
