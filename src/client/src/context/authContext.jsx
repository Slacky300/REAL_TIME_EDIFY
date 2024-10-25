import { createContext, useContext, useEffect, useState } from "react";
import { getLocalStorageWithExpiry } from "../helpers/auth/auth.helper.js";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: ""
  });


  useEffect(() => {
    const data = getLocalStorageWithExpiry("auth");
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/users/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data?.token}`
          }

        });

        const result = await res.json();
        if (res.status === 200) {
          setAuth({
            user: result.user,
            token: data.token
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (data) {
      fetchUser();
    }
  }, []);



  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };