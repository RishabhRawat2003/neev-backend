import preownedVehiclesLeadHelper from '../../helpers/preownedVehiclesLead.helper';

export async function addNewPreownedVehiclesLeadHandler(input) {
    return await preownedVehiclesLeadHelper.addObject(input);
}

export async function getPreownedVehiclesLeadDetailsHandler(input) {
    return await preownedVehiclesLeadHelper.getObjectById(input);
}

export async function updatePreownedVehiclesLeadDetailsHandler(input) {
    return await preownedVehiclesLeadHelper.directUpdateObject(input.objectId, input.updateObject);
}

export async function getPreownedVehiclesLeadListHandler(input) {
    const list = await preownedVehiclesLeadHelper.getAllObjects(input);
    const count = await preownedVehiclesLeadHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deletePreownedVehiclesLeadHandler(input) {
    return await preownedVehiclesLeadHelper.deleteObjectById(input);
}

export async function getPreownedVehiclesLeadByQueryHandler(input) {
    return await preownedVehiclesLeadHelper.getObjectByQuery(input);
}  
