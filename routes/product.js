
const express = require('express');
const router = express.Router();

const productController = require('../controller/product.controller');
const auth = require('../midleware/auth')

router.get('/', productController.getProducts);
router.post('/', productController.createProduct);
router.get('/:productId', productController.getProdut);
router.put('/:productId', productController.editProduct);
router.delete('/:productId', productController.deleteProduct)

module.exports = router;