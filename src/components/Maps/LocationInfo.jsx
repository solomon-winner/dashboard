import React from "react";
import { SiteLocationInfo } from "../LocationInfo/SiteInfo";
import { WoredaLocationInfo } from "../LocationInfo/WoredaInfo";
import { useSelector } from "react-redux";
import { KebeleLocationInfo } from "../LocationInfo/KebeleInfo";
import { RegionLocationInfo } from "../LocationInfo/RegionInfo";

export const LocationInfo = () => {
  const Region_id  = useSelector((state) => state.geoJson.GeoJson.SelectedRegion);
  const defualtLocation  = useSelector((state) => state.geoJson.GeoJson.LocationInfo);
  const Site_id  = useSelector((state) => state.geoJson.GeoJson.SelectedSite);
  const Woreda_id = useSelector((state) => state.geoJson.GeoJson.SelectedWoreda);
  const Kebele_id = useSelector((state) => state.geoJson.GeoJson.SelectedKebele);

  return(
<div className="d-flex min-w-80" style={{ marginTop: '60px' }}>
<div className="w-50" style={{ border: '1px solid gray' }}>
      <div className="container project-container">
        <div className="card">
          <div className="bg-gray-200 border-gray-400">
            <p className="text-lg font-bold ml-5 py-3">Detailed location Information</p>
          </div>
          <div className="card-body" style={{ overflowX: 'auto',maxWidth: '50vh', overflowY: 'auto', maxHeight: '80vh' }}>
            {defualtLocation &&          
             <div className="card-body px-4">
            <p>Click a layer to view detailed location information.</p>
            </div>}
            {Region_id && <RegionLocationInfo/>}
            {Site_id && <SiteLocationInfo/>}
            {Woreda_id && <WoredaLocationInfo/>}
            {Kebele_id && <KebeleLocationInfo/>}
            </div>
           </div>
          </div>
        </div>
      </div>
  )
}