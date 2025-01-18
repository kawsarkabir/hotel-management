import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MealCard from "./MealCard";
import useAxiosOpen from "../hooks/useAxiosOpen";

const Meals = () => {
  const axiosOpen = useAxiosOpen();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [priceRange, setPriceRange] = useState([]); // [minPrice, maxPrice]

  // Fetch meals dynamically based on filters
  const {
    data: meals = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["meals", { filter, search, priceRange }],
    queryFn: async () => {
      const { data } = await axiosOpen.get(
        `/meals?filter=${filter}&search=${search}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`
      );
      return data;
    },
  
  });
console.log(meals)
  
  return (
    <div className="mt-12 mx-auto md:w-[90%] lg:w-[70%]">
      <div className="flex flex-wrap gap-6 justify-between">
        {/* Filter by Category */}
        <div className="w-[290px]">
          <label className="label">
            <span className="label-text">Filter By Category:</span>
          </label>
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="select select-bordered w-full max-w-xs"
            value={filter}
          >
  
            <option value="">Select  Category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Upcoming">Upcoming</option>
          </select>
        </div>

        {/* Filter by Price Range */}
        <div className="w-[290px]">
          <label className="label">
            <span className="label-text">Filter By Price Range:</span>
          </label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={priceRange[0]}
              min="0"
              max="1000"
              onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
              className="input input-bordered w-1/2"
            />
            <input
              type="number"
              value={priceRange[1]}
              min="0"
              max="1000"
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              className="input input-bordered w-1/2"
            />
          </div>
        </div>

        {/* Search by Title */}
        <div className="w-[290px]">
          <label className="label">
            <span className="label-text">Search by Title:</span>
          </label>
          <div className="relative">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search"
              className="input input-bordered w-full"
            />
            <FaSearch className="text-gray-400 absolute right-2 top-3" />
          </div>
        </div>
      </div>

      {/* Meals Display */}
      {
        isLoading ? <div className="min-h-14">loadin..</div>:<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-8">
        {meals.map((meal) => (
          <MealCard key={meal._id} item={meal} />
        ))}
      </div>
      }
    </div>
  );
};

export default Meals;



    