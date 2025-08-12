import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleMeal } from "@/redux/slices/mealSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent,CardHeader,CardTitle,CardDescription ,CardFooter} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const FoodDescription = () => {
  const [searchParams] = useSearchParams();
  const mealId = searchParams.get("id");

  const dispatch = useDispatch();
  const { singleMeal, meals, loading, error } = useSelector(
    (state) => state.meal
  );

  useEffect(() => {
    if (mealId) {
      dispatch(getSingleMeal(mealId));
    }
  }, [mealId, dispatch]);


  const handleOrderNow=()=>{
    console.log("")
  }
  const handleViewDetails=()=>{
    console.log("hi")
  }
  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-screen w-full rounded-none" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">Error: {error}</p>;
  }

  return (
    <div className="w-full">
      {/* Fullscreen Image Section */}
      {singleMeal && (
        <div className="relative w-full h-screen">
          <img
            src={singleMeal.image}
            alt={singleMeal.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 text-white">
            <h1 className="text-3xl font-bold">{singleMeal.title}</h1>
            <p className="text-lg text-gray-200">{singleMeal.category}</p>
            <p className="text-xl font-semibold mt-2">${singleMeal.price}</p>
            <Button className="mt-4 w-full cursor-pointer" variant="secondary">
              Order Now
            </Button>
          </div>
        </div>
      )}

      {/* Other Meals */}
      {meals?.length > 0 && (
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Other Meals</h3>
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
        </div>
      )}
    </div>
  );
};

export default FoodDescription;
