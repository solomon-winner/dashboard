import { useDispatch } from "react-redux";
import { useGetAccountsQuery } from "../account/AccountApiSlice";
import { setAccounts } from "../account/AccountState";
import { useEffect } from "react";

export const GetAccount = () => {
 const { data: accounts, isSuccess, isFetching,error } = useGetAccountsQuery();
 const dispatch = useDispatch();


 useEffect(() => {
  if (isSuccess) {
     dispatch(setAccounts(accounts.data.data));
  }
 }, [isSuccess, accounts, dispatch, error]);
};