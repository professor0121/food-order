import React, { useState } from 'react'
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux';
import { createTiffin } from '@/Redux/slices/tiffinSlice';

const categories = [
    "Regular",
    "Premium",
    "Diet",
    "South Indian",
    "North Indian",
    "Custom",
]

const TiffinForm = () => {

    const dispatch = useDispatch();
    const { loading, success, error } = useSelector((state) => state.tiffin);
    const [form, setForm] = useState({
        name: '',
        category: '',
        items: '',
        price: '',
        specialToday: '',
        image: null,
        description: '',
        available: false,
    })

    const uploadImageToServer = async (file) => {
        if (!file) return null;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/image/upload`, {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            console.log('📦 Image Upload API Response:', data.url); // 👈 Add this
            return data.url; // Assuming the API returns the image URL in 'url' field

        } catch (err) {
            console.error('❌ Upload error:', err);
            throw err;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let imageUrl = form.image;

        // Check if image is a File object (user uploaded file)
        if (form.image instanceof File) {
            try {
                imageUrl = await uploadImageToServer(form.image);
                console.log("Image uploaded successfully:", imageUrl);
            } catch (err) {
                console.error("Image upload failed:", err);
                return;
            }
        }
        console.log("imageurl", imageUrl);
        // Submit the form data along with the image URL
        const formData = {
            ...form,
            image: imageUrl,
        }

        console.log('Form Submitted:', formData)
        // Add actual submission logic here
        dispatch(createTiffin(formData));
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Tiffin Form</CardTitle>
                    <CardDescription>Create a new tiffin</CardDescription>
                </CardHeader>
                <CardContent>
                    <Input
                        type="text"
                        placeholder="Tiffin Name"
                        className="mb-4"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <Select
                        value={form.category}
                        onValueChange={(value) => setForm({ ...form, category: value })}
                    >
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem
                                    key={category}
                                    value={category.toLowerCase().replace(/\s+/g, "_")}
                                >
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>


                    <Input
                        type="text"
                        placeholder="Items (comma separated)"
                        className="mb-4"
                        value={form.items}
                        onChange={(e) => setForm({ ...form, items: e.target.value })}
                    />

                    <Input
                        type="number"
                        placeholder="Price"
                        className="mb-4"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                    />

                    <Input
                        type="text"
                        placeholder="Special Today"
                        className="mb-4"
                        value={form.specialToday}
                        onChange={(e) => setForm({ ...form, specialToday: e.target.value })}
                    />

                    <Input
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0]
                            if (file) {
                                setForm({ ...form, image: file })
                            }
                        }}
                    />

                    <Input
                        type="text"
                        placeholder="Description"
                        className="mb-4"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />

                    <div className="flex items-center mb-4 max-w-xs">
                        <Input
                            type="checkbox"
                            id="availability"
                            className="mr-2 w-4 h-4"
                            checked={form.available}
                            onChange={(e) => setForm({ ...form, available: e.target.checked })}
                        />
                        <label htmlFor="availability" className="text-sm">Available</label>
                    </div>
                </CardContent>
                <CardContent className="flex justify-end">
                    <Button type="submit">Submit</Button>
                </CardContent>
            </Card>
        </form>
    )
}

export default TiffinForm
