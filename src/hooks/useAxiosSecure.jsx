import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://etution-server.vercel.app",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 🔐 Request interceptor: add Firebase ID token
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          // IMPORTANT: Firebase theke token ana
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 🔁 Response interceptor: 401/403 hole logout + login e patha
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("Axios Secure Error:", error);

        const statusCode = error?.response?.status;

        if (statusCode === 401 || statusCode === 403) {
          try {
            await logOut();
            navigate("/login");
          } catch (err) {
            console.error("Logout failed:", err);
          }
        }

        return Promise.reject(error);
      }
    );

    // cleanup
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
