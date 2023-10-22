/**
 * Uploads an image to Cloudinary and returns the public URL of the uploaded image.
 *
 * @param {string} base64String - The base64 encoded image data.
 * @param {string} id - The unique identifier for the image.
 * @param {string} folder - The folder in which the image should be stored on Cloudinary.
 * @returns {string | null} The public URL of the uploaded image or null if an error occurs.
 */
import { v2 as cloudinary } from "cloudinary";

export const upload_image = async (
    base64String: string,
    id: string,
    folder: string
) => {
    if (
        !process.env.CLOUDINARY_NAME ||
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET
    ) {
        console.error(
            "Missing Cloudinary environment variables. Please ensure CLOUDINARY_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are set."
        );
        return null;
    }

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    try {
        const result = await cloudinary.uploader.upload(base64String, {
            folder: `homefix/${folder}`,
            public_id: `homefix/${folder}/${id}`,
            overwrite: true,
            use_filename: true,
            width: 200,
            height: 200,
            crop: "fill",
        });
        const url = result.url;
        return url;
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
};
