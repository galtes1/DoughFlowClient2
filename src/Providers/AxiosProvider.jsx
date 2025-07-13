import axios from "axios";
import { useEffect } from "react";
import { useSnack } from "./SnackbarProvider";
import { useUser } from "../Users/Providers/UserProvider";
import { useNavigate } from "react-router-dom";

export default function AxiosProvider({ children }) {
  const { token, setUser, setToken } = useUser();
  const setSnack = useSnack();
  const navigate = useNavigate();

  useEffect(() => {
  
    const requestInterceptor = axios.interceptors.request.use((config) => {
      if (!config.url.includes("/login")) {
        const token = localStorage.getItem("my token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const isLoginRoute = error.config?.url?.includes("/login");
    
        if (error.response?.status === 401 && !isLoginRoute) {
          console.log("401 received (not login)");
          localStorage.removeItem("my token");
          setUser(null);
          setToken(null);
          setTimeout(() => navigate("/"), 100);
        }
    
        if (error.message) {
          setSnack("error", error.message);
        }
    
        return Promise.reject(error);
      }
    );
    

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [token, setUser, setToken, setSnack, navigate]);

  return children;
}
