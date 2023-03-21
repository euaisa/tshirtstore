var fs = require('fs');
var express = require('express');
var router = express.Router();

let reviews = [];

function loadReviews() {
  let data = fs.readFileSync('reviews.json', 'utf8');
  reviews = JSON.parse(data);
}

function saveReviews() {
  fs.writeFileSync('reviews.json', JSON.stringify(reviews, null, 4), 'utf8');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/reviews', function(req, res, next) {
  loadReviews();
  res.send(reviews);
});

router.post('/reviews', function(req, res, next) {
  loadReviews();
  reviews.push(req.body);
  saveReviews();
  res.status(201).json(req.body);
});

module.exports = router;
