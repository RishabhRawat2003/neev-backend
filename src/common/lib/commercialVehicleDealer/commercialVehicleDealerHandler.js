import { uploadOnCloudinary } from '../../../util/cloudinary';
import commercialVehicleDealerHelper from '../../helpers/commercialVehicleDealer.helper';

export async function addNewCommercialVehicleDealerHandler(input) {

    const result = await uploadOnCloudinary(input.image.buffer);

    let data = {
        ...input,
        image: result.secure_url,
        specialties: JSON.parse(input.specialties),
        certifications: JSON.parse(input.certifications),
        areasServed: JSON.parse(input.areasServed)
    }

    return await commercialVehicleDealerHelper.addObject(data);
}

export async function getCommercialVehicleDealerDetailsHandler(input) {
    return await commercialVehicleDealerHelper.getObjectById(input);
}

export async function updateCommercialVehicleDealerDetailsHandler(input) {
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

    return await commercialVehicleDealerHelper.directUpdateObject(input.objectId, data);
}

export async function getCommercialVehicleDealerListHandler(input) {
    const list = await commercialVehicleDealerHelper.getAllObjects(input);
    const count = await commercialVehicleDealerHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deleteCommercialVehicleDealerHandler(input) {
    return await commercialVehicleDealerHelper.deleteObjectById(input);
}

export async function getCommercialVehicleDealerByQueryHandler(input) {
    return await commercialVehicleDealerHelper.getObjectByQuery(input);
}  
