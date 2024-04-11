import { useDispatch } from "react-redux";
import {useGetSiteGeojsonsQuery} from "../GeoJson/SiteGeoJsonApi";
import { SetAllSiteData } from "../GeoJson/GeoJsonSlice";
import { useEffect } from "react";

export const useGetAllSite = () => {
const { data: Site, isSuccess} = useGetSiteGeojsonsQuery();

const dispatch = useDispatch();
useEffect(() => {
    if(isSuccess) {
            dispatch(SetAllSiteData(Site.data));
            console.log("bobobobobobobbbbbb.............")
    }
}, [isSuccess, dispatch]);
}