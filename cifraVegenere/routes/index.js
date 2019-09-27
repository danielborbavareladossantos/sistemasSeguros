var controller = require('../controllers/index');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '' });
});

/* POST encripty. */
router.post('/encript', function(req, res, next) {
  controller.postE(req, res, next);
});

/* POST decripty. */
router.post('/decripty', function(req, res, next) {
  controller.postD(req, res, next);
});

module.exports = router;
