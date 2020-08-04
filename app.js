var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var body_parser = require('body-parser')
//import mongoose
var indexRouter = require('./server/main/index_router');
var sectorsRouter = require('./server/sectors/sectors_router');
var stocksRouter = require('./server/stocks/stocks_router');
var usersRouter = require('./server/users_info_page/user_router');
var authRouter = require('./server/identify/auth_router');

// var Stock = require(path.resolve(__dirname, './server/Stock'));
// var Sector = require(path.resolve(__dirname, './server/Sector'));


const session = require('express-session');

const passport = require('passport');
const pass_config = require('./config/passport-config')
var app = express();
//configure session properties (timeout,storage etc..)
app.use(session(pass_config.session_properties))

//passport config
app.use(passport.initialize()); //initizalize passport middleware
app.use(passport.session()); //initizalize passport middleware

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//set routers
app.use('/', indexRouter);
app.use('/sectors', sectorsRouter);
app.use('/stocks', stocksRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);



// catch 404 and forward to error.ejs handler
app.use(function(req, res, next) {
  //res.status(404).send("Sorry can't find that!")
  //next();
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
  next()
  //dd
});

module.exports = app;
