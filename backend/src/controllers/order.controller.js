import asyncHandler from "../utils/asyncHandler.js";

export const createOrder=asyncHandler(async(req,res)=>{
    res.send("create order")
})
export const cancelOrder=asyncHandler(async(req,res)=>{
    res.send("cancel order")
})
export const getOrder=asyncHandler(async(req,res)=>{
    res.send("get order")
})