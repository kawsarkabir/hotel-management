import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
   baseURL:'https://hostel-management-server-tau.vercel.app'
})

const useAxiosSecure = () => {
   const navigate = useNavigate()
   const {handleSignOut} = useAuth()
   axiosSecure.interceptors.request.use(function (config) {
      const token = localStorage.getItem('access-token')
      config.headers.authorization = `Bearer ${token}`;
      return config
   },function (error) {
      return Promise.reject(error)
   })
 
// interceptors 401 and 403 status
axiosSecure.interceptors.response.use(function(response) {
   return response
}, async (error) =>{
   const status = error.response.status;
   if(status === 401 || status === 403){
      await handleSignOut();
      navigate("/login")
   }
return Promise.reject(error)
})

   return axiosSecure
};

export default useAxiosSecure;