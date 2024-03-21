import { useDispatch } from "react-redux";
import { useGetRolesQuery } from "../roles/RolesApiSlice";
import { setRoles } from "../roles/RolesState";
import { useEffect } from "react";

export const GetRoles = () => {
  const { data: roles, isSuccess, isFetching } = useGetRolesQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setRoles(roles.data));
    }
  }, [isSuccess, roles, dispatch]);
};
