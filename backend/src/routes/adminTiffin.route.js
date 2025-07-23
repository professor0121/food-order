import express from 'express';
import { adminAuth } from '../middleware/admin.middleware.js';
import {createTiffin,getTiffin,updateTiffin,deleteTiffin} from '../controllers/adminTiffin.controller.js';

const route=express.Router();

route.post('/create-tiffin',adminAuth,createTiffin);
route.get('/get-tiffin',adminAuth,getTiffin);
route.patch('/update-tiffin',adminAuth,updateTiffin);
route.delete('/delete-tiffin',adminAuth,deleteTiffin);

export default route;