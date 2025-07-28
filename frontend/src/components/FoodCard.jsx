import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, ShoppingCart } from "lucide-react"

const FoodCard = ({
  image,
  name,
  description,
  price,
  isVeg,
  rating,
  category = "Snacks",
  deliveryTime = "30-40 min",
}) => {
  return (
    <Card className="w-full max-w-sm rounded-2xl shadow-md hover:shadow-xl transition duration-300">
      <CardHeader className="p-0">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-t-2xl"
        />
      </CardHeader>

      <CardContent className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          <Badge variant={isVeg ? "default" : "destructive"}>
            {isVeg ? "Veg" : "Non-Veg"}
          </Badge>
        </div>

        <div className="flex items-center gap-1 text-yellow-500">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < rating ? "currentColor" : "none"}
              stroke="currentColor"
            />
          ))}
          <span className="text-sm text-gray-500 ml-2">({rating})</span>
        </div>

        <p className="text-sm text-muted-foreground">{description}</p>

        <div className="flex justify-between items-center text-xs text-gray-500 pt-2">
          <span className="px-2 py-1 rounded-full bg-gray-100">{category}</span>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            {deliveryTime}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center px-4 pb-4">
        <span className="text-md font-bold text-green-600">₹{price}</span>
        <Button className="flex gap-2">
          <ShoppingCart size={16} />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

export default FoodCard
