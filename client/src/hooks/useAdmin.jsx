import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useAdmin = () => {
    const { user } = useAuth(); 
    const axiosSecure = useAxiosSecure(); 
  
    const { data: isAdmin = false, isLoading: isAdminLoading } = useQuery({
      queryKey: [user?.email, "isAdmin"],  
      queryFn: async () => {
        if (!user?.email) return false; 
        const res = await axiosSecure.get(`/users/admin/${encodeURIComponent(user.email)}`);
        return res.data?.admin;
      },
      onError: (error) => {
        console.error("Error fetching admin status:", error);
      },
    });
  
    return [isAdmin, isAdminLoading];
  };
   
  

export default useAdmin;