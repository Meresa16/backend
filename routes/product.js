
const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');
const auth = require('../midleware/auth')
var path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cbe) {
        cbe(null, './uploads/');
    },
    
    filename: function (req, file, cb) {
        cb(null,  file.fieldname +'-' +Date.now()+path.extname(file.originalname));
    }
});
const filFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error('unsuported files'))
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize:
            1024 * 1024 * 5
    },
    fileFilter: filFilter
});

router.post('/', upload.single('image'), productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:productId', productController.getProdut);
router.put('/delete/:productId', productController.editProduct);
router.delete('/update/:productId', productController.deleteProduct)

module.exports = router;