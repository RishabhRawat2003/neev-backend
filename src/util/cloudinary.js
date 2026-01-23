import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import configVariables from '../server/config'

dotenv.config({
    path: './.env'
})

cloudinary.config({
    cloud_name: configVariables.CLOUDINARY_CLOUD_NAME,
    api_key: configVariables.CLOUDINARY_API_KEY,
    api_secret: configVariables.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        })
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
    }
}

export { uploadOnCloudinary }