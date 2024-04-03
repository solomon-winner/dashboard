import { useDispatch } from "react-redux";
import { useRefreshMutation } from "../../../redux/auth/AuthApiSlice";
import { updateToken } from "../../../redux/auth/authSlice";


export const useRefreshToken = () => {
 const dispatch = useDispatch();
 const [refreshToken] = useRefreshMutation();

 const refresh = async () => {
    const refreshTokenFromLocalStorage = localStorage.getItem('refreshToken');
    if (refreshTokenFromLocalStorage) {
      try {
        const response = await refreshToken(refreshTokenFromLocalStorage);
        if (response.data) {
          dispatch(updateToken(response.data.token));
          return true; 
        }
      } catch (error) {
        console.error("Failed to refresh token", error);
        return false; 
      }
    }
    return false;
 };

 return { refresh };
};