import marketingLeadHelper from '../../helpers/marketingLead.helper';

export async function addNewMarketingLeadHandler(input) {
    return await marketingLeadHelper.addObject(input);
}

export async function getMarketingLeadDetailsHandler(input) {
    return await marketingLeadHelper.getObjectById(input);
}

export async function updateMarketingLeadDetailsHandler(input) {
    return await marketingLeadHelper.directUpdateObject(input.objectId, input.updateObject);
}

export async function getMarketingLeadListHandler(input) {
    const list = await marketingLeadHelper.getAllObjects(input);
    const count = await marketingLeadHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deleteMarketingLeadHandler(input) {
    return await marketingLeadHelper.deleteObjectById(input);
}

export async function getMarketingLeadByQueryHandler(input) {
    return await marketingLeadHelper.getObjectByQuery(input);
}  
