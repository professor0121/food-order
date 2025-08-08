"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createTiffin } from "@/Redux/slices/tiffinSlice"; // You need this slice
// or whatever your action is

const categories = [
    "Regular",
    "Premium",
    "Diet",
    "South Indian",
    "North Indian",
    "Custom",
];

const TiffinForm = () => {
    const dispatch = useDispatch();
    const { loading, success, error } = useSelector((state) => state.tiffin); // Replace with correct slice

    const [form, setForm] = useState({
        title: "",
        category: "",
        items: "",
        price: "",
        specialToday: "",
        image: "",
        availability: false,
        description: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const uploadImageToServer = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/image/upload`, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        console.log("Image upload response:", data);

        if (!res.ok || !data.url) {
            throw new Error("Upload failed");
        }

        return data.url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = form.image;

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

        dispatch(createTiffin(payload));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4">
            <Input name="title" placeholder="Tiffin Name" onChange={handleChange} value={form.title} required />

            <Select
                value={form.category}
                onValueChange={(value) =>
                    setForm((prev) => ({ ...prev, category: value }))
                }
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select category" />
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

            <Textarea
                name="items"
                placeholder="Items (comma separated)"
                onChange={handleChange}
                value={form.items}
                required
            />
            <Input
                name="price"
                type="number"
                placeholder="Price"
                onChange={handleChange}
                value={form.price}
                required
            />
            <Textarea
                name="specialToday"
                placeholder="Special Today"
                onChange={handleChange}
                value={form.specialToday}
            />
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
            <Textarea
                name="description"
                placeholder="Description"
                onChange={handleChange}
                value={form.description}
            />

            <div className="flex items-center space-x-2">
                <Input
                    type="checkbox"
                    name="availability"
                    checked={form.availability}
                    onChange={handleChange}
                />
                <label htmlFor="availability" className="text-sm">
                    Available
                </label>
            </div>

            <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit Tiffin"}
            </Button>

            {success && <p className="text-green-500">Tiffin created successfully!</p>}
            {error && <p className="text-red-500">Error: {error.message || "Something went wrong"}</p>}
        </form>
    );
};

export default TiffinForm;
