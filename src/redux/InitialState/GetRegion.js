import { useDispatch } from "react-redux";
import { useGetRegionQuery } from "../region/RegionApiSlice";
import { setRegions } from "../region/RegionState";
import { useEffect } from "react";

export const useGetRegion = () => {
    const { data: region, isSuccess, isFetching } = useGetRegionQuery();
    const dispatch = useDispatch();
    useEffect(() => {
        if (isSuccess) {
            dispatch(setRegions(region.data));
        }
    }, [isSuccess, region, dispatch]);
}