import { uploadOnCloudinary } from '../../../util/cloudinary';
import propertyHelper from '../../helpers/property.helper';

export async function addNewPropertyHandler(input) {
    // Upload all images & wait
    const images = await Promise.all(
        input.images.map(async (image) => {
            const result = await uploadOnCloudinary(image.path);
            return result.secure_url;
        })
    );

    const data = {
        ...input,
        images,
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
    const data = {
        ...input.updateObject,
        features: JSON.parse(input.updateObject.features),
        nearbyFacilities: JSON.parse(input.updateObject.nearbyFacilities),
    }

    let images = []
    if (data.images) {
        images = await Promise.all(
            data.images.map(async (image) => {
                const result = await uploadOnCloudinary(image.path);
                return result.secure_url;
            })
        );
    }

    data.images = [...images, ...imagesParsed]

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
