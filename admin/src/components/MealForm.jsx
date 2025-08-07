"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createMeal, resetMealState } from "@/Redux/slices/mealsSlice";

const MealForm = () => {
    const dispatch = useDispatch();
    const { loading, success, error } = useSelector((state) => state.meals);

    const [form, setForm] = useState({
        title: "",
        category: "vegetarian",
        items: [],  
        price: "",
        specialToday: "",
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const uploadImageToServer = async (imageFile) => {
        const formData = new FormData();
        formData.append("image", imageFile);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/image/upload`, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        console.log("Image upload response:", data);
        return data.url; // Cloudinary image URL
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = form.image;

        // Check if image is a File object (user uploaded file)
        if (form.image instanceof File) {
            try {
                imageUrl = await uploadImageToServer(form.image);
            } catch (err) {
                console.error("Image upload failed:", err);
                return;
            }
        }

        const payload = {
            ...form,
            items: form.items.split(",").map((item) => item.trim()),
            price: parseFloat(form.price),
            image: imageUrl,
        };

        dispatch(createMeal(payload));
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4">
            <Input name="title" placeholder="Title" onChange={handleChange} value={form.title} required />
            <Input name="category" placeholder="Category (vegetarian / non-vegetarian / vegan)" onChange={handleChange} value={form.category} required />
            <Textarea name="items" placeholder="Items (comma separated)" onChange={handleChange} value={form.items} required />
            <Input name="price" placeholder="Price" type="number" onChange={handleChange} value={form.price} required />
            <Textarea name="specialToday" placeholder="Special Today" onChange={handleChange} value={form.specialToday} />
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

            <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Meal"}
            </Button>

            {success && <p className="text-green-500">Meal created successfully!</p>}
            {error && <p className="text-red-500">Error: {error.message || "Something went wrong"}</p>}
        </form>
    );
};

export default MealForm;
