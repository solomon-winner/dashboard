export const WoredaLocationInfo = () => {
    const Woreda_id = useSelector((state) => state.geoJson.GeoJson.SelectedWoreda);
    const { data, isSuccess } = useGetWeredaByIdQuery(Woreda_id);
    const woredaData = isSuccess && data.data;
  
    const dataRows = [
      { label: "Female Population", value: woredaData?.woreda_data?.female_population ?? "No data" },
      { label: "Male Population", value: woredaData?.woreda_data?.male_population ?? "No data" },
      { label: "Rural Kebeles", value: woredaData?.woreda_data?.rural_kebeles ?? "No data" },
      { label: "Urban Kebeles", value: woredaData?.woreda_data?.urban_kebeles ?? "No data" },
      { label: "male_hh", value: woredaData?.woreda_data?.male_hh ?? "No data" },
      { label: "female_hh", value: woredaData?.woreda_data?.female_hh?? "No data" },
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
                <h2 className="px-3">Woreda Data:</h2>
                <hr />
                <table className="table-auto w-full">
                  <tbody>
                    <RenderTableRows rows={dataRows} />
                  </tbody>
                </table>
                <hr />
                <h2 className="font-bold px-3 py-3">Woreda Resource:</h2>
                <hr />
                {woredaData?.woreda_resource?.length === 0 ? (
                  <p className="px-4">No Data Entered</p>
                ) : (
                  <>
                    {woredaData?.woreda_resource?.LAND?.length > 0 ? (
                      <ResourceTable resources={woredaData.woreda_resource.LAND} resourceName="LAND" />
                    ) : (
                      "No Data Entered"
                    )}
                    {woredaData?.woreda_resource?.ROAD?.length > 0 ? (
                      <ResourceTable resources={woredaData.woreda_resource.ROAD} resourceName="ROAD" />
                    ) : (
                      "No Data Entered"
                    )}
                  </>
                )}
                <hr />
                <h2 className="font-bold px-3 py-3">Woreda Institution:</h2>
                <hr />
                {woredaData?.woreda_institution?.length === 0 ? (
                  <p className="px-4">No Data Entered</p>
                ) : (
                  <>
                    {woredaData?.woreda_institution?.SCHOOL?.length > 0 ? (
                      <ResourceTable resources={woredaData.woreda_institution.SCHOOL} resourceName="School" />
                    ) : (
                      "No Data Entered"
                    )}
                    {woredaData?.woreda_institution?.HEALTH_FACILITY?.length > 0 ? (
                      <ResourceTable resources={woredaData.woreda_institution.HEALTH_FACILITY} resourceName="Health Facility" />
                    ) : (
                      "No Data Entered"
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }  
  