import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useMeals = () => {
const axiosSecure = useAxiosSecure()
const {data: meals = [],isLoading: loading, refetch } = useQuery({
    queryKey:['foods'],
    queryFn: async () =>{
        const response = await axiosSecure.get("/meals")
        return response.data
    }
})
    return [meals,loading, refetch ]
};

export default useMeals;


 
