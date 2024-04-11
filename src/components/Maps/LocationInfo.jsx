import React from "react";
import { useGetSiteByIdQuery } from "../../redux/site/SiteApiSlice";

export const LocationInfo = (id) => {
    console.log("The id of the location...", id);
    const { data, isSuccess, isFetching } = useGetSiteByIdQuery(id);
    console.log("The data of the location...", data);

    return(
        <div className="d-flex">
        <div className="w-50" style={{ border: '1px solid gray' }}>
          <div className="container project-container">
            <div className="card">
            <div className="bg-gray-200 border-gray-400 ">
                <p className="text-lg font-bold">Detailed location Information</p>
              </div>
              <div className="card-body">
                Select a region to view detailed location information.
              </div>
              <div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
}