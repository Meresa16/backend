const express = require('express'),
    newsController = require('../controller/news.controller'),
    router = express.Router(),
    auth = require('../midleware/auth')



router.post('/', newsController.newsCreate);
router.get('/',newsController.getNews)
router.get('/:newsId',newsController.singleNews)
router.put('/:newsId',newsController.updateNews)
router.delete('/:newsId',newsController.newsDelete)

module.exports = router