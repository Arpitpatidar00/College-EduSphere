import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) throw new Error("File path is missing.");
    
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });

    console.log("File uploaded on Cloudinary", response.url);
    
    // Delete the file only after successful upload
    fs.unlinkSync(localFilePath);
    return response;
   
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);
    
    // Remove the file if the upload fails
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // deleting local file
    }
      
    // Return a meaningful error message
    return { success: false, message: "Upload failed", error: error.message };
  }
};
  