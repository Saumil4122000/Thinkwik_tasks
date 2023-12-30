import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthProvider } from "./AuthContext";
import { RegistrationType } from "../Types/User.type";
import { USER_STORAGE_KEY } from "./StorageConstant";

export const Auth = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<RegistrationType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const removeCredentials = useCallback(() => {
    sessionStorage.removeItem("isLoggedIn");
    setIsAuthenticated(false);
  }, [setIsAuthenticated]);

  const getUserDetails = useCallback(() => {
    try {
      setIsLoading(true);

      // Getting the UserDetails from local storage
      const loggedUser = localStorage.getItem(USER_STORAGE_KEY);

      if (loggedUser) {
        const parsedUserData = JSON.parse(loggedUser);
        setUser(parsedUserData);
        setIsAuthenticated(true);
      } else {
        throw new Error("No user details found");
      }
    } catch (error) {
      console.error(error);
      removeCredentials();
    } finally {
      setIsLoading(false);
    }
  }, [removeCredentials, setIsLoading, setIsAuthenticated, setUser]);

  const logout = useCallback(() => {
    removeCredentials();
  }, [removeCredentials]);

  const setUserDetail = (userState: RegistrationType) => {
    setUser({...userState});
  };

  const login = useCallback(() => {
    sessionStorage.setItem("isLoggedIn", "LOGGED_IN");
    // set authentication as true
    setIsAuthenticated(true);
  }, [setIsAuthenticated]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  const values = useMemo(() => {
    return {
      user,
      isLoading,
      isAuthenticated,
      login,
      logout,
      setUserDetail
    };
  }, [user, isLoading, isAuthenticated, login, logout]);

  return <AuthProvider value={values}>{children}</AuthProvider>;
};
