import commercialVehicleDealerLeadHelper from '../../helpers/commercialVehicleDealerLead.helper';

export async function addNewCommercialVehicleDealerLeadHandler(input) {
    return await commercialVehicleDealerLeadHelper.addObject(input);
}

export async function getCommercialVehicleDealerLeadDetailsHandler(input) {
    return await commercialVehicleDealerLeadHelper.getObjectById(input);
}

export async function updateCommercialVehicleDealerLeadDetailsHandler(input) {
    return await commercialVehicleDealerLeadHelper.directUpdateObject(input.objectId, input.updateObject);
}

export async function getCommercialVehicleDealerLeadListHandler(input) {
    const list = await commercialVehicleDealerLeadHelper.getAllObjects(input);
    const count = await commercialVehicleDealerLeadHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deleteCommercialVehicleDealerLeadHandler(input) {
    return await commercialVehicleDealerLeadHelper.deleteObjectById(input);
}

export async function getCommercialVehicleDealerLeadByQueryHandler(input) {
    return await commercialVehicleDealerLeadHelper.getObjectByQuery(input);
}  
