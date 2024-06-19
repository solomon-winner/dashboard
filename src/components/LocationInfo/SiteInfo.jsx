import React, { useEffect, useState } from "react";
import { useGetSiteByIdQuery } from "../../redux/site/SiteApiSlice";
import { useSelector } from "react-redux";
import { Get_Coordinates } from "../Maps/FetchGeoJsonMap";
import Loadings from "../Resource/Loading/Loadings";
import EmptyComponent from "../Resource/Utility/EmptyComponent";

export const SiteLocationInfo = () => {
    const [coordinates, setCoordinates] = useState(["Loading..."]);

    const Site_id = useSelector((state) => state.geoJson.GeoJson.SelectedSite);
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
        return <Loadings />;
    }

    const renderResourceSection = (resourceType, label) => {
        const resourcesExist = siteData?.resources?.some(resource => resource[resourceType]?.length > 0);
        if (!resourcesExist) {
            return <EmptyComponent />;
        }

        return siteData.resources.map((resource, resourceIndex) =>
            resource[resourceType]?.map((item, itemIndex) => (
                <div key={`${resourceIndex}-${itemIndex}`}>
                    <p className="border px-4 py-2 text-sm">{item.value}</p>
                </div>
            ))
        );
    };

    const renderTreeSection = (filterCondition, label) => {
        const treesExist = siteData?.resources?.some(resource => resource.TREE?.some(filterCondition));
        if (!treesExist) {
            return <EmptyComponent />;
        }

        return siteData.resources.map((resource, resourceIndex) =>
            resource.TREE?.filter(filterCondition).map((item, itemIndex) => (
                <div key={`${resourceIndex}-${itemIndex}`}>
                    <p className="border px-4 py-2 text-sm">{item.value}</p>
                </div>
            ))
        );
    };

    return (
        <>
            {data && (
                <div className="m-5">
                    <div className="flex align-bottom justify-between">
                        <strong className="text-sm font-bold">{data.data.site_name}</strong>
                        {data.data.size_ha && <p className="text-sm">site Size in Ha.: {data.data.size_ha || "No Data"}</p>}
                    </div>

                    <div>
                        <hr />
                        <h6 className="px-7 py-2 font-bold text-sm">Site Information</h6>
                        <p className="px-2 py-2">
                            <strong className="text-sm">Watershed: </strong>
                            <span className="text-xs">{siteData?.watershed_name || "No data"}</span>
                        </p>
                        <p className="px-2 py-2">
                            <strong className="text-sm">Kebele: </strong>
                            <span className="text-xs">{siteData?.kebele_name || "No data"}</span>
                        </p>
                        <p className="px-2 py-2">
                            <strong className="text-sm">Woreda: </strong>
                            <span className="text-xs">{siteData?.woreda_name || "No data"}</span>
                        </p>
                        <p className="px-2 py-2">
                            <strong className="text-sm">Zone: </strong>
                            <span className="text-xs">{siteData?.zone_name || "N/A"}</span>
                        </p>
                        <h4 className="px-7 py-2 font-bold text-sm">Site Resource</h4>
                        <hr />

                        <strong className="text-sm">Current land use</strong>
                        <hr />
                        {renderResourceSection('LAND', 'Current land use')}

                        <strong className="text-sm">TREE</strong>
                        <hr />

                        <p className="px-4 py-2 font-bold text-sm">Indigenous Tree</p>
                        {renderTreeSection(tree => tree.indigenous === 1, 'Indigenous Tree')}

                        <p className="px-4 py-2 font-bold text-sm">Exotic Tree</p>
                        <hr />
                        {renderTreeSection(tree => !tree.hasOwnProperty("indigenous"), 'Exotic Tree')}

                        <strong className="text-sm">LIVESTOCK</strong>
                        <hr />
                        {renderResourceSection('LIVESTOCK', 'Livestock')}

                        <strong className="text-sm">FORAGE</strong>
                        <hr />
                        {renderResourceSection('FORAGE', 'Forage')}

                        <strong className="text-sm">Coordinates</strong>
                        <hr />
                        {coordinates === "No Coordinate" ? (
                            <p className="border px-4 py-2 text-sm">No Coordinate</p>
                        ) : (
                            <table className="table-auto w-full">
                                <thead>
                                    <tr>
                                        <th className="text-sm">Latitude</th>
                                        <th className="text-sm">Longitude</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coordinates.map((coords, index) => (
                                        <tr key={index}>
                                            <td className="border px-4 py-2 text-sm">{coords[0]}</td>
                                            <td className="border px-4 py-2 text-sm">{coords[1]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
