import Tiffin from '../models/tiffin.model.js';

export const findTiffinById = async (id) => {
    return await Tiffin.findById(id);
}

export const findTiffinByUserId = async (userId) => {
    return await Tiffin.find({ userId });
}

export const createTiffinDAO = async (tiffin) => {
    const newTiffin = new Tiffin(data);
    return await newTiffin.save();
};

export const findTiffinAll = async () => {
    return await Tiffin.find();
}

export const updateTiffinDAO = async (id, data) => {
    return await Tiffin.findByIdAndUpdate(id, data, { new: true });
}

export const deleteTiffinDAO = async (id) => {
    return await Tiffin.findByIdAndDelete(id);
}