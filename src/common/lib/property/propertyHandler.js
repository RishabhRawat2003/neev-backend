import { uploadOnCloudinary } from '../../../util/cloudinary';
import propertyHelper from '../../helpers/property.helper';
import { generateSlug } from '../../util/utilHelper';


export async function addNewPropertyHandler(input) { 
    // Upload all images & wait
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
        videos,
        features: JSON.parse(input.features),
        nearbyFacilities: JSON.parse(input.nearbyFacilities)
    };

    return await propertyHelper.addObject(data);
}

export async function getPropertyDetailsHandler(input) {
    return await propertyHelper.getObjectById(input);
}

export async function updatePropertyDetailsHandler(input) { 
    let imagesParsed = JSON.parse(input.updateObject.existingImages)
    let videoParsed = JSON.parse(input.updateObject.existingVideos)
    const data = {
        ...input.updateObject,
        slug: generateSlug(input.updateObject.name),
        features: JSON.parse(input.updateObject.features),
        nearbyFacilities: JSON.parse(input.updateObject.nearbyFacilities),
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

    return await propertyHelper.directUpdateObject(input.objectId, data);
}

export async function getPropertyListHandler(input) {
    const list = await propertyHelper.getAllObjects(input);
    const count = await propertyHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deletePropertyHandler(input) {
    return await propertyHelper.deleteObjectById(input);
}

export async function getPropertyByQueryHandler(input) {
    return await propertyHelper.getObjectByQuery(input);
}  
