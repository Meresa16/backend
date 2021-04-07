var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
module.exports = function (app) {
    app.use('/api/user', require('./users'));
    app.use('/api/biller', require('./biller-route'));

   app.get('/*', (req, res) => {
        res.render('/frontend/src/index.html', {
           // root: path.join(__dirname, './frontend')
        });
    });
}