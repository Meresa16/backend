
const express = require('express');
const router = express.Router();

const productController = require('../controller/product.controller');
const auth = require('../midleware/auth')

router.get('/',productController.getProducts);
router.post('/', auth, productController.createProduct);
router.get('/:productId', auth, productController.getProdut);
router.put('/:productId', auth, productController.editProduct);
router.delete('/:productId', auth, productController.deleteProduct)

module.exports = router;