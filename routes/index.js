var express = require('express');
var router = express.Router();
var auth = require('http-auth');

var basic = auth.basic({
  realm: "Web."
}, function (username, password, callback) { // Custom authentication method.
  callback(username === "swing" && password === "left");
}
);

/* GET home page. */
router.get('/', auth.connect(basic), function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
