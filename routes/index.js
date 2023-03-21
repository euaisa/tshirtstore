var express = require('express');
var router = express.Router();

let reviews = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/reviews', function(req, res, next) {
  res.send(reviews);
});

router.post('/reviews', function(req, res, next) {
  reviews.push(req.body);
  res.status(201).json(req.body);
});

module.exports = router;
