import { findTiffinById, createTiffinDAO,findTiffinAll ,updateTiffinDAO,deleteTiffinDAO} from '../dao/tiffin.dao.js';

export const createTiffinService = async (data) => {
  return await createTiffinDAO(data);
};

export const getTiffinService = async () => {
  return await findTiffinAll();
};

export const updateTiffinService = async (id, data) => {
  return await updateTiffinDAO(id, data);
};

export const deleteTiffinService = async (id) => {
  return await deleteTiffinDAO(id);
};
