import axios from "axios";

const axiosOpen = axios.create({
  baseURL: "https://hostel-management-server-tau.vercel.app",
});

const useAxiosOpen = () => {
  return axiosOpen;
};

export default useAxiosOpen;
