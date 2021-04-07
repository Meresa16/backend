var express = require('express');
var router = express.Router();
const controller = require('../controller/biller.controller');
const auth = require('../midleware/auth')


router.get('/', controller.getaggregate);
router.get('/biller/unpaid',controller.getunpaid);
router.get('/getbiller',controller.getOneUnpaidBiller)
router.get('/bill/getallunpaid',controller.getAllunPaid)
router.get('/billers',controller.getBillers);
router.get('/biller',controller.getBiller)
router.put('/update',controller.updateBillers);
router.get('/date',controller.getCreatedDate)

//router.put('/update1',auth,controller.updatebyId)


module.exports = router