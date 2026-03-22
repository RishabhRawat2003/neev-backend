import { uploadOnCloudinary } from '../../../util/cloudinary';
import commercialVehiclesHelper from '../../helpers/commercialVehicles.helper';
import { generateSlug } from '../../util/utilHelper';

export async function addNewCommercialVehiclesHandler(input) {
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
        slug: generateSlug(input.name),
        images,
        videos
    };
    return await commercialVehiclesHelper.addObject(data);
}

export async function getCommercialVehiclesDetailsHandler(input) {
    return await commercialVehiclesHelper.getObjectById(input);
}

export async function updateCommercialVehiclesDetailsHandler(input) {
    let imagesParsed = JSON.parse(input.updateObject.existingImages)
    let videoParsed = JSON.parse(input.updateObject.existingVideos)

    const data = {
        ...input.updateObject,
        slug: generateSlug(input.updateObject.name),
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
    return await commercialVehiclesHelper.directUpdateObject(input.objectId, data);
}

export async function getCommercialVehiclesListHandler(input) {
    const list = await commercialVehiclesHelper.getAllObjects(input);
    const count = await commercialVehiclesHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deleteCommercialVehiclesHandler(input) {
    return await commercialVehiclesHelper.deleteObjectById(input);
}

export async function getCommercialVehiclesByQueryHandler(input) {
    return await commercialVehiclesHelper.getObjectByQuery(input);
}  
