import { useDispatch } from "react-redux";
import { useGetRolesQuery } from "../roles/RolesApiSlice";
import { setRoles } from "../roles/RolesState";
import { useEffect } from "react";
import { useRefreshToken } from "../../components/Resource/hooks/useRefreshToken";
import { log } from "../../components/Resource/Utility/Logger";

export const GetRoles = () => {
 const { data: roles, isSuccess, isFetching,error } = useGetRolesQuery();
 const dispatch = useDispatch();
 const { refresh } = useRefreshToken(); 
 log(error)
useEffect(() => {
  if (isSuccess) {
     dispatch(setRoles(roles.data));
  } 
 }, [isSuccess, roles, dispatch, error, refresh]);
};