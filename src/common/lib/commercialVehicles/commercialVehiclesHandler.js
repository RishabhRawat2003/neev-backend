import commercialVehiclesHelper from '../../helpers/commercialVehicles.helper';

export async function addNewCommercialVehiclesHandler(input) {
    return await commercialVehiclesHelper.addObject(input);
}

export async function getCommercialVehiclesDetailsHandler(input) {
    return await commercialVehiclesHelper.getObjectById(input);
}

export async function updateCommercialVehiclesDetailsHandler(input) {
    return await commercialVehiclesHelper.directUpdateObject(input.objectId, input.updateObject);
}

export async function getCommercialVehiclesListHandler(input) {
    const list = await commercialVehiclesHelper.getAllObjects(input);
    const count = await commercialVehiclesHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deleteCommercialVehiclesHandler(input) {
    return await commercialVehiclesHelper.deleteObjectById(input);
}

export async function getCommercialVehiclesByQueryHandler(input) {
    return await commercialVehiclesHelper.getObjectByQuery(input);
}  
