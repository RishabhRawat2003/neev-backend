import startupProductsLeadHelper from '../../helpers/startupProductsLead.helper';

export async function addNewStartupProductsLeadHandler(input) {
    return await startupProductsLeadHelper.addObject(input);
}

export async function getStartupProductsLeadDetailsHandler(input) {
    return await startupProductsLeadHelper.getObjectById(input);
}

export async function updateStartupProductsLeadDetailsHandler(input) {
    return await startupProductsLeadHelper.directUpdateObject(input.objectId, input.updateObject);
}

export async function getStartupProductsLeadListHandler(input) {
    const list = await startupProductsLeadHelper.getAllObjects(input);
    const count = await startupProductsLeadHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deleteStartupProductsLeadHandler(input) {
    return await startupProductsLeadHelper.deleteObjectById(input);
}

export async function getStartupProductsLeadByQueryHandler(input) {
    return await startupProductsLeadHelper.getObjectByQuery(input);
}  
