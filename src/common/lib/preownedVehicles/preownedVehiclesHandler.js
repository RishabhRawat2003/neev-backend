import { uploadOnCloudinary } from '../../../util/cloudinary';
import preownedVehiclesHelper from '../../helpers/preownedVehicles.helper';
import { generateSlug } from '../../util/utilHelper';

export async function addNewPreownedVehiclesHandler(input) {
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
    return await preownedVehiclesHelper.addObject(data);
}

export async function getPreownedVehiclesDetailsHandler(input) {
    return await preownedVehiclesHelper.getObjectById(input);
}

export async function updatePreownedVehiclesDetailsHandler(input) {
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
    return await preownedVehiclesHelper.directUpdateObject(input.objectId, data);
}

export async function getPreownedVehiclesListHandler(input) {
    const list = await preownedVehiclesHelper.getAllObjects(input);
    const count = await preownedVehiclesHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deletePreownedVehiclesHandler(input) {
    return await preownedVehiclesHelper.deleteObjectById(input);
}

export async function getPreownedVehiclesByQueryHandler(input) {
    return await preownedVehiclesHelper.getObjectByQuery(input);
}  
