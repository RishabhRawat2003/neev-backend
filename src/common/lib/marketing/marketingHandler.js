import marketingHelper from '../../helpers/marketing.helper';
import { uploadOnCloudinary } from '../../../util/cloudinary';

export async function addNewMarketingHandler(input) {
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
        testimonials: JSON.parse(input.testimonials),
        features: JSON.parse(input.features),
        usersAssociated: JSON.parse(input.usersAssociated)
    };

    return await marketingHelper.addObject(data);
}

export async function getMarketingDetailsHandler(input) {
    return await marketingHelper.getObjectById(input);
}

export async function updateMarketingDetailsHandler(input) {
    let imagesParsed = JSON.parse(input.updateObject.existingImages)
    let videoParsed = JSON.parse(input.updateObject.existingVideos)

    const data = {
        ...input.updateObject,
        testimonials: JSON.parse(input.updateObject.testimonials),
        features: JSON.parse(input.updateObject.features),
        usersAssociated: JSON.parse(input.updateObject.usersAssociated)
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
    return await marketingHelper.directUpdateObject(input.objectId, data);
}

export async function getMarketingListHandler(input) {
    const list = await marketingHelper.getAllObjects(input);
    const count = await marketingHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deleteMarketingHandler(input) {
    return await marketingHelper.deleteObjectById(input);
}

export async function getMarketingByQueryHandler(input) {
    return await marketingHelper.getObjectByQuery(input);
}  
