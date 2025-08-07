import cloudinary from '../config/cloudinary.js';

export const uploadToCloudinary = async (filePath, folder = 'uploads') => {
  try {
    console.log("Uploading to Cloudinary:", filePath);
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
    });
    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    throw new Error('Cloudinary upload failed: ' + error.message);
  }
};
