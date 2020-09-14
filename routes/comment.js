var express = require('express');
var router = express.Router();
var commentController=require('../controller/comment.controller');
var auth=require('../midleware/auth')

router.post('/',commentController.create);
router.get('/',auth,commentController.get_all_comment)
router.get('/:id',auth,commentController.get_comment)
router.delete('/:id', auth,commentController.delete_comment)
router.put('/:id',auth,commentController.update_comment)
module.exports=router;