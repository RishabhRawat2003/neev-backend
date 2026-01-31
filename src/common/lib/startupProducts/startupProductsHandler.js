import { uploadOnCloudinary } from '../../../util/cloudinary';
import startupProductsHelper from '../../helpers/startupProducts.helper';

export async function addNewStartupProductsHandler(input) {
    let images = []
    let videos = []
    if (input.images.length > 0) {
        images = await Promise.all(
            input.images.map(async (image) => {
                const result = await uploadOnCloudinary(image.buffer);
                return result.secure_url;
            })
        );
    }
    if (input.videos.length > 0) {
        videos = await Promise.all(
            input.videos.map(async (video) => {
                const result = await uploadOnCloudinary(video.buffer);
                return result.secure_url;
            })
        );
    }

    const data = {
        ...input,
        images,
        videos,
        key_features: JSON.parse(input.key_features),
        manufacturer_details: JSON.parse(input.manufacturer_details)
    };
    return await startupProductsHelper.addObject(data);
}

export async function getStartupProductsDetailsHandler(input) {
    return await startupProductsHelper.getObjectById(input);
}

export async function updateStartupProductsDetailsHandler(input) {
    let imagesParsed = JSON.parse(input.updateObject.existingImages)
    let videoParsed = JSON.parse(input.updateObject.existingVideos)

    const data = {
        ...input.updateObject,
        key_features: JSON.parse(input.updateObject.key_features),
        manufacturer_details: JSON.parse(input.updateObject.manufacturer_details),
    }

    let images = []
    let videos = []
    if (data.images) {
        images = await Promise.all(
            data.images.map(async (image) => {
                const result = await uploadOnCloudinary(image.buffer);
                return result.secure_url;
            })
        );
    }

    if (data.videos) {
        videos = await Promise.all(
            data.videos.map(async (video) => {
                const result = await uploadOnCloudinary(video.buffer);
                return result.secure_url;
            })
        );
    }

    data.images = [...images, ...imagesParsed]
    data.videos = [...videos, ...videoParsed]

    return await startupProductsHelper.directUpdateObject(input.objectId, data);
}

export async function getStartupProductsListHandler(input) {
    const list = await startupProductsHelper.getAllObjects(input);
    const count = await startupProductsHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deleteStartupProductsHandler(input) {
    return await startupProductsHelper.deleteObjectById(input);
}

export async function getStartupProductsByQueryHandler(input) {
    return await startupProductsHelper.getObjectByQuery(input);
}  
