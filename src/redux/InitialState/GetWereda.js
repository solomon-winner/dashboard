import { useEffect } from "react";
import { useGetWoredaQuery } from "../wereda/WeredaApiSlice";
import { useDispatch } from "react-redux";
import { setWeredas } from "../wereda/WeredaState";

export const GetWereda = () => {
    const { data: wereda, isSuccess, isFetching } = useGetWoredaQuery();
    const dispatch = useDispatch();
    useEffect(() => {
        if (isSuccess) {
            dispatch(setWeredas(wereda.data));
        }
    }, [isSuccess, wereda, dispatch]);
}