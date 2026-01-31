
import _ from 'lodash';
import { Router } from 'express';

import {
    addNewStartupProductsHandler,
    deleteStartupProductsHandler,
    getStartupProductsDetailsHandler,
    getStartupProductsListHandler,
    updateStartupProductsDetailsHandler
} from '../../common/lib/startupProducts/startupProductsHandler';
import responseStatus from "../../common/constants/responseStatus.json";
import responseData from "../../common/constants/responseData.json";
import { upload } from '../../common/util/multer';
import protectRoutes from '../../common/util/protectRoutes';

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

        const outputResult = await getStartupProductsListHandler(filter);
        res.status(responseStatus.STATUS_SUCCESS_OK);
        res.send({
            status: responseData.SUCCESS,
            data: {
                startupProductsList: outputResult.list ? outputResult.list : [],
                startupProductsCount: outputResult.count ? outputResult.count : 0,
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


router.route('/new').post(protectRoutes.verifyAdmin, upload.fields([{ name: 'images', maxCount: 10 }, { name: 'videos', maxCount: 10 }]), async (req, res) => {
    try {
        if (!_.isEmpty(req.body)) {
            let data = {
                ...req.body
            }
            if (req.files) {
                data.images = req.files.images ? [...req.files.images] : []
                data.videos = req.files.videos ? [...req.files.videos] : []
            }
            const outputResult = await addNewStartupProductsHandler(data);
            res.status(responseStatus.STATUS_SUCCESS_OK);
            res.send({
                status: responseData.SUCCESS,
                data: {
                    startupProducts: outputResult ? outputResult : {}
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
            const gotStartupProducts = await getStartupProductsDetailsHandler(req.params);
            res.status(responseStatus.STATUS_SUCCESS_OK);
            res.send({
                status: responseData.SUCCESS,
                data: {
                    startupProducts: gotStartupProducts ? gotStartupProducts : {}
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

router.route('/:id/update').post(protectRoutes.verifyAdmin, upload.fields([{ name: 'images', maxCount: 10 }, { name: 'videos', maxCount: 10 }]), async (req, res) => {
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
            const updateObjectResult = await updateStartupProductsDetailsHandler(input);
            res.status(responseStatus.STATUS_SUCCESS_OK);
            res.send({
                status: responseData.SUCCESS,
                data: {
                    startupProducts: updateObjectResult ? updateObjectResult : {}
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
            const deletedStartupProducts = await deleteStartupProductsHandler(req.params.id);
            res.status(responseStatus.STATUS_SUCCESS_OK);
            res.send({
                status: responseData.SUCCESS,
                data: {
                    hasStartupProductsDeleted: true
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

