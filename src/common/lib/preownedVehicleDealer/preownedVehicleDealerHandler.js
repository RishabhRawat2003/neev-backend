import { uploadOnCloudinary } from '../../../util/cloudinary';
import preownedVehicleDealerHelper from '../../helpers/preownedVehicleDealer.helper';

export async function addNewPreownedVehicleDealerHandler(input) {

    const result = await uploadOnCloudinary(input.image.buffer);

    let data = {
        ...input,
        image: result.secure_url,
        specialties: JSON.parse(input.specialties),
        certifications: JSON.parse(input.certifications),
        areasServed: JSON.parse(input.areasServed)
    }

    return await preownedVehicleDealerHelper.addObject(data);
}

export async function getPreownedVehicleDealerDetailsHandler(input) {
    return await preownedVehicleDealerHelper.getObjectById(input);
}

export async function updatePreownedVehicleDealerDetailsHandler(input) {
    let doc = {
        ...input.updateObject
    }

    let result = ''
    if (doc.image) {
        let resultObj = await uploadOnCloudinary(doc.image.buffer);
        result = resultObj.secure_url
    } else {
        result = doc.existingImage
    }

    let data = {
        ...doc.updateObject,
        image: result,
        experience: Number(doc.experience),
        specialties: JSON.parse(doc.specialties),
        certifications: JSON.parse(doc.certifications),
        areasServed: JSON.parse(doc.areasServed)
    }
    return await preownedVehicleDealerHelper.directUpdateObject(input.objectId, data);
}

export async function getPreownedVehicleDealerListHandler(input) {
    const list = await preownedVehicleDealerHelper.getAllObjects(input);
    const count = await preownedVehicleDealerHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deletePreownedVehicleDealerHandler(input) {
    return await preownedVehicleDealerHelper.deleteObjectById(input);
}

export async function getPreownedVehicleDealerByQueryHandler(input) {
    return await preownedVehicleDealerHelper.getObjectByQuery(input);
}  
