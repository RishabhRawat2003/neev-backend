import commercialVehicleLeadHelper from '../../helpers/commercialVehicleLead.helper';

export async function addNewCommercialVehicleLeadHandler(input) {
    return await commercialVehicleLeadHelper.addObject(input);
}

export async function getCommercialVehicleLeadDetailsHandler(input) {
    return await commercialVehicleLeadHelper.getObjectById(input);
}

export async function updateCommercialVehicleLeadDetailsHandler(input) {
    return await commercialVehicleLeadHelper.directUpdateObject(input.objectId, input.updateObject);
}

export async function getCommercialVehicleLeadListHandler(input) {
    const list = await commercialVehicleLeadHelper.getAllObjects(input);
    const count = await commercialVehicleLeadHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deleteCommercialVehicleLeadHandler(input) {
    return await commercialVehicleLeadHelper.deleteObjectById(input);
}

export async function getCommercialVehicleLeadByQueryHandler(input) {
    return await commercialVehicleLeadHelper.getObjectByQuery(input);
}  
