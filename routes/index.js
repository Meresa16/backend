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
  app.use('/api/comment', require('./comment'));
  app.use('/api/product', require('./product'));
  app.use('/api/order', require('./order'));

  app.get('/*', (req, res) => {
    res.render('index.jade',   {
      root: path.join(__dirname, './views')
    }
    );
  });
}