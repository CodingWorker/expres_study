var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello',(req,res,next)=>{
  res.render('hello',{
    title:'hello express'
  });
});

router.post('/login',(req,res,next)=>{
  console.log(req);
  res.end();
});

module.exports = router;
