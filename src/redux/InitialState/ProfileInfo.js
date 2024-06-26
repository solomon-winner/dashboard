import { useDispatch } from "react-redux";
import { useGetUserQuery } from "../account/AccountApiSlice";
import { SetProfileData } from "../Profile/ProfileSlice";
import { log } from "../../components/Resource/Utility/Logger";

export const ProfileInfo = () =>{
    const { data: user, isLoading, isSuccess, isError, error } = useGetUserQuery()
  log(isSuccess && user.data.birthday);
if (isSuccess) {
  
}
    const  UserData= {
      name: isSuccess && user.data.name,
      email: isSuccess && user.data.email,
      birthday: isSuccess && user.data.birthday,
      mobile: isSuccess && user.data.mobile,
      organization: isSuccess && user.data.organization,
      position: isSuccess && user.data.position,
      avatar: isSuccess && user.data.avatar,
      created_at: isSuccess && user.data.created_at,
      updated_at: isSuccess && user.data.updated_at}
  const dispatch = useDispatch();
   dispatch(SetProfileData(UserData));
}
