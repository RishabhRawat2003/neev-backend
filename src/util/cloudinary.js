import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import configVariables from "../server/config";

dotenv.config({ path: "./.env" });

cloudinary.config({
    cloud_name: configVariables.CLOUDINARY_CLOUD_NAME,
    api_key: configVariables.CLOUDINARY_API_KEY,
    api_secret: configVariables.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        if (!buffer) return resolve(null);

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "auto",
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        uploadStream.end(buffer);
    });
};

export { uploadOnCloudinary };
