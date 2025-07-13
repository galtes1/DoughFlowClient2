import React, { createContext, useContext, useEffect, useMemo, useState, } from 'react';
  import { getUser, getToken } from '../Services/localStorageServices';
import { useNavigate } from 'react-router-dom';
  
  const UserContext = createContext();
  
  export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(getToken());
    const navigate = useNavigate();
    useEffect(() => {
      if (!user) {
      
        const userFromLocalStorage = getUser();
        setUser(userFromLocalStorage);
      }
    }, [user]);

    useEffect(() => {
      const token = localStorage.getItem("my token");
      if (token) {
        try {
          const decoded = JSON.parse(atob(token.split(".")[1]));
          const exp = decoded?.exp * 1000;
          const now = Date.now();
          if (exp && now > exp) {
            localStorage.removeItem("my token");
            setUser(null);
            setToken(null);
            navigate("/");
          }
        } catch (error) {
          console.error("Failed to decode token", error);
          localStorage.removeItem("my token");
          setUser(null);
          setToken(null);
          navigate("/");
        }
      }
    }, []);
    
    
  
    const value = useMemo(
      () => ({ user, setUser, token, setToken }),
      [user, token]
    );
  
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
  }
  
  export const useUser = () => {
    const context = useContext(UserContext);

    if (!context) throw new Error("useUser must be used within a provider!");
    return context;
  };
  