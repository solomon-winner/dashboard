import { useDispatch } from "react-redux";
import { useGetAccountsQuery } from "../account/AccountApiSlice";
import { setAccounts } from "../account/AccountState";
import { useEffect } from "react";
import { log } from "../../components/Resource/Utility/Logger";

export const GetAccount = () => {
 const { data: accounts, isSuccess, isFetching,error } = useGetAccountsQuery();
 const dispatch = useDispatch();


 useEffect(() => {
  if (isSuccess) {
   log(accounts.data.data);
     dispatch(setAccounts(accounts.data.data));
  }
 }, [isSuccess, accounts, dispatch, error]);
};