var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var $ = require('jquery');
let svn = require('svn');
//import mongoose
var mongoose = require(`mongoose`);

var indexRouter = require('./server/routers/index_router');
var sectorsRouter = require('./server/routers/sectors_router');
var stocksRouter = require('./server/routers/stocks_router');

var Stock = require(path.resolve(__dirname, './server/Stock'));
var Sector = require(path.resolve(__dirname, './server/Sector'));

var app = express();

//middleware
// app.use('/posts', ()=> {
//   console.log("This is a middleware runing on /posts");
// })


//ROUTES


//LISTEN TO PORT

const port = 3000;
app.listen(3000, ()=>  {
  console.log('listening on 3000');
});





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/sectors', sectorsRouter);
app.use('/stocks', stocksRouter);

// catch 404 and forward to error.ejs handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error.ejs handler
app.use(function(err, req, res, next) {
  // set locals, only providing error.ejs in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error.ejs page
  res.status(err.status || 500);
  res.render('error',{message:err.message,status:err.status,stack:err.stack});

  //dd
});

module.exports = app;
