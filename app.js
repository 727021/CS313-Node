var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
require('dotenv').config()

var indexRouter = require('./routes/index');
var week9 = require('./routes/9')
var week10 = require('./routes/10')
var week11Team = require('./routes/11-team')
var week12Team = require('./routes/12-team')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESS_SECRET,
  resave: true,
  saveUninitialized: false
}))

app.use('/', indexRouter);
app.use('/9', week9)
app.use('/10', week10)
app.get('/11', (req, res) => res.redirect('https://mtgbuilder.herokuapp.com/'))
app.use('/11/team', week11Team)
app.get('/12', (req, res) => res.redirect('https://mtgbuilder.herokuapp.com/'))
app.use('/12/team', week12Team)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
