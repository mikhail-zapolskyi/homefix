import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload_image = async (base64String: string) => {
    try {
        const result = await cloudinary.uploader.upload(base64String, {
            folder: "homefix/profile",
            overwrite: true,
            invalidate: true,
            width: 810,
            height: 456,
            crop: "fill",
        });
        const url = result.url;
        return url;
    } catch (error) {
        console.log({ msg: error });
    }
};

export default upload_image;
