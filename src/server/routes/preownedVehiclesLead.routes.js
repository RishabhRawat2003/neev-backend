
import _ from 'lodash';
import {Router} from 'express';

import {
    addNewPreownedVehiclesLeadHandler,
    deletePreownedVehiclesLeadHandler,
    getPreownedVehiclesLeadDetailsHandler,
    getPreownedVehiclesLeadListHandler,
    updatePreownedVehiclesLeadDetailsHandler
} from '../../common/lib/preownedVehiclesLead/preownedVehiclesLeadHandler';
import responseStatus from "../../common/constants/responseStatus.json";
import responseData from "../../common/constants/responseData.json";

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
  
      const outputResult = await getPreownedVehiclesLeadListHandler(filter);
      res.status(responseStatus.STATUS_SUCCESS_OK);
      res.send({
        status: responseData.SUCCESS,
        data: {
          preownedVehicleLeadList: outputResult.list ? outputResult.list : [],
          preownedVehicleLeadCount: outputResult.count ? outputResult.count : 0,
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


router.route('/new').post(async (req, res) => {
    try {
       if (!_.isEmpty(req.body)) {
            const outputResult = await addNewPreownedVehiclesLeadHandler(req.body);
            res.status(responseStatus.STATUS_SUCCESS_OK);
            res.send({
                status: responseData.SUCCESS,
                data: {
                    preownedVehicleLead: outputResult ? outputResult : {}
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
            const gotPreownedVehicleLead = await getPreownedVehiclesLeadDetailsHandler(req.params);
            res.status(responseStatus.STATUS_SUCCESS_OK);
            res.send({
                status: responseData.SUCCESS,
                data: {
                    preownedVehicleLead: gotPreownedVehicleLead ? gotPreownedVehicleLead : {}
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

router.route('/:id/update').post( async (req, res) => {
    try {
        if (!_.isEmpty(req.params.id) && !_.isEmpty(req.body)) {
            let input = {
                objectId: req.params.id,
                updateObject: req.body
            }
            const updateObjectResult = await updatePreownedVehiclesLeadDetailsHandler(input);
            res.status(responseStatus.STATUS_SUCCESS_OK);
                res.send({
                    status: responseData.SUCCESS,
                    data: {
                        preownedVehicleLead: updateObjectResult ? updateObjectResult : {}
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

router.route('/:id/remove').post(async(req, res) => {
    try {
        if (req.params.id) {
            const deletedPreownedVehicleLead = await deletePreownedVehiclesLeadHandler(req.params.id);
            res.status(responseStatus.STATUS_SUCCESS_OK);
            res.send({
                status: responseData.SUCCESS,
                data: {
                    hasPreownedVehicleLeadDeleted: true
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
  
