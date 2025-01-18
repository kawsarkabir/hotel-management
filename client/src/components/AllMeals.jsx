import { useState } from "react";
import useMeals from "../hooks/useMeals";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import MealCard from "./MealCard";

const AllMeals = () => {
  const [meals, loading] = useMeals(); // Reset is not used
  const [tabIndex, setTabIndex] = useState(0);
 
  if (loading) {
    return <p>Loading...</p>;
  }

  // Categorize meals
  const Upcoming = meals.filter((item) => item.category === "Upcoming");
  const Dinner = meals.filter((item) => item.category === "Dinner");
  const Lunch = meals.filter((item) => item.category === "Lunch");
  const Breakfast = meals.filter((item) => item.category === "Breakfast");
 
  return (
    <div>
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        {/* Tab List */}
        <TabList>
          <Tab>Breakfast</Tab>
          <Tab>Lunch</Tab>
          <Tab>Dinner</Tab>
          <Tab>All Meals</Tab>
        </TabList>
        <TabPanel>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 mt-12">
                {
                    Breakfast.slice(0-3).map(item => <MealCard key={item._id} item={item}></MealCard>)
                }
            </div>
          </TabPanel>
          <TabPanel>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 mt-12">
                {
                    Lunch.slice(0-3).map(item => <MealCard key={item._id} item={item}></MealCard>)
                }
            </div>
          </TabPanel>
          <TabPanel>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 mt-12">
                {
                    Dinner.slice(0-3).map(item => <MealCard key={item._id} item={item}></MealCard>)
                }
            </div>
          </TabPanel>
          <TabPanel>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 mt-12">
                {
                    meals.slice(0-3).map(item => <MealCard key={item._id} item={item}></MealCard>)
                }
            </div>
          </TabPanel>
      </Tabs>
    </div>
  );
};

export default AllMeals;
