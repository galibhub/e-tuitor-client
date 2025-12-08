// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";

// const useUserRole = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data, isLoading } = useQuery({
//     queryKey: ["userRole", user?.email],
//     enabled: !!user?.email,          // user.email thakle query run hobe
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/role/${user.email}`);
//       return res.data;               // { role: 'student' }
//     },
//   });

//   return {
//     role: data?.role || "student",   // default student
//     isRoleLoading: isLoading,
//   };
// };

// export default useUserRole;


import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user && !authLoading,   // user thakle call hobe
    retry: false,                      // 404 hole bar bar retry korbena
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data;                 // { role: "student" | "tutor" | "admin" }
    },
  });

  const role = data?.role || "student";

  return {
    role,
    isRoleLoading: authLoading || isLoading,
    error,
  };
};

export default useUserRole;
