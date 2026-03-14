import blogHelper from '../../helpers/blog.helper';
import { uploadOnCloudinary } from '../../../util/cloudinary';

export async function addNewBlogHandler(input) {
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
        keywords: JSON.parse(input.keywords)
    };
    return await blogHelper.addObject(data);
}

export async function getBlogDetailsHandler(input) {
    return await blogHelper.getObjectById(input);
}

export async function updateBlogDetailsHandler(input) {
    let imagesParsed = JSON.parse(input.updateObject.existingImages)
    let videoParsed = JSON.parse(input.updateObject.existingVideos)

    const data = {
        ...input.updateObject,
        keywords: JSON.parse(input.updateObject.keywords)
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

    return await blogHelper.directUpdateObject(input.objectId, data);
}

export async function getBlogListHandler(input) {
    const list = await blogHelper.getAllObjects(input);
    const count = await blogHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deleteBlogHandler(input) {
    return await blogHelper.deleteObjectById(input);
}

export async function getBlogByQueryHandler(input) {
    return await blogHelper.getObjectByQuery(input);
}  
