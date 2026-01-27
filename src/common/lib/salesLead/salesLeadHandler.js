import salesLeadHelper from '../../helpers/salesLead.helper';

export async function addNewSalesLeadHandler(input) {
    return await salesLeadHelper.addObject(input);
}

export async function getSalesLeadDetailsHandler(input) {
    return await salesLeadHelper.getObjectById(input);
}

export async function updateSalesLeadDetailsHandler(input) {
    return await salesLeadHelper.directUpdateObject(input.objectId, input.updateObject);
}

export async function getSalesLeadListHandler(input) {
    const list = await salesLeadHelper.getAllObjects(input);
    const count = await salesLeadHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deleteSalesLeadHandler(input) {
    return await salesLeadHelper.deleteObjectById(input);
}

export async function getSalesLeadByQueryHandler(input) {
    return await salesLeadHelper.getObjectByQuery(input);
}  
