import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload_image = async (base64String: string, id: string) => {
    try {
        const result = await cloudinary.uploader.upload(base64String, {
            folder: "homefix/profile",
            public_id: `homefix/profile/${id}`,
            overwrite: true,
            use_filename: true,
            width: 200,
            height: 200,
            crop: "fill",
        });
        const url = result.url;
        return url;
    } catch (error) {
        console.log({ msg: error });
    }
};

export default upload_image;
