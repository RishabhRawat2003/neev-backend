import preownedVehicleDealerLeadHelper from '../../helpers/preownedVehicleDealerLead.helper';

export async function addNewPreownedVehicleDealerLeadHandler(input) {
    return await preownedVehicleDealerLeadHelper.addObject(input);
}

export async function getPreownedVehicleDealerLeadDetailsHandler(input) {
    return await preownedVehicleDealerLeadHelper.getObjectById(input);
}

export async function updatePreownedVehicleDealerLeadDetailsHandler(input) {
    return await preownedVehicleDealerLeadHelper.directUpdateObject(input.objectId, input.updateObject);
}

export async function getPreownedVehicleDealerLeadListHandler(input) {
    const list = await preownedVehicleDealerLeadHelper.getAllObjects(input);
    const count = await preownedVehicleDealerLeadHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deletePreownedVehicleDealerLeadHandler(input) {
    return await preownedVehicleDealerLeadHelper.deleteObjectById(input);
}

export async function getPreownedVehicleDealerLeadByQueryHandler(input) {
    return await preownedVehicleDealerLeadHelper.getObjectByQuery(input);
}  
