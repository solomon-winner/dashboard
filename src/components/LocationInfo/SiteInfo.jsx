export const SiteLocationInfo = () => {
    const [coordinates, setCoordinates] = useState(["Loading..."]);
  
    const Site_id = useSelector((state) => state.geoJson.GeoJson.SelectedSite);
    console.log("the location information of the site...", Site_id);
    const { data, isSuccess, isFetching } = useGetSiteByIdQuery(Site_id);
    const siteData = isSuccess && data.data;
  
    useEffect(() => {
      const fetchCoordinates = async () => {
        if (siteData && siteData.geojson) {
          const result = await Get_Coordinates(siteData.geojson);
          setCoordinates(result);
        }
      };
  
      fetchCoordinates();
    }, [siteData]);
  
    if (isFetching) {
      return <p>Loading...</p>;
    }
  
    return (
      <div className="d-flex min-w-80">
        <div className="w-50" style={{ border: '1px solid gray' }}>
          <div className="container project-container">
            <div className="card">
              <div className="bg-gray-200 border-gray-400">
                <p className="text-lg font-bold ml-5 py-3">Detailed location Information</p>
              </div>
              <div className="card-body" style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '80vh' }}>
                {!data && <p>Select a region to view detailed location information.</p>}
                {data && (
                  <div className="m-5">
                    <div className="flex align-bottom justify-between">
                      <strong className="text-2xl font-bold">{data.data.site_name}</strong>
                      <p>site Size: {data.data.size_ha} ha</p>
                    </div>
  
                    <div>
                      <hr />
                      <h6 className="px-4 py-2 underline">Site Information</h6>
           
                      <p className="px-2 py-2">
                        <strong>Watershed: </strong>
                        {siteData.watershed_name !== undefined ? siteData.watershed_name : "No data"}
                      </p>
                      <p className="px-2 py-2">
                        <strong>Kebele: </strong>
                        {siteData.kebele_name !== undefined ? siteData.kebele_name : "No data"}
                      </p>
                      <p className="px-2 py-2">
                        <strong>Woreda: </strong>
                        {siteData.woreda_name || "No data"}
                      </p>
                      <p className="px-2 py-2">
                        <strong>Zone: </strong>
                        {siteData.zone_name || "N/A"}
                      </p>
                      <h4 className="px-4 py-2 underline">Site Resource</h4>
                      <hr />
                      <strong>Current land use</strong>
                      <hr />
                      {siteData.resources?.map((resource, resourceIndex) =>
                        resource.LAND?.map((item, itemIndex) => (
                          <div key={`${resourceIndex}-${itemIndex}`}>
                            <p className="border px-4 py-2">{item.value}</p>
                          </div>
                        ))
                      )}
                      <strong>TREE</strong>
                      <hr />
                      <p className="px-4 py-2 underline">Indigenous Tree</p>
                      {siteData.resources?.map((resource, resourceIndex) =>
                        resource.TREE?.filter(tree => tree.indigenous === 1).map((item, itemIndex) => (
                          <div key={`${resourceIndex}-${itemIndex}`}>
                            <p className="border px-4 py-2">{item.value}</p>
                          </div>
                        ))
                      )}
                      <p className="px-4 py-2 underline">Exotic Tree</p>
                      <hr />
                      {siteData.resources?.map((resource, resourceIndex) =>
                        resource.TREE?.filter(tree => !tree.hasOwnProperty("indigenous")).map((item, itemIndex) => (
                          <div key={`${resourceIndex}-${itemIndex}`}>
                            <p className="border px-4 py-2">{item.value}</p>
                          </div>
                        ))
                      )}
                      <strong>LIVESTOCK</strong>
                      <hr />
                      {siteData.resources?.map((resource, resourceIndex) =>
                        resource.LIVESTOCK?.map((item, itemIndex) => (
                          <div key={`${resourceIndex}-${itemIndex}`}>
                            <p className="border px-4 py-2">{item.value}</p>
                          </div>
                        ))
                      )}
                      <strong>FORAGE</strong>
                      <hr />
                      {siteData.resources?.some(resource => resource.FORAGE?.length === 0) ? (
                        <p>No Data Entered</p>
                      ) : (
                        siteData.resources?.map((resource, resourceIndex) =>
                          resource.FORAGE?.map((item, itemIndex) => (
                            <div key={`${resourceIndex}-${itemIndex}`}>
                              <p className="border px-4 py-2">{item.value}</p>
                            </div>
                          ))
                        )
                      )}
                      <strong>Coordinates</strong>
                      <hr />
                      {coordinates === "No Coordinate" ? (
                        <p className="border px-4 py-2">No Coordinate</p>
                      ) : (
                        <table className="table-auto w-full">
                          <thead>
                            <tr>
                              <th>Latitude</th>
                              <th>Longitude</th>
                            </tr>
                          </thead>
                          <tbody>
                            {coordinates.map((coords, index) => (
                              <tr key={index}>
                                <td className="border px-4 py-2">{coords[0]}</td>
                                <td className="border px-4 py-2">{coords[1]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  