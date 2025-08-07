import React from 'react'
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select'

const categories = [
    "Regular",
    "Premium",
    "Diet",
    "South Indian",
    "North Indian",
    "Custom",
];



const TiffinForm = () => {
    return (
        <form className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Tiffin Form</CardTitle>
                    <CardDescription>
                        Create a new tiffin
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Input type="text" placeholder="Tiffin Name" className="mb-4" />
                    <Select onValueChange={(value) => console.log(value)}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, "_")}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Input type="text" placeholder="Items (comma separated)" className="mb-4" />
                    <Input type="number" placeholder="Price" className="mb-4" />
                    <Input type="text" placeholder="Special Today" className="mb-4" />
                    <Input
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setForm((prev) => ({ ...prev, image: file }));
                            }
                        }}
                    />
                    <Input type="text" placeholder="Description" className="mb-4" />
                    <div className="flex items-center mb-4">
                        <Input type="checkbox" id="availability" className="mr-2" />
                        <label htmlFor="availability">Available</label>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}

export default TiffinForm