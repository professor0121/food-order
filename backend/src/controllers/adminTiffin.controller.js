import asyncHandler from "../utils/asyncHandler.js";
import {createTiffinService,getTiffinService ,updateTiffinService,deleteTiffinService} from '../services/adminTiffin.service.js';

export const createTiffin = asyncHandler(async (req, res) => {
  const tiffin = await createTiffinService(req.body);
  res.status(201).json({
    success: true,
    message: "Tiffin created successfully",
    data: tiffin,
  });
});

export const getTiffin =asyncHandler(async(req,res)=>{
    const tiffin = await getTiffinService(req.params.id);
    res.status(200).json({
        success: true,
        message: "Tiffin fetched successfully",
        data: tiffin,
      });
})

export const updateTiffin = asyncHandler(async (req, res) => {
    const tiffin = await updateTiffinService(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Tiffin updated successfully",
      data: tiffin,
    });
  });

  export const deleteTiffin = asyncHandler(async (req, res) => {
    const tiffin = await deleteTiffinService(req.params.id);
    res.status(200).json({
      success: true,
      message: "Tiffin deleted successfully",
      data: tiffin,
    });
  });
  