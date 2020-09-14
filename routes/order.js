const express = require('express');
const router = express.Router();

const orderController=require('../controller/order.controller')

router.get('/',orderController.get_order);
router.post('/', orderController.create_order)
router.get('/:orderId', orderController.get_order_single)
router.delete('/:orderId', orderController.order_delete )
module.exports = router;