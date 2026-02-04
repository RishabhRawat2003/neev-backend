import contractorHelper from '../../helpers/contractor.helper';

export async function addNewContractorHandler(input) {
    return await contractorHelper.addObject(input);
}

export async function getContractorDetailsHandler(input) {
    return await contractorHelper.getObjectById(input);
}

export async function updateContractorDetailsHandler(input) {
    return await contractorHelper.directUpdateObject(input.objectId, input.updateObject);
}

export async function getContractorListHandler(input) {
    const list = await contractorHelper.getAllObjects(input);
    const count = await contractorHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deleteContractorHandler(input) {
    return await contractorHelper.deleteObjectById(input);
}

export async function getContractorByQueryHandler(input) {
    return await contractorHelper.getObjectByQuery(input);
}  
