import { useCallback, useState } from "react";
import { useUser } from "../Providers/UserProvider";
import { editUser, getUserData, login, signup } from "../Services/uesersApiService";
import { getUser, removeToken, setTokenInLocalStorage,} from "../Services/localStorageServices";
import  { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";
import { useSnack } from "../../Providers/SnackbarProvider";
import normalizeUser from "../Helpers/normalization/normalizeUser";
import ROUTES from "../../Routes/routesModel";


const useUsers = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser, setToken } = useUser();
  const setSnack = useSnack();

  const decodeToken = (token) => {
    return jwtDecode(token);
  };

  const handleLogin = useCallback(
    async (userLogin) => {
      setIsLoading(true);
      try {
        const token = await login(userLogin);
        setTokenInLocalStorage(token);
        setToken(token);
        setUser(getUser());
      } catch (error) {
        setError(error.message);
        setSnack("error", "Incorrect email or password");
      }
      setIsLoading(false);
    },
    [setToken, setUser, navigate, setSnack]
  );

  const handleLogout = useCallback(() => {
      removeToken();
      setUser(null);
      setToken(null);
    }, [setUser]);

  const handleSignup = useCallback(
    async (userFromClient) => {
      setIsLoading(true);
      try {
        const normalizedUser = normalizeUser(userFromClient);
        await signup(normalizedUser);
        await handleLogin({
          email: userFromClient.email,
          password: userFromClient.password,
        });
      } catch (error) {
        setError(error.message);
        setSnack("error", "This email already exists!");
      }
      setIsLoading(false);
    },
    [handleLogin, setSnack]
  );



  const handleGetUser = useCallback(async (id) => {
    try {
      const userData = await getUserData(id);
      setIsLoading(false);
      setError(null);
      return userData;
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  }, [setUser]);


  const handleUpdateUser = useCallback(
    async (userId, userFromClient) => {
      setIsLoading(true);
      try {
        const response = await editUser(userId, normalizeUser(userFromClient), userFromClient.currentPassword);
        const newToken = response.token;
        setToken(newToken);   
        setUser(decodeToken(newToken));      
        setSnack("success", "User updated successfully");  
        setTimeout(() => {
          navigate(ROUTES.ROOT);
        }, 1000);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [setSnack, navigate, setToken, setUser]
  );
  

 
  return { isLoading, error, handleLogin, handleLogout, handleSignup, handleGetUser  ,handleUpdateUser };
};

export default useUsers;