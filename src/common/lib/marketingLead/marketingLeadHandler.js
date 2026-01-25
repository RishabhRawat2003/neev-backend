import marketingLeadHelper from '../../helpers/marketingLead.helper';
import marketingHelper from '../../helpers/marketing.helper';
import { Types } from 'mongoose';

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

export async function getMarketingLeadsForUserListHandler(input) {
    const page = Number(input.pageNum || 1);
    const limit = Number(input.pageSize || 10);
    const skip = (page - 1) * limit;

    const leadMatch = {};

    if (input.query.name) {
        leadMatch["marketingLeads.name"] = input.query.name;
    }

    if (input.query.status) {
        leadMatch["marketingLeads.status"] = input.query.status;
    }

    const pipeline = [
        {
            $match: {
                usersAssociated: new Types.ObjectId(input.query.id)
            }
        },
        {
            $lookup: {
                from: "marketingleads",
                localField: "_id",
                foreignField: "marketingId",
                as: "marketingLeads"
            }
        },
        { $unwind: "$marketingLeads" },

        ...(Object.keys(leadMatch).length
            ? [{ $match: leadMatch }]
            : []),


        {
            $sort: {
                "marketingLeads.created_at": -1
            }
        },

        {
            $facet: {
                data: [
                    { $skip: skip },
                    { $limit: limit },
                    {
                        $project: {
                            _id: "$marketingLeads._id",
                            name: "$marketingLeads.name",
                            phoneNumber:
                                "$marketingLeads.phoneNumber",
                            email: "$marketingLeads.email",
                            status: "$marketingLeads.status",
                            created_at:
                                "$marketingLeads.created_at",
                            productName: "$name",
                            productType: "$type",
                            productLink: "$link"
                        }
                    }
                ],
                totalCount: [{ $count: "count" }]
            }
        }
    ]

    const list = await marketingHelper.aggregate(pipeline);
    const data = list[0]?.data || [];
    const total = list[0]?.totalCount[0]?.count || 0;
    return { data, total };
}

export async function deleteMarketingLeadHandler(input) {
    return await marketingLeadHelper.deleteObjectById(input);
}

export async function getMarketingLeadByQueryHandler(input) {
    return await marketingLeadHelper.getObjectByQuery(input);
}  
