var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var multer = require('multer');
var mongoose = require('mongoose');

//引入路由文件模块,该文件定义了一些路由接口
var index = require('./routes/index');

var users = require('./routes/users');

var app = express();
global.dbHandel = require('./database/dbHandeler');
global.db = mongoose.connect("mongodb://localhost:27017/nodedb");

// view engine setup，启动视图引擎
app.set('views', path.join(__dirname, 'views'));
//使用ejs为后缀的文件作为模板
//app.set('view engine', 'ejs');

app.engine("html",require("ejs").__express);
app.set('view engine','html');//设置html后缀的文件为模板

// uncomment after placing your favicon in /public，将favicon放入public目录后取消注释
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);//为路径/设置路由
app.use('/users', users);//为路径/users设置路由
app.use('/login',index);//为路径/login设置路由
app.use('register',index);//为/register设置路由
app.use('/home',index);//为/home设置路由
app.use('/logout',index);//为/logout设置路由

app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cookieParser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler，错误处理
app.use(function(err, req, res, next) {
  // set locals, only providing error in development，只在开发阶段提供错误日志，生产环境下注释
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');//调用视图渲染
});

var session = require('express-session');

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'secret',
    cookie:{ 
        maxAge: 1000*60*30
    }
}));

app.use(function(req,res,next){ 
    res.locals.user = req.session.user;   // 从session 获取 user对象
    var err = req.session.error;   //获取错误信息
    delete req.session.error;
    res.locals.message = "";   // 展示的信息 message
    if(err){ 
        res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
    }
    next();  //中间件传递
});


module.exports = app;
