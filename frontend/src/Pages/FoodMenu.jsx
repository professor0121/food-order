import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMeals } from "@/redux/slices/mealSlice";
import HeroAllPages from "@/components/HeroAllPages";
import { HeroBanner } from "@/images/images";

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const FoodMenu = () => {
  const { meals, loading, error } = useSelector((state) => state.meal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  const handleOrderNow = (meal) => {
    navigate(`/cart?id=${meal._id}`);
    console.log("Order Now clicked for:", meal);
  };

  const handleViewDetails = (meal) => {
    navigate(`/food-description?id=${meal._id}`);
  };


  return (
    <div>
      <HeroAllPages title="Food Menu" description="Explore our delicious food options" image={HeroBanner} />

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Top Trending Meals</h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="p-4">
                <Skeleton className="h-56 w-full rounded-md mb-4" />
                <Skeleton className="h-4 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3" />
              </Card>
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {meals.map((meal) => (
              <Card key={meal._id} className="flex flex-col justify-between">
                <CardHeader className="p-0">
                  <img
                    src={meal.image}
                    alt={meal.title}
                    className="w-full h-56 object-cover rounded-t-lg"
                  />
                </CardHeader>

                <CardContent className="p-4">
                  <CardTitle className="text-lg font-semibold">{meal.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{meal.category}</Badge>
                    <span className="text-green-600 font-bold">${meal.price}</span>
                  </CardDescription>

                  <div className="mt-3">
                    {meal.items && meal.items.length > 0 ? (
                      <ul className="list-disc pl-5 text-sm">
                        {meal.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No items available</p>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                  <Button className={"cursor-pointer"} onClick={() => handleOrderNow(meal)} variant="default">Order Now</Button>
                  <Button className={"cursor-pointer"} onClick={() => handleViewDetails(meal)} variant="secondary">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodMenu;
