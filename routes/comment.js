var express = require('express');
var router = express.Router();
var commentController = require('../controller/comment.controller');
var auth = require('../midleware/auth');


router.post('/', commentController.create);
router.get('/',   commentController.get_all_comment)
router.get('/:id', commentController.get_comment)
router.delete('/delet/:id', commentController.delete_comment)
router.put('/update/:id', commentController.update_comment)
module.exports = router;
