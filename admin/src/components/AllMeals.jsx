import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllMeals } from '@/Redux/slices/mealsSlice';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody } from './ui/table';
import { IconBowlChopsticks } from '@tabler/icons-react';



const AllMeals = () => {
    const dispatch = useDispatch();
    const { meals, loading, error } = useSelector((state) => state.meals);
    useEffect(() => {
        dispatch(getAllMeals());
    }, [dispatch]);
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Meals List</CardTitle>
                        <CardDescription>
                            total Meals
                        </CardDescription>
                    </div>
                    <Button className="flex items-center gap-2">
                        <IconBowlChopsticks className="h-4 w-4" />
                        Create a Meal
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Meal Title</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Special Today</TableHead>
                            <TableHead>Joined Date</TableHead>
                            <TableHead>Featured Image</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {meals && meals.map((meal) => (
                            <TableRow key={meal._id}>
                                <TableHead>{meal.title}</TableHead>
                                <TableHead>{meal.price}</TableHead>
                                <TableHead>{meal.items.join(', ')}</TableHead>
                                <TableHead>{meal.specialToday ? 'Yes' : 'No'}</TableHead>
                                <TableHead>{new Date(meal.createdAt).toLocaleDateString()}</TableHead>
                                <TableHead>
                                    {meal.image && <img src={meal.image} alt={meal.title} className="w-16 h-16 object-cover" />}
                                </TableHead>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default AllMeals