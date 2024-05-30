import { useDispatch } from "react-redux";
import { useRefreshMutation } from "../../../redux/auth/AuthApiSlice";
import { updateToken } from "../../../redux/auth/authSlice";
import { log } from "../Utility/Logger";

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
        log("Failed to refresh token", error);
        return false; 
      }
    }
    return false;
  };

  return { refresh };
};

export default useRefreshToken; // Export the hook
