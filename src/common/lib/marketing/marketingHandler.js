import marketingHelper from '../../helpers/marketing.helper';

export async function addNewMarketingHandler(input) {
    return await marketingHelper.addObject(input);
}

export async function getMarketingDetailsHandler(input) {
    return await marketingHelper.getObjectById(input);
}

export async function updateMarketingDetailsHandler(input) {
    return await marketingHelper.directUpdateObject(input.objectId, input.updateObject);
}

export async function getMarketingListHandler(input) {
    const list = await marketingHelper.getAllObjects(input);
    const count = await marketingHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deleteMarketingHandler(input) {
    return await marketingHelper.deleteObjectById(input);
}

export async function getMarketingByQueryHandler(input) {
    return await marketingHelper.getObjectByQuery(input);
}  
