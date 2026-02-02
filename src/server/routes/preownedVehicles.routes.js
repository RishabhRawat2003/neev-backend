
import _ from 'lodash';
import { Router } from 'express';

import {
    addNewPreownedVehiclesHandler,
    deletePreownedVehiclesHandler,
    getPreownedVehiclesDetailsHandler,
    getPreownedVehiclesListHandler,
    updatePreownedVehiclesDetailsHandler
} from '../../common/lib/preownedVehicles/preownedVehiclesHandler';
import responseStatus from "../../common/constants/responseStatus.json";
import responseData from "../../common/constants/responseData.json";
import protectRoutes from '../../common/util/protectRoutes';
import { upload } from '../../common/util/multer';

const router = new Router();

router.route('/list').post(async (req, res) => {
    try {
        let filter = {};
        filter.query = {};

        const inputData = { ...req.body };
        if (inputData) {
            filter.pageNum = inputData.pageNum ? inputData.pageNum : 1;
            filter.pageSize = inputData.pageSize ? inputData.pageSize : 50;

            if (inputData.filters) {
                filter.query = inputData.filters;
            }
        } else {
            filter.pageNum = 1;
            filter.pageSize = 50;
        }

        filter.query = { ...filter.query };

        const outputResult = await getPreownedVehiclesListHandler(filter);
        res.status(responseStatus.STATUS_SUCCESS_OK);
        res.send({
            status: responseData.SUCCESS,
            data: {
                preownedVehiclesList: outputResult.list ? outputResult.list : [],
                preownedVehiclesCount: outputResult.count ? outputResult.count : 0,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(responseStatus.INTERNAL_SERVER_ERROR);
        res.send({
            status: responseData.ERROR,
            data: { message: err },
        });
    }
});


router.route('/new').post(protectRoutes.verifyAdmin, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'videos', maxCount: 5 }]), async (req, res) => {
    try {
        if (!_.isEmpty(req.body)) {
            let data = {
                ...req.body
            }
            if (req.files) {
                data.images = req.files.images ? [...req.files.images] : []
                data.videos = req.files.videos ? [...req.files.videos] : []
            }
            const outputResult = await addNewPreownedVehiclesHandler(data);
            res.status(responseStatus.STATUS_SUCCESS_OK);
            res.send({
                status: responseData.SUCCESS,
                data: {
                    preownedVehicles: outputResult ? outputResult : {}
                }
            });
        } else {
            throw 'no request body sent'
        }
    } catch (err) {
        console.log(err)
        res.status(responseStatus.INTERNAL_SERVER_ERROR);
        res.send({
            status: responseData.ERROR,
            data: { message: err }
        });
    }
});

router.route('/:id').get(async (req, res) => {
    try {
        if (req.params.id) {
            const gotPreownedVehicles = await getPreownedVehiclesDetailsHandler(req.params);
            res.status(responseStatus.STATUS_SUCCESS_OK);
            res.send({
                status: responseData.SUCCESS,
                data: {
                    preownedVehicles: gotPreownedVehicles ? gotPreownedVehicles : {}
                }
            });
        } else {
            throw 'no id param sent'
        }
    } catch (err) {
        console.log(err)
        res.status(responseStatus.INTERNAL_SERVER_ERROR);
        res.send({
            status: responseData.ERROR,
            data: { message: err }
        });
    }
});

router.route('/:id/update').post(protectRoutes.verifyAdmin, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'videos', maxCount: 5 }]), async (req, res) => {
    try {
        if (!_.isEmpty(req.params.id) && !_.isEmpty(req.body)) {
            let data = {
                ...req.body
            }
            if (req.files) {
                data.images = req.files.images ? [...req.files.images] : []
                data.videos = req.files.videos ? [...req.files.videos] : []
            }

            let input = {
                objectId: req.params.id,
                updateObject: data
            }
            const updateObjectResult = await updatePreownedVehiclesDetailsHandler(input);
            res.status(responseStatus.STATUS_SUCCESS_OK);
            res.send({
                status: responseData.SUCCESS,
                data: {
                    preownedVehicles: updateObjectResult ? updateObjectResult : {}
                }
            });
        } else {
            throw 'no body or id param sent'
        }
    } catch (err) {
        console.log(err)
        res.status(responseStatus.INTERNAL_SERVER_ERROR);
        res.send({
            status: responseData.ERROR,
            data: { message: err }
        });
    }
});

router.route('/:id/remove').post(async (req, res) => {
    try {
        if (req.params.id) {
            const deletedPreownedVehicles = await deletePreownedVehiclesHandler(req.params.id);
            res.status(responseStatus.STATUS_SUCCESS_OK);
            res.send({
                status: responseData.SUCCESS,
                data: {
                    hasPreownedVehiclesDeleted: true
                }
            });
        } else {
            throw 'no id param sent'
        }
    } catch (err) {
        console.log(err)
        res.status(responseStatus.INTERNAL_SERVER_ERROR);
        res.send({
            status: responseData.ERROR,
            data: { message: err }
        });
    }
});

export default router;

