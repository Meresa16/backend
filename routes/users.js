var express = require('express');
var router = express.Router();
const controller = require('../controller/user.conteroller');
const auth = require('../midleware/auth')

router.post('/signup', controller.regster)
router.post('/login', controller.login)
router.put('/profile', controller.profile)

module.exports = router;
