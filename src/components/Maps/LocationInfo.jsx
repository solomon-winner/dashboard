import React from "react";
import { useGetSiteByIdQuery } from "../../redux/site/SiteApiSlice";
import { useSelector } from "react-redux";

export const LocationInfo = () => {
   const Site_id = useSelector((state) => state.siteById.Id);
   console.log("the location information of the site...", Site_id);
   const { data, isSuccess, isFetching } = useGetSiteByIdQuery(Site_id);
   isSuccess && console.log("the location data of the site...", data.data);

    return(
        <div className="d-flex min-w-80">
        <div className="w-50" style={{ border: '1px solid gray' }}>
          <div className="container project-container">
            <div className="card">
            <div className="bg-gray-200 border-gray-400">
                <p className="text-lg font-bold">Detailed location Information</p>
              </div>
              <div className="card-body">
                {!data && <p>Select a region to view detailed location information.</p>}
                {data && <strong className="text-2xl font-bold">{data.data.site_name}</strong>}

              </div>
              <div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
}