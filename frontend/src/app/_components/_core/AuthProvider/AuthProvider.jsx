import React, { useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { eraseCookie, getCookie, setCookie } from "@jumbo/utilities/cookies";
import axios from "axios";
import { toast } from "react-toastify";
import API from "@app/pages/admin/api/api";

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [userLoading, setUserLoading] = React.useState(false);
  // useState for loggeg in users
  const [loggedInUser, setLoggedInUser] = React.useState({})

  const fetchLoggedInUser = async () => {
    setUserLoading(true);
    try {
      const response = await API.get("/api/users/me"); // prepend /api here
      if (response) {
        setIsAuthenticated(true);
      }
      setLoggedInUser(response.data);
      return response.data;
    } catch (error) {
      console.log("error message:", error);
      return false;
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    fetchLoggedInUser()
  }, [])

  // Fetch user data from API
  const fetchUser = async () => {
    setUserLoading(true);
    try {
      const response = await API.get("/api/users"); // <-- /api
      if (response.data) {
        setUser(response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      if (error.response?.status === 401) {
        setIsAuthenticated(false);
        setUser(null);
      }
      return null;
    } finally {
      setUserLoading(false);
    }
  };

  // Update user data (for profile updates)
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  // Refresh user data (re-fetch from server)
  const refreshUser = async () => {
    return await fetchUser();
  };


  // Refresh user data (re-fetch from server)
  const refreshLoggegInUser = async () => {
    return await fetchLoggedInUser();
  };

  // const login = async ({ email, password }) => {
  //   setLoading(true);
  //   try {
  //     const response = await API.post("/api/auth/login", { email, password }); // <-- /api
  //     if (response.data.token) {
  //       setCookie("token", response.data.token, 1);
  //       setIsAuthenticated(true);
  //       await fetchUser();
  //       await fetchLoggedInUser();
  //       toast.success("Login successful! Welcome back!");
  //       return response.data;
  //     }
  //     return false;
  //   } catch (error) {
  //     setIsAuthenticated(false);
  //     toast.error(error.response?.data?.message || "Login failed. Please try again.");
  //     return false;
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const response = await API.post("/api/auth/login", { email, password });

      if (response.data.token) {
        // Instead of manually setting cookie, set header for fallback
        API.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

        setIsAuthenticated(true);
        await fetchUser();
        await fetchLoggedInUser();
        toast.success("Login successful! Welcome back!");
        return response.data;
      }

      return false;
    } catch (error) {
      setIsAuthenticated(false);
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };



  const logout = async () => {
    try {
      const response = await API.post("/api/auth/logout", {}); // <-- /api
      if (response.status === 200) {
        eraseCookie("token");
        setIsAuthenticated(false);
        setUser(null);
        toast.info("Logged out successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed. Please try again.");
    }
  };

  React.useEffect(() => {
    const initializeAuth = async () => {
      let authUserSr = getCookie("token");
      if (authUserSr) {
        setIsAuthenticated(true);
        // Fetch user data if authenticated
        await fetchUser();
        await fetchLoggedInUser()
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      loading,
      login,
      logout,
      setIsAuthenticated,
      user,
      userLoading,
      fetchUser,
      updateUser,
      refreshUser,
      fetchLoggedInUser,
      loggedInUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}


