var express = require('express');
var router = express.Router();
const controller = require('../controller/user.controller');
const auth = require('../midleware/auth')


router.post('/signup', controller.regster)
router.post('/login', controller.login)
router.get('/profile', controller.profile)


module.exports = router;
