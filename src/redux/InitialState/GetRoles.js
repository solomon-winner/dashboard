import { useDispatch } from "react-redux";
import { useGetRolesQuery } from "../roles/RolesApiSlice";
import { setRoles } from "../roles/RolesState";
import { useEffect } from "react";
import { useRefreshToken } from "../../components/Resource/hooks/useRefreshToken";

export const GetRoles = () => {
 const { data: roles, isSuccess, isFetching,error } = useGetRolesQuery();
 const dispatch = useDispatch();
 const { refresh } = useRefreshToken(); 
 console.log(error)
useEffect(() => {
  if (isSuccess) {
     dispatch(setRoles(roles.data));
  } 
  // else if (error?.status === 401) {
  //   refresh();
  // }
 }, [isSuccess, roles, dispatch, error, refresh]);
};