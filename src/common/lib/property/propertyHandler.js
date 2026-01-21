import propertyHelper from '../../helpers/property.helper';

export async function addNewPropertyHandler(input) {
    return await propertyHelper.addObject(input);
}

export async function getPropertyDetailsHandler(input) {
    return await propertyHelper.getObjectById(input);
}

export async function updatePropertyDetailsHandler(input) {
    return await propertyHelper.directUpdateObject(input.objectId, input.updateObject);
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
