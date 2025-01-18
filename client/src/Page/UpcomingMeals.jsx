import React from 'react';
import useMeals from '../hooks/useMeals';
import MealCard from '../components/MealCard';

const UpcomingMeals = () => {
    const [meals,loading] = useMeals()
    if(loading){
        return "loading....."
    }
    const Upcoming = meals.filter((item) => item.category === 'Upcoming')
    console.log(Upcoming)
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto md:w-[90%] lg:w-[70%] gap-12">
                {
                    Upcoming.map(meal => <MealCard key={meal._id} item={meal}></MealCard>)
                }
            </div>
        </div>
    );
};

export default UpcomingMeals;