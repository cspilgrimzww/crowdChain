var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login',{
    layout:false
  });
});
router.get('/login', function(req, res, next) {
  res.render('login',{
    layout:false
  });
});
router.get('/home', function(req, res, next) {
  res.render('allList', {
    title: 'Home'
  });
});
router.get('/raised', function(req, res, next) {
  res.render('raisedList', {
    title: 'Home'
  });
});
router.get('/funded', function(req, res, next) {
  res.render('fundedList', {
    title: 'Home'
  });
});

router.get('/newProj',function (req,res,next) {
  res.render('newProj');
});

module.exports = router;
